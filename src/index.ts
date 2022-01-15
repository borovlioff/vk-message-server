require("dotenv").config();
import express = require("express");
import routes from "./routes";
import cors from "cors";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGOBD: string;
      NODE_ENV: "development" | "production";
      PORT?: number;
    }
  }
}

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(`/`, routes);

app.listen(PORT, () => {
  console.log("\x1Bc");
  console.log(`⚡️ Server start on: localhost:${PORT} \nPORT:${PORT}`);
});
