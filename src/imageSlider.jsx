import React, { useState, useEffect } from "react";

const images = [
  "../src/pictures/1.jpg",
  "../src/pictures/12.jpg",
  "../src/pictures/2.jpg",
  "../src/pictures/4.jpg",
  "../src/pictures/6.jpg",
  "../src/pictures/7.jpg",
  "../src/pictures/8.jpg",
  "../src/pictures/10.jpg",
  "../src/pictures/11.jpg",
  "../src/pictures/12.jpg",
];

function ImageSlider() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return <img src={images[currentImageIndex]} alt="Slideshow" style={{ width: '65%' }} />;
  }
  
  export default ImageSlider;
