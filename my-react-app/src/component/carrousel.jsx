
import { useState } from "react";
import chevronLeft from "../assets/arrow-left.svg"
import chevronRight from "../assets/arrow-right.svg"

import './css/component.css'



function Carrousel({data}) {
    const currentSlide = data;

    const [currentIndex, setCurrentIndex] = useState(0);

    // Fonction pour aller à l'image suivante
    const nextImage = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + 1) % currentSlide.pictures.length
        );
    };

    // Fonction pour aller à l'image précédente
    const prevImage = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex - 1 + currentSlide.pictures.length) % currentSlide.pictures.length
        );
    };

    if (!currentSlide || currentSlide.pictures.length === 0) {
        return <div>No pictures available</div>;
    }

    return (
        <div className='carrousel'>
            <div className='carrousel-container'>
                <div>
                    <img 
                    className='carrousel-image'
                        src={currentSlide.pictures[currentIndex]} 
                        alt={currentSlide.title} 
                    />
                         <div className="counter">{currentIndex + 1}/{currentSlide.pictures.length}</div>
                </div>
            </div>
            {currentSlide.pictures.length > 1 && (
                <>
                    <img data-testid="prev-arrow"
                     className='chevron-left'
                    onClick={prevImage} 
                    src = {chevronLeft}
                     />
                    <img 
                    className='chevron-right' data-testid="next-arrow"
                    onClick={nextImage} src ={chevronRight}
                    />
                </>
            )}
       
        </div>
    );
}


 


export default Carrousel;