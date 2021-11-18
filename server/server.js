const express = require('express')
const app = express();
const mysql = require("mysql")
const cors = require('cors')
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "employeesystem",
})

app.post("/create", (req, res) =>{
    const firstName = req.body.firstName;
    const lastname = req.body.lastName;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (firstName, lastname, age, country, position, wage) VALUES (?,?,?,?,?,?)",
        [firstName,lastname, age, country, position, wage],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
    });

  app.get('/employees', (req,res) =>{
    db.query("SELECT * FROM employees", (err,result) =>{
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    })
  })

  app.put('/update', (req,res) =>{
    const employeeId = req.body.employeeId;
    const wage = req.body.wage;
    db.query("UPDATE employees SET wage = ? WHERE employeeId = ?", [wage, employeeId], (err,result) =>{
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    })
  })

  app.delete('/delete/:employeeId', (req,res) =>{
    const employeeId = req.params.employeeId;
    db.query("DELETE FROM employees WHERE employeeId = ?", employeeId, (err,result) =>{
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    })

  })

  // app.delete('/delete')

app.listen(3001, ()=>{
    console.log("Your server is running on port 3001");
})