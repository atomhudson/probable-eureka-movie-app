import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/pages/Layout.jsx';
import Home from './components/pages/Home.jsx';
import About from './components/pages/About.jsx';
import Developer from './components/pages/Developer.jsx';



const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="developer" element={<Developer />} />
            </Route>
        </Routes>
    )
}
export default App
