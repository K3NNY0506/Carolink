import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import bycrypt from 'bcrypt'

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
app.post("/register", (req,res) =>{
    const sql = "INSERT INTO user (`username`,`email`,`password`) VALUES (?)";
    bycrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json("Error")
        const values = [req.body.username,req.body.email,hash]
    webdev2testdb.query(sql,[values],(err,result) => {
        if(err) console.log(err);
        else return res.json(result)
    })
    })
})

app.post("/login", (req,res) =>{
    const sql = "SELECT * FROM user WHERE `email` = ? ";
    webdev2testdb.query(sql,[req.body.email],(err,result)=>{
        if(err) return res.json({Error:"Error"})
        else{
            if(result.length > 0 ){
                bycrypt.compare(req.body.password.toString(), result[0].password,(err,response) =>{
                    if(err) return res.json({Error:"Error"})
                    if(response) return res.json({Status:"Success"})
                    else return res.json({Error:"Wrong Password"})

                })
            }else{
                return res.json({Error:"Email Does Not Exist"})
            }
        }
    })

})

app.listen(8081, () => {
    console.log("listening on port 8081")
})