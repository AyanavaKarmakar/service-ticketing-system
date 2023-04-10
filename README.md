# Service Ticketing System

User Authentication, Customer Support Request Creation and Administration Action Capability for a Service Ticketing System.

---

## Screenshots

### 1. Shared

- Log in / Sign up Form

![image](https://user-images.githubusercontent.com/89210438/230794078-811fc7c5-94e4-4005-a733-36d166b8bcfb.png)

### 2. Customer

- Dashboard

![image](https://user-images.githubusercontent.com/89210438/230889870-5443fb33-c537-4edb-ad52-7a543bbf9698.png)

- New Service Request Form

![image](https://user-images.githubusercontent.com/89210438/230794555-3f91be19-b603-4553-8bdf-a0ad8364cc7b.png)

- Service Request Form Details

![image](https://user-images.githubusercontent.com/89210438/230892007-95b90417-f2be-411d-99bb-87454828e8dc.png)

### 3. Employee (ADMIN)

- Dashboard

![image](https://user-images.githubusercontent.com/89210438/230932734-6a55731a-3feb-4e85-adcd-958e005e9bb9.png)

- Unallocated Tasks

![image](https://user-images.githubusercontent.com/89210438/230932985-a8a84bfa-3a58-4ea2-baa8-7652964968b3.png)

- Assign Unallocated Tasks

![image](https://user-images.githubusercontent.com/89210438/230948213-14614cf1-2018-4a67-b80a-906ce01d78ed.png)

- Allocated Tasks

![image](https://user-images.githubusercontent.com/89210438/230933053-ede91615-33e8-4fa2-8c45-b0cd4d2fb637.png)

- De-assign Allocated tasks

![image](https://user-images.githubusercontent.com/89210438/230948297-cc55591e-773d-486d-96a2-8505db4ff6b9.png)

- Update Task Status

![image](https://user-images.githubusercontent.com/89210438/230948416-62cb46c5-dcd9-419a-957f-8cbb0fbd3922.png)

### 4. Employee (NON-ADMIN)

- Dashboard

![image](https://user-images.githubusercontent.com/89210438/230951267-3515730d-d14f-407b-b7bc-480a3729ddf0.png)

---

## Technologies Used

### Backend

- [Live API](https://service-ticketing-system-api.onrender.com/welcome/api) deployed on [Render](https://render.com/)
- [Docs](https://documenter.getpostman.com/view/22237577/2s93RZNqMd)

![image](https://user-images.githubusercontent.com/89210438/230775322-b8035698-4be7-42a3-87c2-f896dfeef512.png)

1. NodeJS
2. ExpressJS
3. Multer
4. MongoDB
5. Mongoose
6. TypeScript

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
