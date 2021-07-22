export const getAllUsersWithTheirImages = async (accessToken:string):Promise<Response> => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/user/admin/all`
  const request = new Request(requestUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  return await fetch(request);
};