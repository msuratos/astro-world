import { useEffect, useState } from 'react';
import { getCookie } from "../utils/cookieHelper";

const ImageUpload = () => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const displayname = getCookie('displayname');
    if (displayname !== null) setDisplayName(displayname!);
  }, []);

  return (
    <>
      <h3>Hi, {displayName}!</h3>
      <form encType="multipart/form-data" method="post" action="">
        <label htmlFor="images">Upload Images</label>
        <input type="file" name="images" title="File Upload" />
        <button className="btn btn__primary" style={{width:'100%', height:'3.0rem'}}>Upload</button>
      </form>
    </>
  );
};

export default ImageUpload;