import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './Raffle.css';

const Raffle = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const cancel = () => history.push('/');
  const createUser = async () => {
    try {
      const options:RequestInit = { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FirstName: firstName, LastName: lastName })
      };
      const resp = await fetch(process.env.REACT_APP_API_URL + '/user', options);
      if (!resp.ok) throw resp;
  
      const date = new Date();
      date.setDate(date.getDate() + 1);
  
      document.cookie = `displayname=${firstName} ${lastName}; Path=/; Expires=${date}`;
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.log('Error creating user', error, await error.text());
    }
  };

  return (
    <div className="raffle">
      <h2 className="raffle-title">RAFFLE</h2>
      <h3>Enter Information</h3>
      <label htmlFor="firstname">First Name</label>
      <input type="text" name="firstname" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
      <label htmlFor="lastname">Last Name</label>
      <input type="text" name="lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button className="btn btn__primary" onClick={createUser}>Next</button>
        <button className="btn btn__secondary" onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Raffle;