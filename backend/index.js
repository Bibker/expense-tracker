const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const incomeRoute = require("./routes/incomeRoute");
const expenseRoute = require("./routes/expenseRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.info(`Server Listening on PORT ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/auth", userRoute);
app.use("/income", incomeRoute);
app.use("/expense", expenseRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFound);
app.use(errorHandler);
