const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Initialize storage
// In Cloud Run, it will automatically use the service account credentials
const storage = new Storage();

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject('No file provided');
        }

        if (!bucketName) {
            // Fallback for local development or if bucket not set
            // Return local path (assuming file was saved to disk by multer if we were using diskStorage, 
            // but we will switch to memoryStorage, so this fallback is tricky. 
            // Better to fail if bucket not set in production, or handle local dev differently)
            console.warn('GCLOUD_STORAGE_BUCKET not set. Upload failed.');
            return reject('GCloud Storage Bucket not configured');
        }

        const bucket = storage.bucket(bucketName);
        const originalName = file.originalname.replace(/\s+/g, '-');
        const filename = `${Date.now()}-${originalName}`;
        const blob = bucket.file(filename);

        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
        });

        blobStream.on('error', (err) => {
            console.error('GCS Upload Error:', err);
            reject(err);
        });

        blobStream.on('finish', () => {
            // The public URL can be used directly to access the file via HTTP.
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

module.exports = { uploadFile };
