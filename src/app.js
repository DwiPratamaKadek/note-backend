
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config({path : '.env'})
dotenv.config({path : '.envToken'})
  
const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Ini bagian routernya
const noteRoutes = require ('./routes/noteRoutes')
const priorityRoutes = require ('./routes/priorityRoutes')
const userRoutes = require ('./routes/userRoutes')

// Middleware untuk mengaktifkan CORS
app.use(cors()); 
// Middleware untuk parsing JSON body
app.use(express.json()); 

// Rute untuk setiap modul
app.use('/api/note', noteRoutes);
app.use('/api/priority', priorityRoutes);
app.use('/api/user', userRoutes)

// Rute dasar
app.get('/', (req, res) => {
  res.send('Welcome to  the Note!');
});
//HElo
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access API at http://localhost:${PORT}`);
});
