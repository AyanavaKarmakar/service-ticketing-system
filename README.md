# Service Ticketing System

User Authentication, Customer Support Request Creation and Administration Action Capability for a Service Ticketing System.

---

## Screenshots

- Log in / Sign up Form

![image](https://user-images.githubusercontent.com/89210438/230794078-811fc7c5-94e4-4005-a733-36d166b8bcfb.png)

- Customer Dashboard

![image](https://user-images.githubusercontent.com/89210438/230794137-49995f9c-434d-4f35-ab46-5f11aec7ef7a.png)

- New Service Request Form

![image](https://user-images.githubusercontent.com/89210438/230794342-ab04cfae-58b9-41b1-b973-3ece26aa42cc.png)

---

## Technologies Used

### Backend

- [Live API](https://service-ticketing-system-api.onrender.com/welcome/api) deployed on [Render](https://render.com/)
- [Docs](https://documenter.getpostman.com/view/22237577/2s93RZNqMd)

![image](https://user-images.githubusercontent.com/89210438/230775322-b8035698-4be7-42a3-87c2-f896dfeef512.png)

1. NodeJS
2. ExpressJS
3. MongoDB
4. Mongoose
5. TypeScript

### Frontend

- [Live Site](https://service-ticketing-system.vercel.app/) deployed on [Vercel](https://vercel.com/)

1. React.js
2. TypeScript
3. Tailwind CSS
4. Radix UI
5. Headless UI
6. React Query
7. Redux Toolkit
8. React Hot Toast

---

## Getting Started

### Backend

1. Install Dependencies

```bash
cd backend
npm install
```

2. Create a .env file in the root directory of the backend folder and add the following environment variables

```bash
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key
```

3. Run the server

```bash
npm run dev
```

The server will start running on port `3000`

---

### Frontend

1. Install Dependencies

```bash
cd frontend
npm install
```

2. Create a .env file in the root directory of the frontend folder and add the following environment variables

```bash
VITE_API_URL = http://localhost:3000
```

3. Run the server

```bash
npm run dev
```
