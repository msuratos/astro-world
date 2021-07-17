import { User } from "../models/User";

export const createUser = async (user:User, accessToken:string) => {
  const options:RequestInit = { 
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  
  return await fetch(process.env.REACT_APP_API_URL + '/user', options);
};