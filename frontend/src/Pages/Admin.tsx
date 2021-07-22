import { useContext, useEffect, useState } from "react";
import { Table } from "ui-neumorphism";

import { getAllUsersWithTheirImages, getImageUrl } from "../api/adminApi";
import AdminKey from "../components/AdminKey";
import Loading from "../components/Loading";
import UserImages from "../components/UserImages";
import RootContext from "../RootContext";

const Admin = () => {
  const rootContext = useContext(RootContext);
  const [users, setUsers] = useState<any[]>([]);
  const [userImages, setUserImages] = useState<any[]>([{}]);
  const [loading, setLoading] = useState(true);
  const [showAdminKey, setShowAdminKey] = useState(true);
  const [showUserImages, setShowUserImages] = useState(false);

  const createItem = (images: any[], name: string, imageCount: Number) => {
    return {
      name: (<a onClick={() => showImages(images)}>{name}</a>),
      imageCount
    };
  };

  const showImages = async (images: any[]) => {
    const imageUrlPromises = images.map(async (image: any) => {
      const resp = await getImageUrl(image.pathStored, rootContext.accessToken);
      const url = await resp.text();

      return url;
    });

    let imageUrls = [];
    for (let index = 0; index < imageUrlPromises.length; index++) {
      const element = imageUrlPromises[index];
      const url = await element;
      imageUrls.push(url);
    }

    setLoading(false);
    setUserImages(imageUrls);
    setShowUserImages(true);
  };

  const onBackClick = () => {
    setShowUserImages(false);
    setUserImages([]);
  };

  useEffect(() => {
    const getUsers = async () => {
      const resp = await getAllUsersWithTheirImages(rootContext.accessToken);

      if (!resp.ok) console.log('Error getting all users with their images');

      const respUsers: [] = await resp.json();
      const newUsers: any[] = [...users];

      respUsers.forEach((val: any) => {
        const user = createItem(val.images, val.displayName, val.images.length);
        newUsers.push(user);
      });

      setUsers(newUsers);
      setLoading(false);
    };

    getUsers();
  }, [rootContext.accessToken]);

  const headers = [
    { text: 'Display Name', align: 'left', value: 'name' },
    { text: '# of Images', align: 'right', value: 'imageCount' }
  ];

  return (
    <>
      {showAdminKey && <AdminKey showAdminKey={setShowAdminKey} />}
      {!showAdminKey && !showUserImages && <Table dense headers={headers} items={users} />}
      {!showAdminKey && showUserImages && <UserImages userImages={userImages} onBackClick={onBackClick} />}
      {loading && <Loading />}
    </>
  )
};

export default Admin;