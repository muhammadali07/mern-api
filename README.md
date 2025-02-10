# Absensi API

Sistem API untuk fitur absensi menggunakan **Node.js (Express.js)**, **MySQL**, **Redis**, dan **Elasticsearch**.

## 📌 Fitur
- **User Authentication** (OAuth & JWT)
- **Clock-in & Clock-out**
- **Laporan Absensi dengan Elasticsearch**
- **Realtime Redis untuk Clock-in/Clock-out & Reminder**
- **Swagger
- **Dockerized Deployment**

## 🛠️ Teknologi yang Digunakan
- **Node.js** + **Express.js** (Backend Framework)
- **MySQL** (Database Utama)
- **Elasticsearch** (Search & Laporan Absensi)
- **Redis** (Realtime Data & Caching)
- **JWT** (Authentication)
- **Docker & Docker Compose** (Containerization)

---

## 🚀 Cara Menjalankan

### 1️⃣ **Clone Repository**
```sh
git clone https://github.com/username/absensi-api.git
cd absensi-api
```

### 2️⃣ **Buat File `.env`**
Buat file `.env` di root project:
```ini
PORT=9000
JWT_SECRET=your_secret_key
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=absensi_db
REDIS_HOST=redis
REDIS_PORT=6379
ELASTICSEARCH_URL=http://elasticsearch:9200
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 3️⃣ **Jalankan dengan Docker**
```sh
docker-compose up --build
```
> **Pastikan Docker sudah terinstall**

Setelah sukses, service akan berjalan di:
- **API**: `http://localhost:9000`
- **Swagger Docs**: `http://localhost:9000/api-docs`
- **MySQL**: `localhost:3306`
- **Redis**: `localhost:6379`
- **Elasticsearch**: `http://localhost:9200`

### 4️⃣ **Menjalankan Tanpa Docker (Opsional)**
Jika ingin menjalankan tanpa Docker:

#### **Install Dependencies**
```sh
npm install
```

#### **Jalankan MySQL & Redis Secara Manual**
Pastikan **MySQL** dan **Redis** berjalan:
```sh
# Jalankan MySQL
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:latest

# Jalankan Redis
docker run --name redis -p 6379:6379 -d redis:latest
```

#### **Jalankan Server**
```sh
npm start
```

---

## 📌 API Documentation
- **Swagger UI**: `http://localhost:9000/api-docs`

---

## 🔧 Endpoint API

### **1️⃣ Authentication**
| Method | Endpoint        | Deskripsi |
|--------|----------------|-----------|
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User (JWT) |

### **2️⃣ Absensi**
| Method | Endpoint        | Deskripsi |
|--------|----------------|-----------|
| POST   | `/api/attendance/clock-in`  | Clock-in User |
| POST   | `/api/attendance/clock-out` | Clock-out User |
| GET    | `/api/attendance/report`    | Lihat Laporan Absensi |

---

## ❌ Troubleshooting
### **Port Sudah Digunakan**
Jika mendapat error "Port already in use":
```sh
kill -9 $(lsof -t -i:9000)
```

### **Redis Error: Socket already opened**
Edit `config/redis.js`, pastikan hanya ada **satu koneksi Redis** yang dibuka:
```javascript
if (!redisClient.isOpen) {
  await redisClient.connect();
}
```

### **Database Access Denied**
Coba restart MySQL container:
```sh
docker-compose down && docker-compose up -d
```

---

## 📜 License
Proyek ini menggunakan lisensi **MIT**.

**Happy Coding! 🚀**

