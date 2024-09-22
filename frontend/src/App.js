import React from 'react';
import StockCounter from './components/StockCounter';
// import StockReductionForm from './components/StockReductionForm';
import './App.css';


function App() {
    return (
        <div className="h-100">
            <StockCounter />
            {/* <StockReductionForm /> */}
        </div>
    );
}

export default App;
