import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://todoclient-self.vercel.app",
  "https://todoclient-self.vercel.app/",
  "https://todoclient-git-main-michaelleojacob.vercel.app",
  "https://todoclient-git-main-michaelleojacob.vercel.app/",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

export default corsOptions;
