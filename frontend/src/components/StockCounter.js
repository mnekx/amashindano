import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockCounter = () => {
  const [stock, setStock] = useState({
    remaining_iron_sheets: 0,
    remaining_cement_packs: 0,
    served_schools: [],
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const deadline = new Date('2024-12-30T00:00:00');
    const now = new Date();
    const difference = deadline - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  // Fetch stock data from the API
  const fetchStock = () => {
    axios
      .get('http://localhost:8000/api/stock/')
      .then((response) => setStock(response.data))
      .catch((error) => console.error('Error fetching stock:', error));
  };

  // Initial fetch of stock data and countdown update
  useEffect(() => {
    fetchStock(); // Fetch stock when the component mounts

    // Update stock data every 10 seconds (polling)
    const stockInterval = setInterval(fetchStock, 600000); // Poll every 10 minutes

    // Cleanup interval on unmount
    return () => clearInterval(stockInterval);
  }, []);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/stock/')
      .then((response) => setStock(response.data))
      .catch((error) => console.error('Error fetching stock:', error));
  }, []);

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 mb-3'>
          <div className='card h-100 shadow-sm'>
            <div className='card-header bg-primary text-white'>
              <h3>Stock Remaining</h3>
            </div>
            <div className='card-body text-center'>
              <p className='display-4'>
                Iron Sheets: {stock.remaining_iron_sheets}
              </p>
              <p className='display-4'>
                Cement Packs: {stock.remaining_cement_packs}
              </p>
              <h4>Schools Served</h4>
              <ul className='list-group'>
                {stock.served_schools.map((school) => (
                  <li key={school.id} className='list-group-item'>
                    {school.name} <span className='text-success'>✔️</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='col-md-6 mb-3'>
          <div className='card h-100 shadow-sm'>
            <div className='card-header bg-warning text-dark'>
              <h3>Countdown to Deadline</h3>
            </div>
            <div className='card-body text-center'>
              <h4>
                {timeLeft.days} Days : {timeLeft.hours} Hours :{' '}
                {timeLeft.minutes} Minutes : {timeLeft.seconds} Seconds
              </h4>
              <p className='text-muted'>Deadline: 30th December 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCounter;
