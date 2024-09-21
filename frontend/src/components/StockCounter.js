import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockCounter = () => {
    const [stock, setStock] = useState({ remaining_iron_sheets: 0, remaining_cement_packs: 0 });

    useEffect(() => {
        axios.get('/api/stock/')
            .then(response => setStock(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container">
            <h2>Stock Remaining</h2>
            <ul>
                <li>Iron Sheets: {stock.remaining_iron_sheets}</li>
                <li>Cement Packs: {stock.remaining_cement_packs}</li>
            </ul>
        </div>
    );
};

export default StockCounter;
