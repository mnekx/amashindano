import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockCounter = () => {
  const [stock, setStock] = useState({
    remaining_iron_sheets: 0,
    remaining_cement_packs: 0,
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate the time difference between the current date and the deadline
  const calculateTimeLeft = () => {
    const deadline = new Date('2024-12-30T00:00:00'); // Set the deadline to 30th Dec 2024
    const now = new Date(); // Get current date and time
    const difference = deadline - now; // Difference in milliseconds

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
    const stockInterval = setInterval(fetchStock, 10000); // Poll every 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(stockInterval);
  }, []);

  // Fetch stock data from the API
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/stock/')
      .then((response) => setStock(response.data))
      .catch((error) => console.error('Error fetching stock:', error));
  }, []);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  return (
    <div className='container h-100 mt-5'>
      <div className='row h-100 d-flex align-items-stretch'>
        {/* Stock Display Card */}
        <div className='col-md-6'>
          <div className='card h-100 shadow-sm'>
            <div className='card-header bg-primary text-white'>
              <h3>Mzigo uliobaki</h3>
            </div>
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <strong>Mabati:</strong> {stock.remaining_iron_sheets}
                </li>
                <li className='list-group-item'>
                  <strong>Mifuko ya sementi:</strong>{' '}
                  {stock.remaining_cement_packs}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Countdown Timer Card */}
        <div className='col-md-6'>
          <div className='card shadow-sm'>
            <div className='card-header bg-warning text-dark'>
              <h3>Muda unakimbia...</h3>
            </div>
            <div className='card-body text-center'>
              <h4 className='countdown'>
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
