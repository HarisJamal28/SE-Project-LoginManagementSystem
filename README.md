
# University Alumni Login Management System

This project was developed as a **2nd Year End of Semester Project** for our **Software Engineering** course. The task was to design, develop, and deploy a **Login Management System** that:

- Connects to a database
- Supports **Role-Based Access** (User & Admin)
- Is themed around **University Alumni**

To Access Admin: 
a2@gmail.com
123456

---

## 👥 Team Members

| Role               | Name              | GitHub Username         |
|--------------------|-------------------|--------------------------|
| Team Lead          | Abdullah Awan      | [@Abdullah-Awan92](https://github.com/Abdullah-Awan92) |
| Frontend Developer | Faizan Elahi       | [@faaizane](https://github.com/faaizane)               |
| Backend Developer  | Haris Jamal        | [@HarisJamal28](https://github.com/HarisJamal28)       |
| Postman Testing    | Ahsen Khalil       |                                                        |

---

## 🔧 Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Cloud (MongoDB Atlas)

---

## 🚀 Features

- Secure login & registration system
- Role-based authentication (User & Admin)
- MongoDB integration with Mongoose
- Protected routes for different roles
- Responsive design with Tailwind CSS
- Deployment-ready backend (e.g., on Vercel)

---

## 📦 Project Structure

```
/root
│
├── index.js                # Main server file
├── routes/                 # All route handlers
├── models/                 # MongoDB schemas
├── .env                    # Environment variables (not committed)
├── .gitignore              # node_modules, .env
└── vercel.json             # Vercel deployment config
```

---

## 🌐 Deployment

The project is deployed using **Vercel** with environment variables securely managed for MongoDB URI and JWT secrets.

---

## 📎 Notes

- Make sure to add your own `.env` file when running locally:
  ```
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_secret
  ```

---

## 📄 License

This project was built as a part of an academic requirement and is not licensed for commercial use.
