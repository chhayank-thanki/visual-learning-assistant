# Visual Learning Assistant for Dyslexic Students

An innovative web application designed to assist **dyslexic students** by simplifying learning materials through **visual aids** such as flowcharts, AI-powered text simplification, and more.

## 🚀 Features

- **Text Simplification:** Uses ML models to simplify complex text into easy-to-understand language.
- **Automatic Flowchart Generation:** Converts text into visually structured flowcharts using Mermaid.js.
- **Stored Flowcharts:** Option to save and view previously generated flowcharts.
- **Dual Tech Stack Integration:**
  - **Full Stack (React + Node + Express + MongoDB):** Handles UI, authentication, and storage.
  - **Python ML/Django API:** Handles text simplification & flowchart generation with real ML logic.
- **Accessibility First:** Designed with dyslexic-friendly themes and colors.
- **Expandable Visual Tools:** Future integration for AI-generated images/videos.

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS, Mermaid.js
- **Backend (Full-stack):** Node.js, Express.js, MongoDB
- **Backend (Python API):** Django, BeautifulSoup (web scraping), ML models (ANN/CNN-based text simplification)
- **Others:** REST API integration, JWT Authentication

## 📂 Project Structure

visual-learning-assistant/
├── client/ # React frontend
├── server/ # Node.js & Express backend
└── python-api/ # Django backend with ML logic



## ⚙️ Installation & Setup

### 1) Clone the repository:
```bash
git clone https://github.com/chhayank-thanki/visual-learning-assistant.git
cd visual-learning-assistant

2) setup node.js server

cd server
npm install
npm run dev

3) setup react client

cd ../client
npm install
npm start

4) setup Python Django API

cd ../python-api
pip install -r requirements.txt
python manage.py runserver

```

---

This README is **GitHub-ready**:  
- Explains what the project does  
- Includes setup steps for React + Node + Django  
- Highlights features and future scope

---

Do you want me to **also create a nice project logo/banner section at the top (ASCII art or image placeholder)** and **add screenshots placeholders** so it looks more attractive on GitHub? Or keep it simple like above?
