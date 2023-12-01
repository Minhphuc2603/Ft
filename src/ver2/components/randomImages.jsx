import React, { useEffect, useState, useRef } from "react";
import "../css/AddEvent.css"; // Import CSS file

const RenderRandomWaitImage = ({ images1 }) => {
  const imageUrls = images1;
  const [images, setImages] = useState([]);

  const getRandomImage = () =>
    imageUrls[Math.floor(Math.random() * imageUrls.length)];

  const getRandomPosition = () => ({
    left: `${Math.random() * 80}vw`,
    top: `${Math.random() * 80}vh`,
  });

  const addNewImages = () => {
    const newImages = [];
    const count = images.length === 0 ? Math.floor(Math.random() * 5) + 2 : 1;
    for (let i = 0; i < count; i++) {
      newImages.push({ url: getRandomImage(), position: getRandomPosition() });
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeOldImages = () => {
    setImages((prevImages) => prevImages.slice(2));
  };

  useEffect(() => {
    addNewImages();
    const interval = setInterval(() => {
      addNewImages();
      removeOldImages();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {images.map((image, index) => (
        <div key={index} className="image-container" style={image.position}>
          <img
            src={image.url}
            className="max-lg:w-5 max-lg:h-5"
            alt={`Image ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};
export default RenderRandomWaitImage;
