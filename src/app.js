require('dotenv').config();
const express = require('express');
const app = express();

// Ini bagian routernya
const noteRoutes = require ('./routes/noteRoutes')
const priorityRoutes = require ('./routes/priorityRoutes')
const userRoutes = require ('./routes/userRoutes')

// Middleware untuk parsing JSON body
app.use(express.json()); 

// Rute untuk setiap modul
app.use('/api/note', noteRoutes);
app.use('/api/priority', priorityRoutes);
app.use('/api/user', userRoutes)

// Rute dasar
app.get('/', (req, res) => {
  res.send('Welcome to the Note!');
});
//HElo
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access API at http://localhost:${PORT}/api`);
});
