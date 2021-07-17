export const getAccessToken = async () => {
  const url = `${process.env.REACT_APP_API_URL}/token?apiKey=${process.env.REACT_APP_API_KEY}`;
  const resp = await fetch(url);

  if (!resp.ok) throw new Error('Could not get access token');

  const accessToken = await resp.text();
  return accessToken;
};