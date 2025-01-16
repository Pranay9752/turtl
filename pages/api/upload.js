import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

const upload = multer({ dest: './tmp/' });

export default function handler(req, res) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const tempFilePath = req.file.path;
    const originalFilename = req.file.originalname;
    const destinationPath = path.join('./public/images/', originalFilename);

    fs.rename(tempFilePath, destinationPath, (renameErr) => {
      if (renameErr) {
        return res.status(500).json({ error: 'Error moving the file to destination' });
      }

      // File has been uploaded successfully
      return res.status(200).json({ message: 'File uploaded successfully' });
    });
  });
}
