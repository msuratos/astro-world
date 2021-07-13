import React from "react";
import { useHistory } from "react-router-dom";
import './Raffle.css';

const Raffle = () => {
  const history = useHistory();
  const cancel = () => history.push('/');

  return (
    <div className="raffle">
      <h2 className="raffle-title">RAFFLE</h2>
      <h3>Enter Information</h3>
      <label htmlFor="firstname">First Name</label>
      <input type="text" name="firstname" />
      <label htmlFor="lastname">Last Name</label>
      <input type="text" name="lastname" />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button className="btn btn__primary">Next</button>
        <button className="btn btn__secondary" onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Raffle;