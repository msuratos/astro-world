import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Button } from "ui-neumorphism";

import { uploadImage } from '../api/imageApi';
import RootContext from '../RootContext';
import { getCookie } from "../utils/cookieHelper";

interface ImageUploadProps {
  isAnonymous: boolean,
  showloading: React.Dispatch<React.SetStateAction<boolean>>
};

const ImageUpload = (props:ImageUploadProps) => {
  const [displayName, setDisplayName] = useState('');
  const rootContext = useContext(RootContext);
  const imageInputRef = useRef<any>({});
  const resultRef = useRef<any>({});

  const uploadImageFormSubmit = async (e:FormEvent<HTMLFormElement>) => {
    resultRef.current.value = '';
    props.showloading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const resp = await uploadImage(props.isAnonymous, formData, rootContext.accessToken);

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
      { props.isAnonymous ? <></> : <h3>Hi, {displayName}!</h3> }
      <form encType="multipart/form-data" method="post" onSubmit={uploadImageFormSubmit}>
        <label htmlFor="images">Upload Images</label>
        <input ref={imageInputRef} type="file" name="images" title="File Upload" multiple />
        <Button color='var(--light-bg-light-shadow)' bgColor='var(--primary)' style={{width:'100%', height:'3.0rem', marginTop: '1rem'}}>Upload</Button>
        <div style={{marginTop:'15px', color: "red"}}>
          <output ref={resultRef}></output>
        </div>
      </form>
    </>
  );
};

export default ImageUpload;