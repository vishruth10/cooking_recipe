document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recipe-form');
    const recipesContainer = document.getElementById('recipes-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('/submit-recipe', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            form.reset();
            loadRecipes();
        })
        .catch(error => console.error('Error:', error));
    });

    function loadRecipes() {
        fetch('/recipes')
            .then(response => response.json())
            .then(data => {
                recipesContainer.innerHTML = '';
                data.forEach(recipe => {
                    const recipeDiv = document.createElement('div');
                    recipeDiv.classList.add('recipe');
                    recipeDiv.innerHTML = `
                        <h3>${recipe.title}</h3>
                        <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
                        <p><strong>Cooking Time:</strong> ${recipe.cooking_time} minutes</p>
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Instructions:</strong>