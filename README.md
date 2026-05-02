# 🚀 DeployDash

**Backend Repository:** [https://github.com/emtpy-main/agenticDevops](https://github.com/emtpy-main/agenticDevops)

DeployDash is an intelligent, AI-powered DevOps automation agent designed to streamline your deployment pipeline. By abstracting away complex infrastructure configurations, DeployDash takes your code from repository to production in under 60 seconds.

## ✨ Features

- **🧠 AI-Driven Automation:** Automatically analyzes your codebase and generates optimized deployment strategies.
- **⚡ Zero-Config Dockerization:** Auto-generates Dockerfiles based on project requirements.
- **🔄 Live Terminal Streaming:** Real-time deployment logs streamed directly to your dashboard via WebSockets.
- **🛡️ Secure Authentication:** Integrated Google Sign-In and secure session management via Firebase.
- **🪄 Self-Healing Pipelines:** AI detects build errors and automatically attempts to resolve common configuration issues.
- **🎨 Premium UI/UX:** A highly polished, multi-step onboarding flow built with React and Framer Motion.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion / GSAP
- **State Management:** Zustand / React Context

### **Backend & Core Agent**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Real-Time Streaming:** Socket.io (WebSockets) / Server-Sent Events (SSE)
- **Authentication & Database:** Firebase Auth & Cloud Firestore

### **DevOps & Infrastructure**
- **Containerization:** Docker
- **Version Control Integration:** GitHub API
- **Hosting / Deployment:** Render / Vercel Hooks

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) (for local container testing)
- A [Firebase](https://firebase.google.com/) account for authentication setup.

### Installation

**1. Clone the frontend repository**
\`\`\`bash
git clone https://github.com/your-username/deploydash-frontend.git
cd deploydash-frontend
\`\`\`

**2. Install dependencies**
\`\`\`bash
npm install
\`\`\`

**3. Setup Environment Variables**
Create a `.env` file in the root directory and add your configuration details:
\`\`\`env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_BACKEND_URL=http://localhost:5000
\`\`\`

**4. Start the development server**
\`\`\`bash
npm run dev
\`\`\`

*(Note: To run the full application, ensure the [Backend Service](https://github.com/emtpy-main/agenticDevops) is also running locally).*

---

## 🔐 Security Note
DeployDash handles sensitive credentials like GitHub Tokens and Docker passwords. All secrets are transmitted securely, heavily obfuscated in the UI, and never permanently stored in plain text. Always ensure your `.env` and `serviceAccountKey.json` files are listed in your `.gitignore`.
