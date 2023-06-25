const express = require("express");
const multer = require("multer");
const barangController = require("../controllers/barangController.js");
const authenticateToken = require("../middleware/authMiddleware.js");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", authenticateToken, barangController.getAllBarang);
router.post("/", authenticateToken, upload.single("foto"), barangController.createBarang);
router.patch("/:id", authenticateToken, upload.single("foto"), barangController.updateBarang);
router.delete("/:id", authenticateToken, barangController.deleteBarang);
router.get("/:id", authenticateToken, barangController.getBarangById);

module.exports = router;
