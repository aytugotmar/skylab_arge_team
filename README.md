# YTU SkyLab Ar-Ge Tanıtım Sitesi

SkyLab Ar-Ge ekiplerini modern, tek sayfalık bir deneyimle tanıtan React + Vite projesi. Sayfa; animasyonlu açılış kahramanı, kaydırma yönlendirmesi, modal ile açılan ekip kartları, başvuru çağrısı ve bilgilendirici bir footer içerir.

## Özellikler
- Hero bölümünde SkyLab kimliği, kısa açıklama, CTA butonları ve animasyonlu görseller
- Kaydırma yönlendirmesi ile ekipler kısmına yumuşak geçiş
- Sekiz Ar-Ge ekibine ait modalli kartlar; açıklamalar, öne çıkan konular ve yetkinlik rozetleri
- Modal içinde ve sayfanın sonunda başvuru çağrısı (e-posta bağlantısı)
- Koyu temalı, cam efektiyle desteklenmiş modern tasarım ve mobil uyumlu yerleşim

## Kurulum
1. [Node.js](https://nodejs.org/) 18 veya üzeri sürümü kurulu olduğundan emin olun.
2. Bağımlılıkları yükleyin:

	```powershell
	npm install
	```

3. Geliştirme sunucusunu başlatmak için:

	```powershell
	npm run dev
	```

	Varsayılan olarak `http://localhost:5173` adresinde çalışır.

## Build Alma

```powershell
npm run build
```

Üretim çıktısı `dist/` klasörüne düşer. Çıktıyı yerel olarak doğrulamak isterseniz:

```powershell
npm run preview
```

## Özelleştirme
- Ekip bilgilerini güncellemek için `src/App.jsx` dosyasındaki `teams` dizisini düzenleyin.
- Başvuru bağlantısını kurumunuza uygun bir form ya da iletişim adresiyle değiştirmek için `href="mailto:skylab@ytu.edu.tr…"` satırlarını güncelleyin.
- Tasarım renkleri, gradientler ve düzenler `src/App.css` içinde tanımlıdır.

## Lisans

Proje kulüp içi kullanım amaçlıdır. Gerekli olduğunda uygun lisans bilgilerini burada güncelleyebilirsiniz.
