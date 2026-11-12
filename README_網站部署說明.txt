台灣半導體課程計量分析說明網站｜單層部署版

【重要】本版本已改為「只有一層」目錄結構：
- index.html 與所有其他 HTML 均位於同一層。
- style.css、app.js 均位於同一層。
- 21 張 card01.webp～card21.webp 均位於同一層。
- 4 張 executive_yuan_1.webp～executive_yuan_4.webp 均位於同一層。
- 不需要 assets、cards、policy 等任何子資料夾。
- 請上傳或搬移時保留所有檔案在同一資料夾，勿再建立子資料夾。

台灣大專校院半導體課程計量分析說明網站 v2

【開啟方式】
1. 解壓縮 ZIP。
2. 直接雙擊 index.html 即可離線瀏覽。
3. 若要正式上線，可將整個資料夾部署到 GitHub Pages、Cloudflare Pages、Netlify 或校內 Web Server。
   Google Drive 本身不適合作為一般靜態網站主機，但可存放本 ZIP 與原始研究檔。

【網站頁面】
- index.html：一頁看懂
- context.html：產業與政策背景
- pipeline.html：STEP 0–6 資料、去重、母體、分類、QC、panel
- descriptives.html：STEP 7 描述統計、集中與擴散
- model.html：STEP 8 PPML fixed effects
- robustness.html：STEP 9 robustness / extensive / intensive / leave-one-out
- alignment.html：STEP 10 curriculum–industry alignment / technology gaps
- results.html：STEP 11 SSCI Results 統整
- impact.html：STEP 12 Discussion / implications / limitations
- briefing.html：21 張圖卡循序說帖
- glossary.html：中英術語搜尋
- sources.html：資料來源、版本與推論邊界

【重要研究界線】
- 8,763 為原始行政列示，7,423 為重建後 unique offerings。
- 主分析 801 institution-years，包含 297 個 zero-course school-years。
- 修課人次不是獨立學生數。
- PPML Type × Year 不顯著，不等於證明兩類大學完全相同。
- STEP 10 gap 不是缺工率、不是人才缺口、不是應增開課程數。
- 尚無一致 school-year STEM enrollment / institution-size offset。
- AI-assisted classification 尚未完成真正獨立盲人類外部驗證。
- STEP 8–10 不能解讀成單一政策因果效果。

版本：2026-11-11
