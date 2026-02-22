import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ALGORITHM = 'aes-256-gcm';

export function encrypt(text: string): string {
    if (!ENCRYPTION_KEY) {
        console.error("CRITICAL: ENCRYPTION_KEY is not set. Cannot encrypt.");
        throw new Error("Encryption key missing.");
    }

    // Generate a random initialization vector
    const iv = crypto.randomBytes(16);

    // Create cipher with the key and iv
    // The key must be exactly 32 bytes (64 hex characters)
    const key = Buffer.from(ENCRYPTION_KEY, 'hex');
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    // Encrypt the text
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Get the authentication tag
    const authTag = cipher.getAuthTag().toString('hex');

    // Return the iv, authTag, and ciphertext separated by colons
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

export function decrypt(text: string): string {
    if (!text) return text;

    // Ensure we have a key
    if (!ENCRYPTION_KEY) {
        console.error("CRITICAL: ENCRYPTION_KEY is not set. Cannot decrypt.");
        return '--- Configuration Error (Missing Key) ---';
    }

    try {
        const parts = text.split(':');
        // If it doesn't look like our encrypted format, it might be legacy unencrypted data
        if (parts.length !== 3) return text;

        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encryptedText = Buffer.from(parts[2], 'hex');

        const key = Buffer.from(ENCRYPTION_KEY, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedText, undefined, 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (e) {
        console.error("Decryption failed for a record. It may be corrupted or encrypted with a different key.", e);
        return '--- Decryption Failed ---';
    }
}
