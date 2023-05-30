import express from "express";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { signup, verifyToken } from "./constrollers/authContoller.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { createPost } from "./constrollers/postController.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "./public/assets")));

//FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.all("*", (req, res, next) => {
  console.log(req.body);
  next();
});

//Routes with file
app.post("/auth/signup", upload.single("picturePath"), signup);
app.post("/posts", upload.single("picture"), verifyToken, createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

export default app;
