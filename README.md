# Yardım Masası (Help Desk) Uygulaması
Bu proje, kurum içi destek taleplerinin kaydedilmesi, takibi ve yönetilmesi için geliştirilmiş bir fullstack uygulamasıdır.

## Ürün stacki
- **Backend**
  - Node.js
  - Express.js
  - Mongoose
- **Frontend**
  - React (Create React App)
  - Axios
  - React Router DOM
- **Database**
  - MongoDB

## Kurulum ve Çalıştırma
Projeyi çalıştırmadan önce makinenizde MongoDB Community Server ve node.js bulunmlıdır.
**Kurulum**
    Gerekli tüm paketleri (backend, frontend) yüklemek için ana dizindeyken npm run install-all komutunu çalıştırın
    
 **Backend Environment Variables**
    `backend` klasörü içinde `.env` adında bir dosya oluşturun ve içeriğini aşağıdaki gibi doldurun:
    ```
    MONGO_URI=mongodb://127.0.0.1:27017/help-desk-db
    PORT=8000
    ```

**Backend sunucusunu başlatın:**
  ```
  npm run dev:backend
  ```

**Frontend sunucusunu başlatın:**
  ```
  npm run dev:frontend
  ```

## Projenin Kapsamı
Uygulamanın mevcut sürümü aşağıdaki özellikleri içermektedir:
- Destek talebi oluşturma
- Tüm destek taleplerini listeleme
- Mevcut bir talebi güncelleme
- Talepleri statülerine göre filtreleme
- Talepleri önceliklerine göre sıralama 