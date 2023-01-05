import cors from "cors";

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default corsOptions;
