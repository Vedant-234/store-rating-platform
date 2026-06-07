const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores",storeRoutes);
app.use("/api/ratings",ratingRoutes);
app.use("/api/owners",ownerRoutes);
app.use("/api/user",userRoutes);

app.listen(process.env.PORT, () =>{
        console.log(`Server Running on Port ${process.env.PORT}`)
    })


