const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//conexion con la base de datos
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud-cg"
});

//peticion de datos
app.get("/productos",(req,res)=>{
    db.query('SELECT * FROM productos',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );  
});

//peticion de registro
app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const descrip = req.body.descrip;
    const precio = req.body.precio;
    db.query('INSERT INTO productos (nombre,descrip,precio) VALUES (?,?,?)',[nombre,descrip,precio],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Producto agregado!");
        }
    }
    );  
});

//peticion de actualizacion
app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const descrip = req.body.descrip;
    const precio = req.body.precio;
    db.query('UPDATE productos SET nombre=?,descrip=?,precio=? WHERE ID=?',[nombre,descrip,precio,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Producto modificado!");
        }
    }
    );  
});


//peticion de eliminacion
app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM productos  WHERE ID=?',[id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Conexión, puerto:3001")
});