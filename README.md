# Service Ticketing System

User Authentication, Customer Support Request Creation and Administration Action Capability for a Service Ticketing System.

---

## Screenshots

- Log in / Sign up Form

![image](https://user-images.githubusercontent.com/89210438/230742023-a5e04ce1-9a96-4d7d-a84f-d9436fc1e5ba.png)

- Customer Dashboard

![image](https://user-images.githubusercontent.com/89210438/230783795-14162435-17e0-4d82-a4de-4a2ec2b74983.png)

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
