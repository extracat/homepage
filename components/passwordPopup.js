import React, { useState } from 'react';

function PasswordPopup(props) {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOverlayClick = (event) => {
    // Close the modal if the user clicks outside of it
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Replace 'password123' with the actual password that should be accepted
    if (password === 'knockknock') {

      let url = ""

      switch (props.redirectUrl) {
        case '1':
          url = "/dashboard";
          break;
        case '2':
          url = "/dashboard";
          break;
        default:
          url = "/";
      }
      window.location.href = url;

    } else {
      alert('Incorrect password, please try again');
    }
  };

  return (
    <>
      {props.showPopup && (
        <div className="password-popup-overlay" onClick={handleOverlayClick}>
          <div className="password-popup">
            {/*
            <button className="close-button" onClick={props.onClose}>
              Close
            </button>
            */} 
            <form onSubmit={handleFormSubmit}>
              <div>
              <label htmlFor="password-input">Enter Password:</label>
              </div>
              <input
                type="password"
                id="password-input"
                value={password}
                onChange={handlePasswordChange}
              />
              <div><button type="submit">Let me in</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export { PasswordPopup };
