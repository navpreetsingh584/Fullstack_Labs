import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import employeeRoutes from "./routes/employeeRoutes";
import organizationRoutes from "./routes/organizationRoutes";

const app = express();
const PORT = 4000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://fullstack-labs-one.vercel.app",
  ],
}));

app.use(express.json());
app.use(clerkMiddleware());

app.use("/employees", employeeRoutes);
app.use("/organization", organizationRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});