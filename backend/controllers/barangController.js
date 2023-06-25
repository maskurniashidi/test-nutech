const Barang = require("../models/barang.js");
const fs = require("fs");

const getAllBarang = (req, res) => {
  const { role } = req.user;
  if (role === "admin") {
    Barang.findAll()
      .then((barang) => {
        res.json(barang);
      })
      .catch((error) => {
        return res.status(500).json({ message: "Terjadi kesalahan server" });
      });
  } else {
    const { email } = req.user;
    Barang.findAll({ where: { email } })
      .then((barang) => {
        if (barang.length === 0) {
          res.json([]);
        } else {
          res.json(barang);
        }
      })
      .catch((error) => {
        console.error("Error retrieving barang:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
      });
  }
};

const createBarang = async (req, res) => {
  try {
    const { nama, harga_beli, harga_jual, stok } = req.body;
    const { filename } = req.file;
    const { email } = req.user;

    if (!nama || !harga_beli || !harga_jual || !stok || !filename || !email || nama.trim() === "" || harga_beli.trim() === "" || harga_jual.trim() === "" || stok.trim() === "" || email.trim() === "") {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "Semua field harus terisi" });
    }

    const existingBarang = await Barang.findOne({ where: { nama } });
    if (existingBarang) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "Nama produk sudah ada" });
    }

    const fileSizeInKB = req.file.size / 1024;
    if (fileSizeInKB > 100) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "Ukuran file melebihi 100KB" });
    }

    await Barang.create({ foto: filename, nama, harga_beli, harga_jual, stok, email });
    return res.sendStatus(201);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Error creating barang:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server, pastikan semua field terisi" });
  }
};

const updateBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, harga_beli, harga_jual, stok } = req.body;
    const { email, role } = req.user;
    let filename;

    if (req.file) {
      filename = req.file.filename;
      const fileSizeInKB = req.file.size / 1024;
      if (fileSizeInKB > 100) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Ukuran file melebihi 100KB" });
      }
    }

    let barang;
    if (role === "admin") {
      barang = await Barang.findByPk(id);
    } else {
      barang = await Barang.findOne({ where: { id, email } });
    }

    if (!barang) {
      return res.sendStatus(404);
    }

    if (req.file && barang.foto) {
      const filePath = `uploads/${barang.foto}`;
      fs.unlinkSync(filePath);
    }

    const updatedData = {
      nama: nama || barang.nama,
      harga_beli: harga_beli || barang.harga_beli,
      harga_jual: harga_jual || barang.harga_jual,
      stok: stok || barang.stok,
      foto: filename || barang.foto,
    };

    const existingBarang = await Barang.findOne({ where: { nama: updatedData.nama } });
    if (existingBarang && existingBarang.id !== id && updatedData.nama !== barang.nama) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "Nama produk sudah ada" });
    }

    await barang.update(updatedData);
    return res.sendStatus(200);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: "Unauthorized token invalid" });
    }
    console.error("Error updating barang:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const deleteBarang = (req, res) => {
  const { id } = req.params;
  const { email, role } = req.user;
  if (role === "admin") {
    Barang.findOne({ where: { id } })
      .then((barang) => {
        if (!barang) {
          return res.sendStatus(404);
        }

        fs.unlink(`uploads/${barang.foto}`, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          }

          Barang.destroy({ where: { id } })
            .then(() => {
              res.sendStatus(204);
            })
            .catch((error) => {
              console.error("Error deleting barang:", error);
              return res.status(500).json({ message: "Terjadi kesalahan server" });
            });
        });
      })
      .catch((error) => {
        console.error("Error retrieving barang:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
      });
  } else {
    Barang.findOne({ where: { id, email } })
      .then((barang) => {
        if (!barang) {
          return res.sendStatus(404);
        }

        fs.unlink(`uploads/${barang.foto}`, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          }

          Barang.destroy({ where: { id, email } })
            .then(() => {
              res.sendStatus(204);
            })
            .catch((error) => {
              console.error("Error deleting barang:", error);
              return res.status(500).json({ message: "Terjadi kesalahan server" });
            });
        });
      })
      .catch((error) => {
        console.error("Error retrieving barang:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
      });
  }
};

const getBarangById = (req, res) => {
  const { id } = req.params;
  const { email, role } = req.user;

  let queryOptions = { where: { id } };

  if (role !== "admin") {
    queryOptions.where.email = email;
  }

  Barang.findOne(queryOptions)
    .then((barang) => {
      if (!barang) {
        return res.sendStatus(404);
      }
      res.json(barang);
    })
    .catch((error) => {
      console.error("Error retrieving barang:", error);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    });
};

module.exports = {
  getAllBarang,
  createBarang,
  updateBarang,
  deleteBarang,
  getBarangById,
};
