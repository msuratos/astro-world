import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "ui-neumorphism";

interface AdminKeyProps {
  showAdminKey: React.Dispatch<React.SetStateAction<boolean>>
};

const AdminKey = (props:AdminKeyProps) => {
  const history = useHistory();
  const [adminKey, setAdminKey] = useState('');
  const [showError, setShowError] = useState(false);
  const onButtonClick = () => {
    if (adminKey === process.env.REACT_APP_ADMIN_KEY) {
      props.showAdminKey(false);
      setShowError(false);
    }
    else
      setShowError(true);
  };

  return (
    <div>
      <TextField label="Enter Admin Key" value={adminKey} onChange={(e:any) => setAdminKey(e.value)} />
      <Button color='var(--light-bg-light-shadow)' bgColor='var(--primary)' style={{margin: '1px 12px'}} onClick={onButtonClick}>Enter</Button>
      { showError && <Button onClick={() => history.push('/')}>Back</Button> }
      { showError && <section style={{color: 'var(--error)', margin: '1px 12px'}}>Incorrect key</section> }
    </div>
  )
};

export default AdminKey;