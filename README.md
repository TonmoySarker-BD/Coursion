# Coursion

An **online course marketplace** where anyone can create, manage and enroll in courses.

---

## 🌐 Live URLs

| Service | URL |
|---------|-----|
| Client (React + Firebase Hosting) | <https://coursion.web.app/> |
| REST API (Vercel Serverless) | <https://coursion-server-eight.vercel.app/> |

---

## 🎯 Purpose

- Give **instructors** an easy dashboard to list, edit and track their courses.  
- Give **students** a smooth browsing & enrollment experience with real‑time seat management.  
- Showcase modern React 19 patterns + Tailwind CSS and serverless MongoDB.

---

## 🚀 Key Features

| Category | Details |
|----------|---------|
| Authentication | Firebase email / password, protected routes, profile update & password reset |
| Course Catalog | Home ➜ Courses list with search, category filter, sort (Newest / Most Enrolled / Top Rated) |
| Course Details | Dynamic `/Courses/:id` page with syllabus, remaining‑seat badge & animated hero |
| Enrollment Logic | • Seats limited to `totalSeats`  • Max 3 active courses per user  • One‑click toggle (Enroll ⇆ Remove) |
| Instructor Tools | Add / Edit / Delete course (with photo upload), Manage My Courses table |
| Student Tools | “My Enrolled Courses” table with Remove Enrollment |
| UI / UX | Tailwind 4 + DaisyUI, Framer‑motion hero sliders, React‑Slick carousels, Count‑up stats, SweetAlert 2 dialogs |
| API | Secure Axios instance (`useAxiosSecure`) with JWT interceptor; Express routes deployed as Vercel functions |

---

## 🗺️ Front‑End Route Map

```
/               → Home
/Courses        → Courses list
/Courses/:id    → Course details
/TeachOnCoursion→ How‑to‑teach landing
/add-course     → (private) New course form
/my-courses     → (private) My enrolled courses
/manage-courses → (private) Instructor dashboard
/edit-course/:id→ (private) Edit course
/signin         → Sign in
/register       → Register
/forgot-password→ Forgot password
/Profile        → (private) Profile
/update-profile → (private) Update profile
*               → 404 Not‑Found
```

---

## 🧩 Main NPM Packages

```
@tailwindcss/vite       4.1.8
axios                   1.9.0
firebase                11.9.1
framer-motion           12.17.0
react                   19.1.0
react-countup           6.5.3
react-dom               19.1.0
react-icons             5.5.0
react-intersection-observer 9.16.0
react-router            7.6.2
react-slick             0.30.3
slick-carousel          1.8.1
sweetalert2             11.6.13
tailwindcss             4.1.8
daisyui                 ^4 (included via Tailwind plugin)
```

---

## 🏗️ Local Development

```bash
# 1. clone both repos
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-TonmoySarker-BD.git coursion-client
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-TonmoySarker-BD.git coursion-server

# 2. install deps
cd coursion && npm install
cd ../coursion-server && npm install

# 3. server – add a .env with
# DB_USER=...
# DB_PASS=...
# JWT_SECRET=...
npm run dev           # server on http://localhost:3000

# 4. client – add a .env with
# VITE_API_URL=http://localhost:3000
npm run dev           # client on http://localhost:5173
```

---

## 📜 License

MIT © 2025 Tonmoy Sarker
