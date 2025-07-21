# 🏥 Hospital Management System – Full Stack Project

A full-fledged **Hospital Management System** built with **ReactJS (Frontend)** and **Spring Boot (Backend)** using **PostgreSQL** database. This application helps manage patients, doctors, appointments, and medicines in a hospital with proper relational mapping and user-friendly UI.

---

## 🚀 Tech Stack

### 🔸 Frontend
- React JS
- Axios (for API communication)
- Bootstrap 4 (for styling)
- React Router DOM
- React Toastify

### 🔹 Backend
- Java + Spring Boot
- Spring Data JPA (with DTOs)
- Hibernate
- PostgreSQL
- RESTful APIs
- Maven

---

## 🧩 Entity Relationships & Mappings

- **Patient ↔ Address** → One-to-One
- **Patient → Doctor** → Many-to-One
- **Doctor → Appointments** → One-to-Many
- **Patient ↔ Medicine** → Many-to-Many

---

## 📋 Functionalities

- ✅ Add / Update / Delete Patients with Address, Doctor & Medicines
- ✅ Assign Doctors and Medicines using dropdowns & multi-select
- ✅ Full CRUD operations on Doctors, Appointments, and Medicines
- ✅ Backend DTOs for clean API data handling
- ✅ Styled frontend with Bootstrap forms and responsive layout
- ✅ Toast notifications and form validations

---

## 📂 Project Structure
Hospital-Management-System/
├── hospital-backend/ # Spring Boot backend (Maven project)
├── hospital-frontend/ # ReactJS frontend (Bootstrap + Axios)
└── README.md

## 📦 Setup Instructions

### Backend (Spring Boot)
```bash
cd hospital-backend
# Add PostgreSQL credentials in application.properties
mvn spring-boot:run
```
### Frontend (React )
```
cd hospital-frontend
npm install
npm start
```

🙌 Author
Saurabh Balu Narawade

📧 saurabhnarawade22@gmail.com
