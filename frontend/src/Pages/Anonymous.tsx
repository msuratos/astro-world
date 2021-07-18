import ImageUpload from "../components/ImageUpload";
import './Anonymous.css'

const Anonymous = () => {
  return (
    <div className="anonymous">
      <ImageUpload isAnonymous={true} />
    </div>
  )
};

export default Anonymous;