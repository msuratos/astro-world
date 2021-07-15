import { useEffect, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import UserInfo from "../components/UserInfo";
import './Raffle.css';

const Raffle = () => {
  const [showUserInfo, setShowUserInfo] = useState(true);

  useEffect(() => {
    if (document.cookie.includes('displayname')) setShowUserInfo(false);
  }, []);

  return (
    <div className="raffle">
      <h2 className="raffle-title">RAFFLE</h2>
      { showUserInfo && <UserInfo display={setShowUserInfo} />}
      { !showUserInfo && <ImageUpload /> }
    </div>
  );
};

export default Raffle;