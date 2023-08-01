import { NextFunction, Response } from "express";

import multer from "multer";
import { fileStorageLocation } from "./env";
import DocumentStorage from "../apis/common/document.storage.model";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileStorageLocation);
  },
});

function createDocumentStorage(file, user) {
  const doc = new DocumentStorage({
    name: file.filename,
    size: file.size,
    originalFileName: file.originalname,
    encoding: file.encoding,
    mimeType: file.mimetype,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: user,
    updatedBy: user,
  });
  return doc.save().then((savedDoc) => {
    file._id = savedDoc._id;
    return savedDoc;
  });
}

function documentProcessor(req: any, res: Response, next: NextFunction) {
  let processFile;

  if (req.file) {
    processFile = createDocumentStorage(req.file, req.user);
  } else if (req.files) {
    if (req.files instanceof Array) {
      processFile = Promise.all(
        req.files.map((file) => createDocumentStorage(file, req.user))
      );
    } else {
      const promises = [];
      Object.values(req.files).forEach((files) =>
        (files as any).forEach((file) => {
          promises.push(createDocumentStorage(file, req.user));
        })
      );

      processFile = Promise.all(promises);
    }
  }

  if (processFile) {
    processFile.then(() => next()).catch(next);
  } else {
    next();
  }
}

function sendFile(doc, res, next) {
  const options = {
    root: fileStorageLocation,
    dotfiles: "deny",
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Disposition": `filename="${doc.originalFileName}"`,
    },
  };
  res.sendFile(doc.name, options, next);
}

const multerExp = multer({ storage: storage });
const fields = multerExp.fields;

export { documentProcessor, sendFile, multerExp as multer, fields };
