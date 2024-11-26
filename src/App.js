// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './Component/Navbar';
import RecipeFinder from './Component/RecipeFinder';
import RecipeDetail from './Component/RecipeDetail';
import Footer from './Component/Footer';

const App = () => {
    return (
        <Router>
            <>
                <Navbar/>
                <main>
                <Routes>
                    <Route path="/" element={<RecipeFinder/>} />
                    <Route path="/recipe/:id" element={<RecipeDetail/>} />
                </Routes>
                </main>
                <Footer/>
            </>
        </Router>
    );
};

export default App;