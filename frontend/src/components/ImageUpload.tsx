import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Alert, Button } from "ui-neumorphism";

import { uploadImage } from '../api/imageApi';
import RootContext from '../RootContext';
import { getCookie } from "../utils/cookieHelper";

interface ImageUploadProps {
  isAnonymous: boolean,
  showloading: React.Dispatch<React.SetStateAction<boolean>>
};

const ImageUpload = (props:ImageUploadProps) => {
  const [displayName, setDisplayName] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [failVisible, setFailVisible] = useState(false);
  const rootContext = useContext(RootContext);
  const imageInputRef = useRef<any>({});

  const uploadImageFormSubmit = async (e:FormEvent<HTMLFormElement>) => {
    setSuccessVisible(false);
    setFailVisible(false);
    props.showloading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const resp = await uploadImage(props.isAnonymous, formData, rootContext.accessToken);

    if (!resp.ok) {
      setFailVisible(true);
      setTimeout(() => setFailVisible(false), 3000);
    } else {
      setSuccessVisible(true);
      setTimeout(() => setSuccessVisible(false), 3000);
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
        {
          (successVisible || failVisible) &&
          <div style={{margin: '1rem'}}>
            {successVisible && <Alert rounded type="success" border="left">Success!</Alert>}
            {failVisible && <Alert rounded type="error" border="left">Upload Failed</Alert>}
          </div>
        }
      </form>
    </>
  );
};

export default ImageUpload;