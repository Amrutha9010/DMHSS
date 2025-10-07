import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB Error:", err));

// Routes
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
