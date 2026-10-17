const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

// Ensure public/files exists
const publicDir = path.join(__dirname, 'public');
const filesDir = path.join(publicDir, 'files');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);

// Serve static files (including uploaded files)
app.use(express.static(publicDir));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filesDir);
  },
  filename: function (req, file, cb) {
    // sanitize original name
    const safeName = file.originalname.replace(/[^a-z0-9.-_]/gi, '_');
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + safeName;
    cb(null, unique);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB max
  fileFilter: function (req, file, cb) {
    const allowed = ['.pdf', '.epub'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.indexOf(ext) === -1) return cb(new Error('Somente arquivos PDF ou EPUB são permitidos'));
    cb(null, true);
  }
});

app.post('/upload', upload.single('file'), function (req, res) {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  // Return the public URL to the uploaded file
  const url = '/files/' + path.basename(req.file.filename);
  res.json({ url: url, name: req.file.originalname });
});

// Fallback for health check
app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
  console.log('Serving public/ as static. Upload endpoint: POST /upload (file field = "file")');
});
