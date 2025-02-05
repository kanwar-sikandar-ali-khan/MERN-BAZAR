const express = require("express");
const env = require("./config/envConfig");
const cors = require("cors");
const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/orderRoutes");
const parentRoutes = require("./routes/parentRoutes");
const childrenRoutes = require("./routes/childrenRoutes")


const app = express();

// database connection
connect();
app.use(cors());
app.post(
  "/api/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
// add middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to chawkbazar" });
});
// user routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);
app.use("/api", parentRoutes);
app.use("/api", childrenRoutes);



const port = env.PORT || 5001;

app.listen(port, () => {
  console.log(`Your server is running at port number: ${port}`);
});
