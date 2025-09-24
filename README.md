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


## Penggunaann ORM sequelize express
### Materi tambahan (biar inget aja)

### Apa itu ORM ? 
Singkatnya  ORM itu membuat kita males untuk membuat perintah sql. 
Anggapan kita seorang bayi dan kita memiliki seorang asisten yang nantinya kita tinggal suruh assiten kita mengambil barang yang kita inginkan 
ORM singkatnya seperti itu kita menggunakan printah yang ada. 

### Kenapa menggunakan ORM ? 
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
        ***development*** 
         - ini digunakan pada saat dev (belajar)
         - kita bisa otak atik tanpa takut eror
        ***test***
         - ini keknya untuk testing apakah sudah siap untuk dikasi ke orang 
         - di versi ini masih aman untuk coba coba lagi. 
        ***production***
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
            mysql install -g mysqk2 
        ```
        kemudian jalankan sequelize-auto menggunakan npx 
        ```bash 
            npx sequelize-auto -o "./models" -d nama_db -h 127.0.0.1 -u root -p 3306 -x root -e mysql
        ```





    