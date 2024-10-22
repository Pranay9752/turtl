import { publicEncrypt, privateDecrypt } from 'crypto';



    function encryptContentKeyWithPublicKey(publicKey, encryptedContentKey) {
        const buffer = Buffer.from(encryptedContentKey, 'base64');
        const encrypted = publicEncrypt(publicKey, buffer);
        return encrypted.toString('base64');
      }
      
      // Function to decrypt the encryptedContentKey using the private key
      function decryptContentKeyWithPrivateKey(privateKey, encryptedContentKey) {
        const buffer = Buffer.from(encryptedContentKey, 'base64');
        const decrypted = privateDecrypt(privateKey, buffer);
        console.log(decrypted)
        return decrypted.toString('base64');
      }
export default decryptContentKeyWithPrivateKey