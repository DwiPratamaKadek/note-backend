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
```bash 
    note-app-backend/
    │-- src/
    │ │-- controllers/ # Logic request/response
    │ │-- models/ # Query ke database
    | |-- migrations/ # Migrasi ke db
    │ │-- routes/ # Endpoint API
    │ │-- config/ # Koneksi DB
    │ │-- app.js # Inisialisasi Express
    │
    │-- .env 
    │-- .gitignore
    │-- package.json
    │-- README.md
```


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


## Penggunaann ORM sequelize express
### Materi tambahan (biar inget aja)

### Apa itu ORM ? 
Singkatnya  ORM itu membuat kita males untuk membuat perintah sql. 
Anggapan kita seorang bayi dan kita memiliki seorang asisten yang nantinya kita tinggal suruh assiten kita mengambil barang yang kita inginkan 
ORM singkatnya seperti itu kita menggunakan printah yang ada. 

### Kenapa mengguna kan ORM ? 
Sudah jelas untuk mempermudahkan kita berkomunikasi dengan db, kita tidak perlu lagi menulis printah sql "ribet", memudahkan kita juga untuk migrasi db, jadi tidak perlu lagi untuk export dan import db kalian. 

### Kenapa makek sequelize ? 
Ya.. banyak dokumentasinya dan mudah di pelajari. 

1. ## Setup sequelize 
    ```bash 
    npm init -y
    npm install express sequelize mysql2
    npx sequelize-cli init
    ```

    Setelah menginstall dan menjalankan printah ini maka akan otomatis membuat folder

    ```bash 
    config/   -> konfigurasi db
    models/   -> tempat model kita
    migrations/ -> tempat migrasi db
    seeders/   -> isi data awal
    ```

2. ## Folder 
    - **Config**
        folder ini gunanya buat konfigurasi koneksi ke db kaliana 
        ```bash 
        /config.json

            {
                "development": {
                    "username": "userdb",
                    "password": "passdb",
                    "database": "note-app",
                    "host": "127.0.0.1",
                    "dialect": "mysql"
                },
                "test": {
                    "username": "userdb",
                    "password": "passdb",
                    "database": "note-app",
                    "host": "127.0.0.1",
                    "dialect": "mysql"
                },
                "production": {
                    "username": "userdb",
                    "password": "passdb",
                    "database": "note-app",
                    "host": "127.0.0.1",
                    "dialect": "mysql"
                }
            }
        ```
        ini biasana auto terbuat. 
        ini versi dbnya dimana ada versi dev, test, dan prod 
        **development** 
         - ini digunakan pada saat dev (belajar)
         - kita bisa otak atik tanpa takut eror
        **test**
         - ini keknya untuk testing apakah sudah siap untuk dikasi ke orang 
         - di versi ini masih aman untuk coba coba lagi. 
        **production**
         - di versi ini sudah di pakai orang
         - jadi harus berhati hati, supaya tidak terjadi eror 

3. ## Membuat model  
    **Apa sih yang di lakukan dulu ?**
        sudah jelas kita buat model dulu, supaya tau rak mana yang akan di pakai aja. 
        Analoginya seperi ini :
        - kita punya lemari (database)
        - di lemari ada rak (table)
        - kita juga punya asistem/robot lah buat kita suruh (model) : menmabahkan, mengubah, membuang, mengambil (CRUD)
        jadi kita set pertama itu modelnya supaya bisa kita suruh 

    **Apa yang pertama kita lakuin pas buat model?**
        - sudah jelaslah ORM kita buat databennya (lemarinya) dulu
        ```bash 
            npx sequelize-cli db:create
        ```
        - perintah ini akan menyuruh asisten kita buat sebuah database, yang dimana dia mengambil username, password, nama databse, host, dll dari
        config/config.json. 

    **Habis buat db ngapain lagi ?**
        - Lanjut lah kita buat tablenya (raknya) 
        ```bash 
            npx sequelize-cli model:generate --name nama_model --attributes nama_field:tipe_data,title:string,content:text
        ```
        - Printahnya ada di atas itu langsung membaut file model dan file migrationd "waw keren aku aja baru tau kalo gak di kasik tau AI" 
    
    **Habis buat raknya (table) ngapain?**
        - Langsung kita menyuruh asisten kita untuk menaruh raknya (table) ke lemarinya (db)
        ```bash 
            npx sequelize-cli db:migrate
        ```
        
    **Nah Kalo Db saya udah ada Gimana ?** 
        tenang kalo Db dan table udah ada kita menjalankan printah ini 
        ```bash 
            npx sequelize-cli db:migrate
        ```
        pirintah ini cuma menambhakan raknya(table) ke lemari(db) jadi kamu harus baut migrationnya dulu(hahaha cara buatnya liat buat tablenya) 
       
        atau bisa begini kalo sudah punya tablenya

        ```bash 
            sequelize-auto -o "./models" -d nama_db -h 127.0.0.1 -u root -p 3306 -x root -e mysql
        ```
        printah ini kadang eror karena mysql2 itu terinstal local di project sedangkan si sequelize ini global -g 
        jadi install dulu si sequelize ini secara local 
        ```bash 
            npm install --save-dev sequelize-auto
        ```
        atau juga boleh install mysql secara global 

        ```bash 
            mysql install -g mysql2 
        ```
        kemudian jalankan sequelize-auto menggunakan npx 
        ```bash 
            npx sequelize-auto -o "./models" -d nama_db -h 127.0.0.1 -u root -p 3306 -x root -e mysql
        ```


    # JWT (Json Web Token)

    ## Apa itu JWT ? 
    - Jwt itu seperti tiket masuk yang ada tanda tangan digitalnya, dimana JWT ini memberikan kita 2 buah tiket dengan nama Access dan Refresh yang dimana tiket tiket itu memiliki jangka waktu yang berbeda dan fungsi yang hampir berbeda. 
    - Jwt ini bertugas untuk integrasi bukan enkripsi, seperti tiket(token) yang kita miliki tidak berubah ubah sampai ke tempat beramain(service) yang kita inginkan 
        
    ## Access Token vs Refresh Token
    ### Access Toke 
    - digunakan buat kita memasuki atau menggunakan service yang ada
    - analoginya seperti ini kita memiliki 1 tiket yang dimana tiket ini yang kita berikan ke securty setiap tempat bermain yang ada, kemudian security itu akan cek tiket 1 kita, jika tiketnya valid kita bisa masuk, jika tidak maka kita tidak bisa masuk, ya.. gampang seperti itu dibilangnya 
    - Access token ini memiliki waktu yang terbatas bisa dibilang sebentar. 
    - kemungkinan besar buat keamaanan login kek kalok hacker dapet access token kita dia cuma dapet waktu sekitar 10 menit aja. 
    - itu sebabnya ada refresh token. 
    ### Refresh Token 
    - Refresh token ini buat refresh access token bisa dibilang gitu, sebenernya bisa juga kita menggunakan refresh token ini buat masuk service lainnya supaya server gak cek ke db, lama 
    - yaa analoginya kek gini kalok tiket 1 kita habis, kita punya tiket ke 2 yang dimana tiket ke 2 ni punya ttd dari pemilik taman(ordal lah aokwaowka), nah pas kita ngasik tiket ini ke security, security bisa bilang ke admin "buatin dong tiket 1 buat anak ini" abis tu kita bisa masuk lagi, dan juga karna kita udah punya ttd spesial dari bos kita bisa langsung masuk ke taman bermainnya. (kalok salah inpo bang yaa masih belajar juga :>). 
    - yaa gitu lah.  

    ## Kenapa JWT ?
    - sudah jelas ringan lah 
    - buat integrasi data bisa bilang bagus
    - gak perlu nyipen session di servernya.

    ## Gimana sih cara kerja JWT ini ? 
    - JWT nanti membungksu 3  bagian ini 
    **Header** 
        - ini label dari payload
    **payload** 
        - nah ini anggap kartu kita yang isi id dan email biasanya 
    **Signature** 
        - nah adalah cap kita supaya ini fungsinya asli apa tidak 
    - nah abistu kita dapet dah tiktnya. 
    ## Disimpan dimana Access token dan Refresh Token ? 
    kalo gak salah bisa 3 tempat kita simpan di local storage, cookie, dan db 
    **Local Storage** 
    Gampang di pakai cukup dengan code seperti ini ***localStorage.setItem("token", ...)*** tapi katanya rawan kena xss 
    **Cookie** 
    Lebih aman dari XSS (kalau pakai HttpOnly + Secure).
    **Database** 
    
    # Set Up JWT (Json Web Token)
    ## Set Pertama 
    install JWT, bcrypt, cookie parser, dotenv
    ```bash 
        npm install jsonwebtoken 
        npm instasll bcrypt 
        npm install cookie-parser 
        npm install dotenv
    ```
    ## Set Kedua 
    **Buat file di utils**
    utils/tokenUtils.js
    ```bash 
        
        const jwt = require("jsonwebtoken");

        function generateAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        }

        function generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        }

        module.exports = { generateAccessToken, generateRefreshToken };

    ```
    fungsi ini untuk membantu kita membuat access token dan refresh token 
    ## Set Ketiga 
    **Menambahkan Middleware** 
    middleware/auth.js
    ```bash
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
    ```
    ## Set keempat 
    **buat file .env sebagai kunci utama kita membuat tokennya** 
    ```bash 
        ACCESS_TOKEN_SECRET=hackerJanganmaling!
        REFRESH_TOKEN_SECRET=hackerJanganmalingpakeBanget!
    ```
    nah fungsi dari kunci ini pada saat kita login kan kita akan membuat access dan refresh, nah kita perlu kunci ini untuk membuatnya jadi konci ini kunci untuk membuka gembok membuat acces dan refresh kita. (kalo gak salah)

    ## Set Kelima 
    **buat fungsi loginya** 
    ```bash 
        const { Op } = require("sequelize");
        const { user } = require("../models");
        const bcrypt = require("bcrypt");
        const { generateAccessToken, generateRefreshToken } = require("../utils/tokenUtils")

        login: async (req, res ) => {
            const { emailOrUsername, password } = req.body
            
            try {
                // cari email ato usernamenya 
                const userData = await user.findOne({ 
                where : {[Op.or] : [{email : emailOrUsername}, {username: emailOrUsername}]}
                })
            
                if (!userData) return res.status(401).json({message : "User Not Found grr"})
                
                console.log("Password dari req.body:", password);
                
                //validasi passnya
                const isMatch = await bcrypt.compare(password, userData.password)
                if(!isMatch) return res.status(401).json({message : "Invalid Password grr"})
                
                // kalo valid buat access and refresh grr 
                const payload = {id_user : userData.id_user, email: userData.email} // ini yang di bawa oleh jwtnya yang nantinya isinya ini jug
                console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
                const accessToken = generateAccessToken(payload)
                const refreshToken = generateRefreshToken(payload)
            
                res.cookie("refreshToken", refreshToken, {
                httpOnly : true,
                secure : true, 
                sameSite : "strict" 
                })
            
                res.status(200).json({message : "Login lo berhasil ", accessToken, refreshToken})
            }catch(error) { 
            console.log(error)
            res.status(500).json({message : "Internal Error Njay"})
        }
    ```









    