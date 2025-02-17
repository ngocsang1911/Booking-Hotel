import React, { useState } from 'react';

const ImageWithFallback = ({ src, fallback, alt, className, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        setImgSrc(fallback);
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            className={className}
            {...props}
        />
    );
};

export default ImageWithFallback; 