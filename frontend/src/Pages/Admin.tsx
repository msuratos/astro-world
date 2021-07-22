import { useContext, useEffect, useState } from "react";
import { Table } from "ui-neumorphism";

import { getAllUsersWithTheirImages } from "../api/adminApi";
import Loading from "../components/Loading";
import RootContext from "../RootContext";

const Admin = () => {
  const rootContext = useContext(RootContext);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const createItem = (userId:Number, name:string, imageCount:Number) => {
    return {
      name: (<a href={`#${userId}`}>{name}</a>),
      imageCount
    };
  };

  const headers = [
    { text: 'Display Name', align: 'left', value: 'name' },
    { text: '# of Images', align: 'right', value: 'imageCount' }
  ];

  useEffect(() => {
    const getUsers = async () => {
      const resp = await getAllUsersWithTheirImages(rootContext.accessToken);

      if (!resp.ok) console.log('Error getting all users with their images');

      const respUsers:[] = await resp.json();
      const newUsers:any[] = [...users];

      respUsers.forEach((val:any) => {
        const user = createItem(val.userId, val.displayName, val.images.length);
        newUsers.push(user);
      });

      setUsers(newUsers);
      setLoading(false);
    };

    getUsers();
  }, [rootContext.accessToken]);

  return (
    <>
      <Table dense headers={headers} items={users} />
      { loading && <Loading /> }
    </>
  )
};

export default Admin;