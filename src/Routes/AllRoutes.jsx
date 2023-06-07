import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Summary from './Summary';

const AllRoutes = () => {
    return (
        <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/movie/:id" element={<Summary/>} />
        </Routes>
    );
};

export default AllRoutes;