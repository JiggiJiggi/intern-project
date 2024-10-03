import express from "express";
import ebookRouter from "./routes/ebook";

const app = express();

app.use(express.json());

app.use("/api/ebook", ebookRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});