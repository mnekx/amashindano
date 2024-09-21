import React, { useState } from 'react';
import axios from 'axios';

const StockReductionForm = () => {
    const [ironSheets, setIronSheets] = useState(0);
    const [cementPacks, setCementPacks] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('/api/stock/reduce/', {
            iron_sheets: ironSheets,
            cement_packs: cementPacks,
        })
        .then(response => alert('Stock updated!'))
        .catch(error => alert('Error updating stock.'));
    };

    return (
        <div className="container">
            <h2>Update Stock (Authorized Users Only)</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Iron Sheets to Deduct:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={ironSheets}
                        onChange={(e) => setIronSheets(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Cement Packs to Deduct:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={cementPacks}
                        onChange={(e) => setCementPacks(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Stock</button>
            </form>
        </div>
    );
};

export default StockReductionForm;
