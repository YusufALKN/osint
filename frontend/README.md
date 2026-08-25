# OSINT Console — Frontend

Vite + React ile kurulmuş, backend'deki `sources`, `advisories`,
`crawl_jobs` tablolarına karşılık gelen bir kontrol paneli arayüzü.

## Kurulum ve çalıştırma

```bash
npm install
npm run dev       # http://localhost:5173
```

## Klasör yapısı

```
frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React giriş noktası
    ├── App.jsx                # Sidebar + görünüm yönlendirme
    ├── theme.js                # Renk/tipografi token'ları (T, SEV, STATUS_META)
    ├── utils.js                 # timeAgo() gibi yardımcılar
    ├── data/
    │   └── mockData.js           # Örnek veri (API bağlanana kadar)
    ├── components/
    │   ├── SevDot.jsx              # Severity noktası
    │   ├── SevTag.jsx               # Severity rozeti
    │   ├── SignalFeed.jsx            # Dashboard'daki canlı sinyal şeridi
    │   ├── ReadoutLine.jsx             # Özet sayaç satırı
    │   ├── SeverityBar.jsx              # Severity dağılım çubuğu
    │   └── ProgressBlocks.jsx            # ASCII-stil ilerleme göstergesi
    └── views/
        ├── DashboardView.jsx
        ├── AdvisoriesView.jsx           # Aranabilir/filtrelenebilir tablo
        ├── SourcesView.jsx              # Kaynak yönetimi
        └── CrawlJobsView.jsx            # Job durumu + log görüntüleyici
```

## Gerçek API'ye bağlama

Şu an `src/data/mockData.js` sabit örnek veri döndürüyor. Backend'deki
FastAPI uçları hazır olduğunda, bu dosyanın yerini bir `src/api.js`
(fetch/axios çağrıları) alır; `App.jsx` ve view bileşenleri, veri şekli
(shape) aynı kaldığı sürece değişmeden çalışmaya devam eder:

```js
// src/api.js örneği
export async function fetchAdvisories() {
  const res = await fetch("/api/advisories");
  const data = await res.json();
  return data.map(a => ({ ...a, date: new Date(a.publication_date) }));
}
```

`App.jsx` içinde `useState(ADVISORIES)` yerine `useEffect` ile bu
fonksiyonu çağırıp state'i doldurmak yeterli olur.
