# JavaScript Görev Takipçisi

Vanilla JavaScript, HTML ve CSS ile hazırlanmış, mobil uyumlu bir görev takip uygulaması. Görevler tarayıcının `localStorage` alanında saklanır; sayfa yenilendiğinde kaybolmaz.

## Özellikler

- Görev ekleme, tamamlama, yeniden açma ve silme
- Tüm görevler, devam eden görevler ve tamamlanan görevler için filtreler
- Tamamlanan görevleri tek seferde temizleme
- Tamamlanma sayısını ve kalan işleri görme
- Boş ve çok uzun görev adlarını engelleme
- Mobil ekran, klavye ve ekran okuyucu kullanımına uygun arayüz

## Katmanlar

```text
presentation  Ekranı çizer ve kullanıcı hareketlerini yönetir
service       Görev işlemlerinin kurallarını uygular
repository    Görevleri tarayıcı depolamasından okur ve yazar
domain        Görev verisinin biçimini ve temel kurallarını tanımlar
```

Uygulamanın akışı `presentation → service → repository` şeklindedir. `domain` katmanı görevlerin nasıl oluşturulacağını ve geçerli sayılacağını belirler. Böylece ekran, iş kuralları ve veri saklama kodu birbirinden ayrılır.

## Proje yapısı

```text
index.html
style.css
src/
├── app.js
├── domain/
│   └── task.js
├── repository/
│   └── localStorageTaskRepository.js
├── service/
│   └── taskService.js
└── presentation/
    ├── taskView.js
    └── taskController.js
```

## Çalıştırma

Ek paket kurulumu gerekmez. `index.html` dosyasını tarayıcıda aç. Tarayıcı yerel depolamayı kısıtlarsa klasörde bir terminal açıp `python -m http.server 8000` komutunu çalıştır; sonra `http://localhost:8000` adresine git.

## Kullanılan teknolojiler

- JavaScript (ES6+)
- HTML5
- CSS3
- Tarayıcı `localStorage` API'si
