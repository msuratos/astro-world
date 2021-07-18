import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, TextField } from "ui-neumorphism";

import { createUser } from "../api/userApi";
import RootContext from '../RootContext';

interface UserInfoProps {
  display: React.Dispatch<React.SetStateAction<boolean>>
};

const UserInfo = (props:UserInfoProps) => {
  const history = useHistory();
  const rootContext = useContext(RootContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const cancel = () => history.push('/');
  const create = async () => {
    try {
      // Call api to create user
      setLoading(true);
      const resp = await createUser({ FirstName: firstName, LastName: lastName }, rootContext.accessToken);
      setLoading(false);
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
      <TextField label="firstname" loading={loading} onChange={(e:any) => setFirstName(e.value)} value={firstName} />
      <TextField label="lastname" loading={loading} onChange={(e:any) => setLastName(e.value)} value={lastName} />
      <div className="btn-div">
        <Button color='var(--light-bg-light-shadow)' bgColor='var(--primary)' className="btn-custom" onClick={create}>Next</Button>
        <Button className="btn-custom" onClick={cancel}>Cancel</Button>
      </div>
    </>
  )
};

export default UserInfo;