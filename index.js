const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
require("colors");

connectDB();

// middleware
app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);
app.use(morgan("dev"));
app.use("/api/user/", userRoutes);
app.use("/api/product/", productRoutes);
app.get("/", async (req, res) => {
	res.send("running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
