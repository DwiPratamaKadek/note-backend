# Note App Backend
Note App Backend adalah RESTful API untuk mengelola catatan (notes) dengan fitur user management, priority, dan deadline. Proyek ini dibangun menggunakan Node.js, Express, dan MySQL sebagai database.

---
## Fitur
- **CRUD Notes** (Create, Read, Update, Delete)  
- **User Management** (registrasi & autentikasi dasar)  
- **Priority Notes** (Low, Medium, High)  
- **Deadline Tracking** 

---
## Teach Stack
- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Database**: MySQL  
- **ORM/Query**: Native SQL Query  
- **Deployment**: Rail

---
## Struktur Project
note-app-backend/
│-- src/
│ │-- controllers/ # Logic request/response
│ │-- models/ # Query ke database
│ │-- routes/ # Endpoint API
│ │-- config/ # Koneksi DB
│ │-- app.js # Inisialisasi Express
│
│-- .env 
│-- .gitignore
│-- package.json
│-- README.md

---

## 🚀 Instalasi & Menjalankan Project

1. **Clone repo**
   ```bash
   git clone https://github.com/username/note-app-backend.git
   cd note-app-backend ```

2. ** Install Dependencies**
    ```bash 
    npm install```
  
3. **Konfigurasi environment**
    ```bash 
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=note_app
    PORT=5000```

4. **Jalankan Server**
    ```bash node src/app.js```