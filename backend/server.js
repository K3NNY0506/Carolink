import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())
app.use(cors())

const webdev2testdb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "23100917",
    database: "webdev2testdb",
}) 

const salt = 5;
const secretKey = "importantsecret"; // Your secret key for signing the token

// Register Route
app.post("/register", (req, res) => {
    const sql = "INSERT INTO user (`username`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.json("Error");
        const values = [req.body.username, req.body.email, hash];
        webdev2testdb.query(sql, [values], (err, result) => {
            if (err) console.log(err);
            else return res.json(result);
        });
    });
});

// Login Route
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM user WHERE `email` = ?";
    webdev2testdb.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Error: "Error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ Error: "Error" });
                if (response) {
                    // Generate JWT Token
                    const token = jwt.sign({ userId: result[0].id }, secretKey, { expiresIn: '1h' });
                    return res.json({ Status: "Success", accessToken: token });
                } else {
                    return res.json({ Error: "Wrong Password" });
                }
            });
        } else {
            return res.json({ Error: "Email Does Not Exist" });
        }
    });
});

// Middleware to validate JWT
const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({ error: "User not logged in!" });

    try {
        const validToken = jwt.verify(accessToken, secretKey);
        req.user = validToken; // Attach decoded token to request object
        if (validToken) {
            return next(); // Continue to the next middleware or route handler
        }
    } catch (err) {
        return res.json({ error: err });
    }
};

// Protect routes that require authentication
app.post("/create-post", validateToken, (req, res) => {
    const { title, content } = req.body;
    const sql = "INSERT INTO posts (`user_id`, `title`, `content`) VALUES (?)";
    const values = [req.user.userId, title, content]; // Using the userId from the token
    webdev2testdb.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Error creating post" });
        return res.json({ Status: "Post created successfully", result });
    });
});

app.listen(8081, () => {
    console.log("listening on port 8081");
});
