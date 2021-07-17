import { getCookie } from "../utils/cookieHelper";

export const uploadImage = async (isAnonymous:boolean, formData:FormData, accessToken:string) => {
  let userId: string | null;
  let imageUrl: string = '';

  if (isAnonymous) imageUrl = `${process.env.REACT_APP_API_URL}/image/user`;
  else {
    userId = getCookie('userid');
    imageUrl = `${process.env.REACT_APP_API_URL}/image/user/${userId}`;
  }

  return await fetch(imageUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: formData
  });
};