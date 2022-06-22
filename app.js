const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
/* const cors = require('cors'); */

//Acceso a todos los origenes CORS
/* app.use(cors());  */


const PORT = process.env.PORT || 3050;
const app = express();
app.use(bodyParser.json())

//MySQL
const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b7ad243fb2b7f4',
    password: '3333934d',
    database: 'heroku_7d4ec896398f351'
});

//Verificacion de coneccion
connection.connect(error => {
    if (error) throw error;
    console.log('Correctamente conectado a la base de datos');
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

//Ruta 
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Salchichon Gonzalez');
});

//Todos los productos
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay productos');
        }
    })
});

//Producto por id
app.get('/products/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = `SELECT * FROM products WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('No hay productos');
        }
    })
});

// Nuevo producto
app.post('/addproduct', (req, res) => {
    const sql = 'INSERT INTO products SET ?';
    const product = {
        name: req.body.name,
        quantity: req.body.quantity,
        unitWeight: req.body.unitWeight,
        totalWeight: req.body.totalWeight,
    }
    connection.query(sql, product, error => {
        if (error) throw error;
        res.send('Producto agregado correctamente');
    });
});

// Actualizar producto
app.put('/updateproduct/:id', (req, res) => {
    const {id} = req.params;
    const {name, quantity, unitWeight, totalWeight} = req.body;
    const sql = `UPDATE products SET name = '${name}', quantity = ${quantity}, unitWeight = ${unitWeight}, totalWeight = ${totalWeight} WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Producto actualizado correctamente');
    });
});

//Eliminar producto
app.delete('/deleteproduct/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM products WHERE is = ${id}`;
    connection.query(sql, error =>{
        if (error) throw error;
        res.send('Producto eliminado');
    });
});

//Todos los insumos
app.get('/supplies', (req, res) => {
    const sql = 'SELECT * FROM supplies';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay Insumos');
        }
    })
});

//Insumo por id
app.get('/supplies/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = `SELECT * FROM supplies WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('No se encontro el insumo');
        }
    })
});

//Nuevo insumo
app.post('/addsupply', (req, res) => {
    const sql = 'INSERT INTO supplies SET ?';
    const product = {
        name: req.body.name,
        quantity: req.body.quantity,
        unitWeight: req.body.unitWeight,
        totalWeight: req.body.totalWeight,
    }
    connection.query(sql, product, error => {
        if (error) throw error;
        res.send('Insumo agregado correctamente');
    });
});

//Actualizar insumo
app.put('/updatesupply/:id', (req, res) => {
    const {id} = req.params;
    const {name, quantity, unitWeight, totalWeight} = req.body;
    const sql = `UPDATE supplies SET name = '${name}', quantity = ${quantity}, unitWeight = ${unitWeight}, totalWeight = ${totalWeight} WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Insumo actualizado correctamente');
    });
});

//Eliminar Insumo
app.delete('/deletesupply/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM supplies WHERE is = ${id}`;
    connection.query(sql, error =>{
        if (error) throw error;
        res.send('Insumo eliminado');
    });
});

//Todos los usuarios
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay usuarios registrados');
        }
    })
});

//Usuario por id   
app.get('/users/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('No se encontro el usuario');
        }
    })
});

//Nuevo usuario
app.post('/adduser', (req, res) => {
    const sql = 'INSERT INTO users SET ?';
    const product = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        rol: req.body.rol,
    }
    connection.query(sql, product, error => {
        if (error) throw error;
        res.send('Usuario agregado correctamente');
    });
});

//Actualizar usuario
app.put('/updateuser/:id', (req, res) => {
    const {id} = req.params;
    const {name, email, pass, rol} = req.body;
    const sql = `UPDATE supplies SET name = '${name}', quantity = ${email}, pass = ${pass}, rol = ${rol} WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Usuario actualizado correctamente');
    });
});

//Eliminar Usuario
app.delete('/deleteuser/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM users WHERE is = ${id}`;
    connection.query(sql, error =>{
        if (error) throw error;
        res.send('Usuario eliminado');
    });
});