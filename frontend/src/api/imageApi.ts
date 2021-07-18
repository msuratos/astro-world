import React from 'react';
import { getCookie } from "../utils/cookieHelper";

export const uploadImage = async (isAnonymous: boolean, formData: FormData, accessToken: string):Promise<Response> => {
  let userId: string | null;
  let imageUrl: string = '';

  if (isAnonymous) imageUrl = `${process.env.REACT_APP_API_URL}/image/user`;
  else {
    userId = getCookie('userid');
    imageUrl = `${process.env.REACT_APP_API_URL}/image/user/${userId}`;
  }

  const request = new Request(imageUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: formData
  });

  return await fetch(request);

  // const upload = (settings: Request) => fetch(settings);

  // const uploadProgress = new ReadableStream<boolean>({
  //   start(controller) {
  //     console.log("starting upload, request.bodyUsed:", request.bodyUsed);
  //     controller.enqueue(request.bodyUsed);
  //   },
  //   pull(controller) {
  //     if (request.bodyUsed) {
  //       controller.close();
  //     }
  //     controller.enqueue(request.bodyUsed);
  //     console.log("pull, request.bodyUsed:", request.bodyUsed);
  //   },
  //   cancel(reason) {
  //     console.log(reason);
  //   }
  // });

  // const [fileUpload, reader] = [async () => {
  //   try {
  //     const resp = await upload(request);
  //     return resp;
  //   }
  //   catch (e) {
  //     reader.cancel();
  //     throw e
  //   }
  // }
  //   , uploadProgress.getReader()
  // ];

  // const processUploadRequest = async ({ value, done }: {value:boolean, done: boolean}): Promise<Response> => {
  //   if (value || done) {
  //     console.log("upload complete, request.bodyUsed:", request.bodyUsed);
  //     // set `progress.value` to `progress.max` here 
  //     // if not awaiting server response
  //     // progress.value = progress.max;
  //     await reader.closed;
  //     return fileUpload();
  //   }
  //   console.log("upload progress:", value);
  //   setPercent((state) => state + 1);
  //   const result = await reader.read();

  //   return processUploadRequest(result);
  // };

  // try {
  //   const { value, done } = await reader.read();
  //   const response = await processUploadRequest({ value, done });
    
  //   setPercent(100);
  //   return response;
  // }
  // catch (err) {
  //   console.log("upload error:", err);
  //   throw err;
  // }
};