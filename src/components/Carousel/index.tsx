import React, { useState } from 'react';
import { workType } from '../../data/worksType';
import './Carousel.css';

interface CarouselProps {
  items: typeof workType; // Utilizando o tipo de workType
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel bg-teal-200 border-teal-600 border-4 pb-8">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            <img src={item.image} alt={item.titlePt} className="img-card object-cover" />
            <h3 className="carousel-title text-teal-600 londrina-solid-regular">{item.titlePt}</h3>
            <p className="carousel-caption text-teal-600 londrina-solid-light mx-8 text-justify">{item.descPt}</p>
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;