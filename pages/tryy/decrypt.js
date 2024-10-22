import { randomBytes, createHmac, createCipheriv, createDecipheriv } from 'crypto';

    

    async function decryptContentKey(rootKey, encryptedData) {
        const salt = encryptedData.slice(0, 16);
        const iv = encryptedData.slice(16, 32);
        const encryptedContentKey = encryptedData.slice(32);

        const derivedKey = createHmac('sha256', salt)
            .update(rootKey)
            .digest();

        const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv);
        decipher.setAuthTag(encryptedContentKey.slice(-16));
        const contentKey = Buffer.concat([
            decipher.update(encryptedContentKey.slice(0, -16)),
            decipher.final()
        ]);

        return contentKey;
    }


export default decryptContentKey