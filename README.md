# 🔐 Secure Life – Life Insurance Management Platform

**Live Site:** [https://secure-life.vercel.app](https://secure-life.vercel.app)

**Admin Credentials:**
- Email: `fahim@gmail.com`
- Password: `1234ABcd`

---

## 📄 Project Overview

**Secure Life** is a full-featured Life Insurance Management Platform built using the MERN Stack. It offers seamless policy application, agent management, transaction tracking, role-based dashboards, and PDF generation – all tailored to improve the life insurance experience for admins, agents, and customers.

---

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password)
- 🧑‍💼 Role-based Dashboards (Admin, Agent, Customer)
- 📋 Insurance Policy Application Form with Validation
- 📊 Admin Panel to Manage:
  - Applications
  - Policies
  - Agents
  - Transactions
  - Users
- 🧾 Admin Feedback on Rejected Applications via Modal
- 👨‍💼 Assign Agent Feature (with dropdown select)
- 📁 Policy PDF Export (Download Customer Policies)
- 💰 Stripe Payment Integration
- 🔍 Search & Filter Support (Policy Name, Category)
- 🖼️ Profile Management (with Image)
- 🔄 Dynamic Status Management (Pending, Approved, Rejected)
- 🌐 Modern UI with DaisyUI, Tailwind CSS, and Protected Routes

---

## 🧩 Technologies Used

- **Frontend:** React.js, React Router, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Auth
- **Payment:** Stripe
- **PDF Export:** `@react-pdf/renderer`
- **Data Fetching:** TanStack React Query (GET only)
- **Others:** Axios, React Hook Form, Toastify, Helmet

---

## 📦 Installed Packages and Versions

| Package                   | Version        |
|---------------------------|----------------|
| react                     | ^18.x.x        |
| react-dom                 | ^18.x.x        |
| react-router-dom          | ^6.x.x         |
| axios                     | ^1.x.x         |
| firebase                  | ^10.x.x        |
| @tanstack/react-query     | ^5.x.x         |
| react-hook-form           | ^7.x.x         |
| react-hot-toast           | ^2.x.x         |
| @react-pdf/renderer       | ^3.x.x         |
| stripe                    | ^12.x.x        |
| react-stripe-js           | ^2.x.x         |
| @headlessui/react         | ^1.x.x         |
| @heroicons/react          | ^2.x.x         |
| daisyui                   | ^4.x.x         |
| tailwindcss               | ^3.x.x         |
| react-icons               | ^4.x.x         |

---

## 🛠️ Setup Instructions

1. Clone the repository
2. Run `npm install` on both frontend and backend
3. Configure `.env` with Mongo URI, Stripe key, Firebase config
4. Start:
   - Frontend: `npm run dev`

---

## 📌 Note

- JWT-based API protection is **not yet implemented**, but Firebase authentication is fully functional.
- All GET requests are handled using React Query.
- All write operations (POST, PATCH, DELETE) are managed via Axios.

