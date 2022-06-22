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
    res.send('Bienvenido a casa');
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
app.post('/add', (req, res) => {
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
app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const {name, quantity, unitWeight, totalWeight} = req.body;
    const sql = `UPDATE products SET name = '${name}', quantity = ${quantity}, unitWeight = ${unitWeight}, totalWeight = ${totalWeight} WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Producto actualizado correctamente');
    });
});

//Eliminar producto
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM products WHERE is = ${id}`;
    connection.query(sql, error =>{
        if (error) throw error;
        res.send('Producto eliminado');
    });
});