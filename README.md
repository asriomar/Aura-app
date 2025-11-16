
# Aura: Student Wellness Planner

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3-blue?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Google%20Gemini-API-blue?logo=google" alt="Google Gemini" />
</p>

**Aura** is an intelligent web application designed for students to manage both academic tasks and mental well-being in a single, integrated platform. It moves beyond a simple to-do list by proactively scheduling restorative breaks, providing burnout alerts, and encouraging a healthy, balanced workflow.

---

## ✨ Key Features

Aura is built around the idea that well-being is not an afterthought but a crucial part of a student's success.

*   **🧠 Smart Academic Planner:**
    *   **AI-Powered Task Chunking:** Add a large task like "Write History Essay," and Aura, powered by the Google Gemini API, automatically breaks it down into small, manageable subtasks.
    *   **Progress Tracking:** Visualize your progress on each task as you check off subtasks.

*   **🌦️ Workload "Weather":**
    *   The dashboard displays a weekly workload forecast: **Light Drizzle**, **Busy**, or **Stormy**.
    *   This visual cue helps you mentally prepare for the week ahead.

*   **⚠️ Proactive Burnout Alerts:**
    *   Aura tracks your workload history. If your schedule is "Stormy" for 3 or more consecutive days, a gentle burnout alert appears.
    *   The alert includes a one-click button to schedule a "De-Stress Block," guiding you toward necessary rest.

*   **🧘 Well-Being Buffers:**
    *   After completing a task, Aura immediately prompts you to take a restorative break.
    *   Choose from a menu of quick activities categorized by **Mind**, **Body**, and **Senses**.
    *   Build a **Well-being Streak** by consistently taking breaks, gamifying your self-care.

*   **💖 Positive Social Nudges:**
    *   A weekly "Kindness Prompt" suggests a simple, positive social action to help you feel more connected.

*   **⏱️ Focus Timer:**
    *   A built-in Pomodoro-style timer to help you get into deep work sessions, with scheduled focus and break intervals.

## 🚀 Tech Stack

*   **Frontend:** [React](https://react.dev/) (with Hooks), [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI/LLM:** [Google Gemini API](https://ai.google.dev/)
*   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
*   **Local Storage:** Browser `localStorage` for persisting tasks and user data.

## 📂 Project Structure

The codebase is organized to be modular and easy to navigate.

```
/
├── public/
├── src/
│   ├── components/       # Reusable React components (Header, TaskList, Modals, etc.)
│   │   └── icons/        # SVG Icon components
│   ├── services/         # API service modules (geminiService.ts)
│   ├── App.tsx           # Main application component and state management
│   ├── index.tsx         # React entry point
│   └── types.ts          # Shared TypeScript types and enums
├── index.html            # Main HTML file
└── README.md             # You are here!
```

## 🛠️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/aura.git
    cd aura
    ```

2.  **Set up your Environment Variables:**
    The application uses the Google Gemini API for its intelligent features. You will need an API key.

    *   Create a file named `.env` in the root of your project.
    *   Add your API key to this file:
        ```
        VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
        ```
    *Note: If you are not using a build tool like Vite, you may need to configure how environment variables are loaded.*

3.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    The application should now be running on your local development server (usually `http://localhost:5173`).


## 📈 Future Enhancements

Aura is currently a feature-rich prototype. Here are some potential next steps to make it a production-ready app:

-   [ ] **User Authentication:** Secure login/register functionality.
-   [ ] **Backend & Database:** A dedicated backend (Node.js/Express) and database (PostgreSQL/MongoDB) to store user data permanently.
-   [ ] **Push Notifications:** Reminders for tasks, breaks, and burnout alerts.
-   [ ] **Calendar Integration:** Sync with Google Calendar or iCal.
-   [ ] **Full Dark/Light Mode:** Implement a theme-switcher toggle.
-   [ ] **Data Export:** Allow users to export their task and well-being logs.
