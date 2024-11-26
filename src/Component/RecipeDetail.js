// src/components/RecipeDetail.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './RecipeDetail.css';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const API_KEY = 'YOUR_SPOONACULAR_API_KEY';
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                    params: { apiKey: API_KEY }
                });
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe details', error);
            }
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-detail">
            <Link to="/">Back to Recipes</Link>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <h3>Ingredients</h3>
            <ul>
                {recipe.extendedIngredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
        </div>
    );
};

export default RecipeDetail;