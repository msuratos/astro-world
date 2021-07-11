import React from 'react';
import rocket from '../assets/images/rocket.png';

const AstroBackground = () => {
  const rocketArray = Array.from('Rockets');
  const styleG:any = {
    maxHeight: '10%',
    maxWidth: '10%',
    position: 'absolute'
  };

  const rockets = rocketArray.map((value, index) => {
    const topOffset = (Math.random() * window.innerHeight).toFixed(2);
    const leftOffset = (Math.random() * window.innerWidth).toFixed(2);
    const rotateZ = Math.random() * 360;

    const style:React.CSSProperties = {
      ...styleG,
      transform: `rotateZ(${rotateZ}deg)`,
      top: `${topOffset}px`,
      left: `${leftOffset}px`
    };

    return {
      rocketProps: {
        topOffset: topOffset,
        leftOffset: leftOffset,
        rotateZ: rotateZ
      },
      htmlEl: (<img key={index} id={`rocket-${index}`} alt={`rocket-${index}`} src={rocket} style={style} />)
    };
  });

  return (
    <div>
      {rockets.map((val:any) => val.htmlEl)}
    </div>
  )
};

export default AstroBackground;