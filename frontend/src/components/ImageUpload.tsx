import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { getCookie } from "../utils/cookieHelper";

interface ImageUploadProps {
  showloading: React.Dispatch<React.SetStateAction<boolean>>
};

const ImageUpload = (props:ImageUploadProps) => {
  const [displayName, setDisplayName] = useState('');
  const imageInputRef = useRef<any>({});
  const resultRef = useRef<any>({});
  const userId = getCookie('userid');
  const imageUrl = `${process.env.REACT_APP_API_URL}/image/user/${userId}`;

  const uploadImageFormSubmit = async (e:FormEvent<HTMLFormElement>) => {
    resultRef.current.value = '';
    props.showloading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const resp = await fetch(imageUrl, {
      method: 'POST',
      body: formData
    });

    if (!resp.ok) {
      resultRef.current.value = 'Failed to upload. Try again: ' + resp.status + ' ' + resp.statusText;
    }

    imageInputRef.current.value = '';
    props.showloading(false);
  };

  useEffect(() => {
    const displayname = getCookie('displayname');
    if (displayname !== null) setDisplayName(displayname!);
  }, []);

  return (
    <>
      <h3>Hi, {displayName}!</h3>
      <form encType="multipart/form-data" method="post" action={imageUrl} onSubmit={uploadImageFormSubmit}>
        <label htmlFor="images">Upload Images</label>
        <input ref={imageInputRef} type="file" name="images" title="File Upload" multiple />
        <button className="btn btn__primary" style={{width:'100%', height:'3.0rem'}}>Upload</button>
        <div style={{marginTop:'15px', color: "red"}}>
          <output ref={resultRef}></output>
        </div>
      </form>
    </>
  );
};

export default ImageUpload;