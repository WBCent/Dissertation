import express from 'express';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as assetRouter from './server/assets-router.mjs';

app.use(express.json());

app.use("/formsubmission", (req,res) => {
    console.log("form submitted", req.body);
    res.status(200).json({message: "The form was submitted"});
});

app.get("/retrievequestions", (req, res) => {
  console.log("Its started")
  let randomQuestion = {
    Module: "CS2006",
    Practical: "The Hard One",
    Problem: "Its so hard I cannot do it",
    location: "PC9-008",
  }
  res.json({randomQuestion})
  console.log("sent!")
})
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/src", assetRouter.router);

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});





//const { PORT = 5000 } = process.env;
const PORT = 5000;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});