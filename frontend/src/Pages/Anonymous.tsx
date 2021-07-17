import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import Loading from "../components/Loading";

const Anonymous = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="raffle">
      <h2 className="raffle-title">RAFFLE</h2>
      <ImageUpload showloading={setLoading} isAnonymous={true} />
      { loading && <Loading /> }
    </div>
  )
};

export default Anonymous;