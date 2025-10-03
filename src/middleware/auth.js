const jwt = require("jsonwebtoken")

// Middleware untuk cek token
function authenticateToken(req, res, next) {
  // Ambil token dari header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token tidak ada, akses ditolak" });
  }

  // Verifikasi token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid atau expired" });

    req.user = user; // simpan payload token ke request
    next(); // lanjut ke route handler
  });
}

module.exports = authenticateToken;