require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const cors = require("cors"); 

connectDB();

app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
