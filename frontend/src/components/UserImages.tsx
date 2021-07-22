import { Card, CardContent, Button } from "ui-neumorphism";

interface UserImagesProps {
  userImages: any[],
  onBackClick: () => void
}

const UserImages = (props:UserImagesProps) => {
  return (
    <>
      {
        props.userImages.map((val, index) => {
          return (
            <Card>
              <CardContent>
                <img alt={`${index}`} key={`image-${index}`} src={`${val}`} style={{ margin: '.2rem .2rem', width: '100%' }} />
              </CardContent>
            </Card>
          );
        })
      }
      <Button onClick={props.onBackClick}>Back</Button>
    </>
  )
};

export default UserImages;