import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import app from "./app.js";

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection was established"))
  .catch((err) =>
    console.log(`Couldn't establish the connection, ${err.message}`)
  );

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on ${port}... `);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
