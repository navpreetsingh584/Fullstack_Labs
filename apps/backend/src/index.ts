import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import employeeRoutes from "./routes/employeeRoutes";
import organizationRoutes from "./routes/organizationRoutes";

const app = express();
const PORT = 4000;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
}));

app.use(express.json());
app.use(clerkMiddleware());

// All employee routes — GET is public, POST is protected inside the router
app.use("/employees", employeeRoutes);
app.use("/organization", organizationRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});