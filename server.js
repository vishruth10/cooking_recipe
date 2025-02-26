const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'RecipeDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes

// Create a new recipe
app.post('/submit-recipe', (req, res) => {
    const { title, cuisine, cooking_time, ingredients, instructions, author } = req.body;
    const sql = 'INSERT INTO Recipes (title, cuisine, cooking_time, ingredients, instructions, author) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [title, cuisine, cooking_time, ingredients, instructions, author], (err, result) => {
        if (err) throw err;
        res.send('Recipe submission successful!');
    });
});

// Read all recipes
app.get('/recipes', (req, res) => {
    const sql = 'SELECT * FROM Recipes';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update a recipe
app.put('/update-recipe/:id', (req, res) => {
    const { title, cuisine, cooking_time, ingredients, instructions, author } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Recipes SET title = ?, cuisine = ?, cooking_time = ?, ingredients = ?, instructions = ?, author = ? WHERE id = ?';
    connection.query(sql, [title, cuisine, cooking_time, ingredients, instructions, author, id], (err, result) => {
        if (err) throw err;
        res.send('Recipe updated successfully!');
    });
});

// Delete a recipe
app.delete('/delete-recipe/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Recipes WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Recipe deleted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
