import { User } from "../models/User";

export const createUser = async (user:User) => {
  const options:RequestInit = { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  
  return await fetch(process.env.REACT_APP_API_URL + '/user', options);
};