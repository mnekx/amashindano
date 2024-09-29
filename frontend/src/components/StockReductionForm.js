import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockReductionForm = () => {
  const [ironSheets, setIronSheets] = useState(0);
  const [cementPacks, setCementPacks] = useState(0);
  const [schools, setSchools] = useState([]);
  const [servedSchools, setServedSchools] = useState([]); // Schools that have taken stock
  const [filteredSchools, setFilteredSchools] = useState([]); // Schools that haven't taken stock
  const [selectedSchool, setSelectedSchool] = useState('');
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state
  const [passphrase, setPassphrase] = useState(''); // Store entered passphrase
  const [isAuthorized, setIsAuthorized] = useState(false); // Track if user is authorized

  const correctPassphrase = 'pass';

  // Fetch the list of schools when the component mounts
  useEffect(() => {
    if (isAuthorized) {
      axios
        .get('http://localhost:8000/api/schools/')
        .then((response) => setSchools(response.data))
        .catch((error) => console.error('Error fetching schools:', error));

      // Fetch stock to get served schools
      axios
        .get('http://localhost:8000/api/stock/')
        .then((response) => {
          setServedSchools(response.data.served_schools);
        })
        .catch((error) =>
          console.error('Error fetching served schools:', error)
        );
    }
  }, [isAuthorized]);

  // Filter schools that haven't taken stock yet
  useEffect(() => {
    const unservedSchools = schools.filter(
      (school) =>
        !servedSchools.some((servedSchool) => servedSchool.id === school.id)
    );
    setFilteredSchools(unservedSchools); // Update filtered schools list
  }, [schools, servedSchools]); // Recalculate when schools or served schools change

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedSchool) {
      setAlert('Please select a school.');
      return;
    }

    setIsSubmitting(true); // Set loading state to true
    setAlert(null); // Clear any previous alert

    axios
      .put('http://localhost:8000/api/stock/reduce/', {
        iron_sheets: ironSheets,
        cement_packs: cementPacks,
        school_id: selectedSchool,
      })
      .then((response) => setAlert('Stock updated successfully!'))
      .catch((error) => setAlert('Error updating stock.'))
      .finally(() => {
        setIsSubmitting(false); // Reset loading state after submission
      });
  };

  const handlePassphraseSubmit = (event) => {
    event.preventDefault();
    if (passphrase === correctPassphrase) {
      setIsAuthorized(true); // Grant access if passphrase is correct
      setAlert(null); // Clear any previous alert
    } else {
      setAlert('Incorrect passphrase, please try again.');
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card shadow-lg'>
            <div className='card-header bg-primary text-white'>
              <h3 className='mb-0'>
                {isAuthorized
                  ? 'Reduce Stock for a School'
                  : 'Enter Passphrase'}
              </h3>
            </div>
            <div className='card-body'>
              {alert && (
                <div
                  className={`alert ${
                    alert.includes('successfully')
                      ? 'alert-success'
                      : 'alert-danger'
                  }`}
                >
                  {alert}
                </div>
              )}

              {!isAuthorized ? (
                // Passphrase Input Form
                <form onSubmit={handlePassphraseSubmit}>
                  <div className='form-group mb-4'>
                    <label className='form-label'>Passphrase:</label>
                    <input
                      type='password'
                      className='form-control'
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                    />
                  </div>
                  <div className='text-center'>
                    <button
                      type='submit'
                      className='btn btn-primary btn-lg w-100'
                    >
                      Submit Passphrase
                    </button>
                  </div>
                </form>
              ) : (
                // Stock Reduction Form
                <form onSubmit={handleSubmit}>
                  <div className='form-group mb-4'>
                    <label className='form-label'>Iron Sheets to Deduct:</label>
                    <input
                      type='number'
                      className='form-control'
                      value={ironSheets}
                      min='0'
                      onChange={(e) => setIronSheets(e.target.value)}
                    />
                  </div>

                  <div className='form-group mb-4'>
                    <label className='form-label'>
                      Cement Packs to Deduct:
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      value={cementPacks}
                      min='0'
                      onChange={(e) => setCementPacks(e.target.value)}
                    />
                  </div>

                  <div className='form-group mb-4'>
                    <label className='form-label'>Select School:</label>
                    <select
                      className='form-control'
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                    >
                      <option value=''>Choose a school...</option>
                      {filteredSchools.length > 0 ? (
                        filteredSchools.map((school) => (
                          <option key={school.id} value={school.id}>
                            {school.name}
                          </option>
                        ))
                      ) : (
                        <option value=''>
                          No schools available to take stock
                        </option>
                      )}
                    </select>
                  </div>

                  <div className='text-center'>
                    <button
                      type='submit'
                      className='btn btn-success btn-lg w-100'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                          ></span>{' '}
                          Submitting...
                        </>
                      ) : (
                        'Update Stock'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        {alert && <div className='alert alert-info'>{alert}</div>}
        {/* Form contents */}
      </div>
    </div>
  );
};

export default StockReductionForm;
