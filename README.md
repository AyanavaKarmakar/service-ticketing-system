# Service Ticketing System

User Authentication, Customer Support Request Creation and Administration Action Capability for a Service Ticketing System.

---

## Technologies Used

### Backend

- [Live API](https://service-ticketing-system-api.onrender.com/welcome/api) deployed on [Render](https://render.com/)
- [Docs](https://documenter.getpostman.com/view/22237577/2s93RZNqMd)

![image](https://user-images.githubusercontent.com/89210438/230660293-1a87f187-0437-47c5-bc05-386bf78e04ac.png)

1. NodeJS
2. ExpressJS
3. MongoDB
4. Mongoose
5. TypeScript

### Frontend

1. React.js
2. TypeScript
3. Tailwind CSS
4. Radix UI

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
