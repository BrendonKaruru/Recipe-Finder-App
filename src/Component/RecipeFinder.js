import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecipeFinder.css';

const RecipeFinder = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [diet, setDiet] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state
    
    const navigate = useNavigate();

    const handleSearch = async () => {
        setLoading(true); // Set loading to true when starting the fetch
        setError(''); // Clear previous errors
        const API_KEY = '9363ddd6c5bd4a47b8ff51416a626a8d';
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    includeIngredients: ingredients,
                    diet: diet,
                    cuisine: cuisine,
                    number: 10,
                    offset: (page - 1) * 10,
                    apiKey: API_KEY
                }
            });
            setRecipes(response.data.results);
            setTotalPages(Math.ceil(response.data.totalResults / 10));
        } catch (error) {
            setError('Failed to fetch recipes. Please try again later.'); // Set error message
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        handleSearch();
    };

    const handleRecipeClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    return (
        <div className="recipe-finder">
            {loading && <div className="loading-spinner">Loading...</div>} {/* Show loading spinner */}
            {error && <div className="error-message">{error}</div>} {/* Show error message */}
            
            <input
                type="text"
                placeholder="Enter ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="search-input"
            />
            <select value={diet} onChange={(e) => setDiet(e.target.value)} className="filter-select">
                <option value="">Select Diet</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="gluten free">Gluten Free</option>
                <option value="paleo">Paleo</option>
                <option value="keto">Keto</option>
            </select>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="filter-select">
                <option value="">Select Cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Indian">Indian</option>
                <option value="Mexican">Mexican</option>
                <option value="American">American</option>
                
            </select>
            <button onClick={handleSearch} className="search-button">SEARCH</button>
            <div className="recipe-cards">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card" onClick={() => handleRecipeClick(recipe.id)}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} />
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default RecipeFinder;