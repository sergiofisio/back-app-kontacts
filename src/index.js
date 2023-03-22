require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const rota = require("./routes");

app.use(cors());

app.use(express.json());

app.use(rota);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Ouvindo a porta ${port}`));
