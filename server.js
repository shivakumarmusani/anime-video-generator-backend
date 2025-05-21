const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;
  const inputText = req.body.text;

  res.json({
    success: true,
    message: 'Received image and text.',
    imagePath,
    inputText
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
