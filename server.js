const express = require('express');
const cors = require('cors');
const authValidation = require('./app/middleware/authMiddleware');
const app = express();
const dotenv = require("dotenv").config();
// var corsOption = {
    
// }

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// Add routes path
const authRoutes = require('./app/routes/auth.routes');
const userRoutes = require('./app/routes/user.routes');


app.get("/", (req, res) => {
    res.json({ message: "Welcome to RBAC application." });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', authValidation, userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

