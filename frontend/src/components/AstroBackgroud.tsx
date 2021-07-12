import React, { useEffect, useRef, useState } from 'react';
import rocket from '../assets/images/rocket.png';
import planet from '../assets/images/planet.png';
import star from '../assets/images/star.png';
import sun from '../assets/images/sun.png';

interface IStyle extends React.CSSProperties {
  topOffset: number,
  leftOffset: number,
  rotateZ: number
};

const AstroBackground = () => {
  const rocketArray = Array.from('Rockets');
  const planetArray = Array.from('asdf')
  const starArray = Array.from('There are too many stars in the whole universe!');

  const rockets: IStyle[] = rocketArray.map(() => {
    const topOffset = Math.random() * window.innerHeight;
    const leftOffset = Math.random() * window.innerWidth;
    const rotateZ = Math.random() * 360;

    const style: React.CSSProperties = {
      position: 'absolute',
      maxHeight: '10%',
      maxWidth: '10%',
      backgroundColor: '#f9f9f9',
      top: `${topOffset}px`,
      left: `${leftOffset}px`,
      transform: `rotateZ(${rotateZ}deg)`
    };

    return {
      topOffset: topOffset,
      leftOffset: leftOffset,
      rotateZ: rotateZ,
      ...style
    }
  });
  const planets: IStyle[] = planetArray.map(() => {
    const topOffset = Math.random() * window.innerHeight;
    const leftOffset = Math.random() * window.innerWidth;
    const rotateZ = Math.random() * 360;

    const style: React.CSSProperties = {
      position: 'absolute',
      maxHeight: '25%',
      maxWidth: '25%',
      backgroundColor: '#f9f9f9',
      top: `${topOffset}px`,
      left: `${leftOffset}px`,
      transform: `rotateZ(${rotateZ}deg)`
    };

    return {
      topOffset: topOffset,
      leftOffset: leftOffset,
      rotateZ: rotateZ,
      ...style
    }
  });
  const stars: IStyle[] = starArray.map(() => {
    const topOffset = Math.random() * window.innerHeight;
    const leftOffset = Math.random() * window.innerWidth;
    const rotateZ = Math.random() * 360;

    const style: React.CSSProperties = {
      position: 'absolute',
      maxHeight: '5%',
      maxWidth: '5%',
      top: `${topOffset}px`,
      left: `${leftOffset}px`,
      transform: `rotateZ(${rotateZ}deg)`
    };

    return {
      topOffset: topOffset,
      leftOffset: leftOffset,
      rotateZ: rotateZ,
      ...style
    }
  });
  const suns: React.CSSProperties = {
    position: 'absolute',
    maxHeight: '30%',
    maxWidth: '30%',
    backgroundColor: '#f9f9f9',
    top: `${Math.random() * 150}px`,
    left: `${Math.random() * (window.innerWidth - 50)}px`
  };

  return (
    <>
      {stars.map((val, index) => <img src={star} id={`star-${index}`} alt={`star-${index}`} key={`star-${index}`} style={val} />)}
      {planets.map((val, index) => <img src={planet} id={`planet-${index}`} alt={`planet-${index}`} key={`planet-${index}`} style={val} />)}
      {rockets.map((val, index) => <img src={rocket} id={`rocket-${index}`} alt={`rocket-${index}`} key={`rocket-${index}`} style={val} />)}
      <img src={sun} id="sun" alt="sun" style={suns} />
    </>
  )

  /* ----------------------------------------------------------------------------
  Using canvas to animate the rocket ** canvas can only draw on image at a time
  ------------------------------------------------------------------------------- */
  // const canvasRef = useRef<any>(null);

  // useEffect(() => {
  //   const canvasContext = canvasRef.current.getContext('2d');
  //   canvasRef.current.height = window.innerHeight;
  //   canvasRef.current.width = window.innerWidth;

  //   let x = 0, y = 0;

  //   rocketArray.forEach((val, index) => {
  //     let rocketImage = new Image();
  //     x = Math.random() * window.innerWidth;
  //     y = Math.random() * window.innerHeight;

  //     const animate = () => {
  //       canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);  // clear canvas
  //       canvasContext.drawImage(rocketImage, x, y, (rocketImage.naturalWidth / 20), (rocketImage.naturalHeight / 20));

  //       // x -= 4;
  //       // y -= 4;
  //       // if (x > 0 || y > 0) requestAnimationFrame(animate);
  //     };

  //     rocketImage.id = `rocket-${index}`;
  //     rocketImage.src = rocket;
  //     rocketImage.onload = animate;

  //     console.log(rocketImage);
  //   });
  // }, []);

  // return (
  //   <canvas ref={canvasRef}></canvas>
  // )

  /* ---------------------------------------------------------------------
  Using divs and styles to render. ** it's very glitchy
  ------------------------------------------------------------------------ */
  // const [styleArray, setStyleArray] = useState<IStyle[]>(
  //   rocketArray.map((val, index) => {
  //     const topOffset = Math.round(Math.random() * window.innerHeight);
  //     const leftOffset = Math.round(Math.random() * window.innerWidth);
  //     const rotateZ = Math.random() * 360;

  //     return {
  //       topOffset: topOffset,
  //       leftOffset: leftOffset,
  //       rotateZ: rotateZ,
  //       maxHeight: '10%',
  //       maxWidth: '10%',
  //       position: 'absolute',
  //       transform: `rotateZ(${rotateZ}deg)`,
  //       top: `${topOffset}px`,
  //       left: `${leftOffset}px`
  //     };
  //   })
  // );

  // const rockets = rocketArray.map((value, index) => {
  //   return <img key={index} id={`rocket-${index}`} alt={`rocket-${index}`} src={rocket} style={styleArray[index]} />;
  // });

  // useEffect(() => {
  //   const updateRocketPosition = () => {
  //     const styleArrayCopy = [...styleArray];
  //     const updatedStyleArray = styleArrayCopy.map((val, index) => {
  //       const temp = {...val};
  //       temp.topOffset += 1;
  //       temp.leftOffset += 1;
  //       temp.top = `${temp.topOffset}px`;
  //       temp.left = `${temp.leftOffset}px`;

  //       return temp;
  //     });
  //     setStyleArray(updatedStyleArray);
  //   };

  //   // const timerId = setInterval(updateRocketPosition, 1000);

  //   // return () => clearInterval(timerId);
  // }, [styleArray]);

  // return (
  //   <div>
  //     {rockets}
  //   </div>
  // )
};

export default AstroBackground;