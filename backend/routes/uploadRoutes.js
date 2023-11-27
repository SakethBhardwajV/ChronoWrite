import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const mimetypes = /image\/jpg|image\/jpeg|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only!"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded succesfully",
    image: `/${req.file.path}`,
  });
});

export default router;
