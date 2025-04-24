# 📝 Task Management System

A comprehensive **Task Management System** built using **Node.js (Express)** and **React.js**. This project allows users to efficiently manage their tasks, collaborate on projects, and leverage AI-driven suggestions to improve task prioritization and productivity.

## 🚀 Key Features

- 🔐 **User Authentication**: Secure signup, login, and JWT-based authentication to ensure privacy and data security.
- ✅ **Task Management**: Create, edit, delete, and categorize tasks. Track progress using task statuses such as _To Do_, _In Progress_, and _Completed_.
- 🛠️ **Subtasks**: Break down complex tasks into manageable subtasks for improved focus and organization.
- 📊 **Prioritization**: Assign priority levels to tasks to ensure important work gets done first.
- 🤖 **AI-Powered Suggestions**: Receive intelligent suggestions for task prioritization, identify bottlenecks, and auto-generate subtasks using AI models (e.g., OpenAI).
- 📅 **3rd-Party Integrations**: Sync tasks with **Google Calendar**, send **Slack notifications**, and set up **email reminders** for task due dates.
- 💬 **Real-Time Collaboration**: Collaborate with other users on the same project in real-time, with live updates for task progress and comments.
- 📈 **Analytics Dashboard**: View productivity stats, completed tasks, and project progress.

## ⚙️ Technologies Used

- **Frontend**: React.js, React Router, React Hooks, CSS (for styling)
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB (Mongoose for object modeling)
- **Third-Party APIs**: Google Calendar API, Slack API, OpenAI (for AI suggestions)
- **Additional Tools**: Node-cron (for scheduled tasks), Winston (for logging)

## 📥 Setup and Installation

1. **Clone this repository**:

   ```bash
   git clone https://github.com/yourusername/task-management-system.git
   ```

2. **Install dependencies**:

   - Frontend:

   ```bash
   cd client
   npm install
   ```

   - Backend:

   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of your project and add the following:

   ```
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_API_KEY=your_google_api_key
   SLACK_API_KEY=your_slack_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server**:
   - Frontend:
   ```bash
   npm start
   ```
   - Backend:
   ```bash
   npm run dev
   ```
