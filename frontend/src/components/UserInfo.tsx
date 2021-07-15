import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { createUser } from "../api/userApi";

interface UserInfoProps {
  display: React.Dispatch<React.SetStateAction<boolean>>
};

const UserInfo = (props:UserInfoProps) => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const cancel = () => history.push('/');
  const create = async () => {
    try {
      // Call api to create user
      const resp = await createUser({ FirstName: firstName, LastName: lastName });
      if (!resp.ok) throw resp;
  
      // Set expiration date to the next day for cookie
      const date = new Date();
      date.setDate(date.getDate() + 1);
  
      const user = await resp.json();
      props.display(false);

      // Set cookies to be used later to upload images & show current display name
      document.cookie = `displayname=${firstName} ${lastName}; Path=/; Expires=${date};`;
      document.cookie = `userid=${user.userId}; Path=/; Expires=${date};`

      // Clear firstname & lastname states
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.log('Error creating user', error);
    }
  };

  return (
    <>
      <h3>Enter Information</h3>
      <label htmlFor="firstname">First Name</label>
      <input type="text" name="firstname" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
      <label htmlFor="lastname">Last Name</label>
      <input type="text" name="lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button className="btn btn__primary" onClick={create}>Next</button>
        <button className="btn btn__secondary" onClick={cancel}>Cancel</button>
      </div>
    </>
  )
};

export default UserInfo;