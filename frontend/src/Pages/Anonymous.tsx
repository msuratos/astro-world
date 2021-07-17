import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import Loading from "../components/Loading";
import './Anonymous.css'

const Anonymous = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="anonymous">
      <ImageUpload showloading={setLoading} isAnonymous={true} />
      { loading && <Loading /> }
    </div>
  )
};

export default Anonymous;