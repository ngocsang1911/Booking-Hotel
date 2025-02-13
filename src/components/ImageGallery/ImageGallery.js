import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-4">
      <div 
        className="relative h-96 overflow-hidden rounded-xl group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img 
          src={images[activeImage]} 
          alt="Room view" 
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isZoomed ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative rounded-lg overflow-hidden h-24 transition-all duration-300 ${
              activeImage === index 
                ? 'ring-2 ring-blue-600 scale-95' 
                : 'hover:scale-105'
            }`}
          >
            <img 
              src={image} 
              alt={`Room view ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-black ${
              activeImage === index 
                ? 'bg-opacity-0' 
                : 'bg-opacity-20 hover:bg-opacity-0'
            } transition-opacity duration-300`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery; 