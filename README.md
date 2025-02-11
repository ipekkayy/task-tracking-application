# Task Management Application

This is a **Task Management Application** built with **React** and **React-Bootstrap**. The application allows users to register, log in, manage tasks, and maintain a list of people associated with the tasks. Users can create, update, delete tasks, and also manage user profiles directly from the homepage.

## Features

- **User Registration & Login:**
  - Users can register with their **Full Name**, **T.C. Identity Number**, and **Password**.
  - Registered users are stored in `localStorage` and can log in to manage their tasks.

- **Task Management:**
  - Tasks can be created, updated, and moved between statuses: **Yeni (New)**, **Devam Eden (In Progress)**, **Tamamlanan (Completed)**, and **Silinen (Deleted)**.
  - Tasks are stored in `localStorage` for persistence.

- **People Management:**
  - Registered users are automatically added to the people list.
  - Users can manually add more people.
  - Clicking on a person opens a modal to edit their **Full Name**, **T.C. Identity Number**, and **Password**.
  - People can also be deleted.

- **Modals:**
  - **Add/Edit Tasks:** Modal for adding or editing tasks.
  - **Delete Confirmation:** Modal for confirming task deletions.
  - **Edit Person:** Modal for updating user details and deleting people.
  - **Add Person:** Modal for manually adding people.

---

## Technologies Used

- **React**
- **React-Bootstrap**
- **FontAwesome** (for icons)
- **LocalStorage** (for data persistence)

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```

4. **Access the App:**
   Open your browser and go to `http://localhost:3000`

---

## Folder Structure

```
/src
  /components
    TaskModal.js
    ConfirmDeleteModal.js
    TaskDetailModal.js
    AddPersonModal.js
    EditPersonModal.js
  /auth
    Login.js
    Register.js
  App.js
  HomePage.js
  App.css
/public
  /img
    bg.png
  /css
    custom-style.css
```

---

## Usage

1. **Register a New User:**
   - Go to `/register`.
   - Fill in your **Full Name**, **T.C. Identity Number**, and **Password**.
   - After successful registration, you will be redirected to the login page.

2. **Login:**
   - Enter your **T.C. Identity Number** and **Password**.
   - Upon successful login, you will be redirected to the homepage.

3. **Manage Tasks:**
   - Add tasks under different statuses (Yeni, Devam Eden, Tamamlanan).
   - Click on a task to edit details or delete it.

4. **Manage People:**
   - New users are automatically added to the people list.
   - Click on a person's icon to edit their details or delete them.
   - Use the **Kişi Ekle** button to manually add more people.

