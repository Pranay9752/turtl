// types/pinata.ts
export interface PinataResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
  }
  
  export interface IPFSHookReturn {
    uploadToPinata: (file: File) => Promise<string>;
    getIPFSUrl: (cid: string) => string | null;
    isUploading: boolean;
    error: string | null;
  }
  
  export type GatewayType = 'pinata' | 'ipfs.io' | 'cloudflare';
  