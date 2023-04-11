![service-ticketing-system](https://user-images.githubusercontent.com/89210438/231180928-d4df240b-a553-4eb6-a115-ceae39a3ce3f.png)

---

## Screenshots

### 1. Shared

- Log in / Sign up Form

![image](https://user-images.githubusercontent.com/89210438/230794078-811fc7c5-94e4-4005-a733-36d166b8bcfb.png)

### 2. Customer

- Dashboard

![image](https://user-images.githubusercontent.com/89210438/231137302-e5c887b7-f386-430c-9e3d-132717f794e5.png)

- New Service Request Form

![image](https://user-images.githubusercontent.com/89210438/230794555-3f91be19-b603-4553-8bdf-a0ad8364cc7b.png)

- Service Request Form Details

![image](https://user-images.githubusercontent.com/89210438/230892007-95b90417-f2be-411d-99bb-87454828e8dc.png)

### 3. Employee (ADMIN)

- Dashboard

![image](https://user-images.githubusercontent.com/89210438/230956398-7b1e845e-8d38-4fa6-afb1-3681f3a3bb53.png)

- Unallocated Tasks

![image](https://user-images.githubusercontent.com/89210438/230956159-8523a27d-9c77-42dd-9217-26c0d84c8f9f.png)

- Assign Unallocated Tasks

![image](https://user-images.githubusercontent.com/89210438/230948213-14614cf1-2018-4a67-b80a-906ce01d78ed.png)

- Allocated Tasks

![image](https://user-images.githubusercontent.com/89210438/230956735-d13055ac-ab64-48f6-a66c-66f6a46f5f98.png)

- De-assign Allocated tasks

![image](https://user-images.githubusercontent.com/89210438/230948297-cc55591e-773d-486d-96a2-8505db4ff6b9.png)

- Update Task Status

![image](https://user-images.githubusercontent.com/89210438/230957136-66f0efb6-b057-4be9-b28b-74019190da9c.png)

### 4. Employee (NON-ADMIN)

- Dashboard

![image](https://user-images.githubusercontent.com/89210438/230956916-9f4dda51-2951-4b1b-930a-7d31cd484f28.png)

- Update Task Status

![image](https://user-images.githubusercontent.com/89210438/230957032-6694ec5b-8ba9-46f4-a8ea-e3945a452d86.png)

---

## Technologies Used

### Backend

- [Live API](https://service-ticketing-system-api.onrender.com/welcome/api) deployed on [Render](https://render.com/)
- [Docs](https://documenter.getpostman.com/view/22237577/2s93RZNqMd)
- **Note**: Server maybe slow at first usage due to coldstarts

![image](https://user-images.githubusercontent.com/89210438/230775322-b8035698-4be7-42a3-87c2-f896dfeef512.png)

1. NodeJS
2. ExpressJS
3. Multer
4. MongoDB
5. Mongoose
6. TypeScript
7. Cloudinary

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
CLOUDINARY_CLOUD_NAME=cloud
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=secret
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
