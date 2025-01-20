"use client";
  // hooks/usePinataIPFS.ts
  import { useState } from 'react';
  import axios, { AxiosError } from 'axios';
import { GatewayType, IPFSHookReturn, PinataResponse } from './ipfs_types';
  
  const GATEWAY_URLS = {
    pinata: 'https://gateway.pinata.cloud/ipfs/',
    'ipfs.io': 'https://ipfs.io/ipfs/',
    cloudflare: 'https://cloudflare-ipfs.com/ipfs/'
  };
  
  const useIPFS = (preferredGateway: GatewayType = 'pinata'): IPFSHookReturn => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const validateImage = (file: File): boolean => {
      if (!file.type.startsWith('image/')) {
        throw new Error('Please provide a valid image file');
      }
      return true;
    };
  
    const uploadToPinata = async (file: File): Promise<string> => {
      setIsUploading(true);
      setError(null);
  
      try {
        validateImage(file);
  
        const formData = new FormData();
        formData.append('file', file);
  
        const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
        const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;
  
        if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
          throw new Error('Pinata API keys are not configured');
        }
  
        const response = await axios.post<PinataResponse>(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_SECRET_KEY,
            },
          }
        );
  
        return response.data.IpfsHash;
      } catch (err) {
        const error = err as Error | AxiosError;
        const errorMessage = 'message' in error ? error.message : 'Error uploading to IPFS';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsUploading(false);
      }
    };
  
    const getIPFSUrl = (cid: string): string | null => {
      if (!cid) {
        setError('Please provide a valid CID');
        return null;
      }
  
      const baseUrl = GATEWAY_URLS[preferredGateway];
      return `${baseUrl}${cid}`;
    };
  
    return {
      uploadToPinata,
      getIPFSUrl,
      isUploading,
      error,
    };
  };
  
  export default useIPFS;
  