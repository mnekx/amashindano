import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockCounter from './components/StockCounter';
import StockReductionForm from './components/StockReductionForm';
import Navbar from './components/Navbar';  // Optional: Add a navigation bar

function App() {
    return (
        <Router>
            <div>
                <Navbar />  {/* Optional: Add a navigation bar */}
                <Routes>
                    {/* Route for StockCounter (default or homepage) */}
                    <Route path="/" element={<StockCounter />} />

                    {/* Route for StockReductionForm */}
                    <Route path="/reduce-stock" element={<StockReductionForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
