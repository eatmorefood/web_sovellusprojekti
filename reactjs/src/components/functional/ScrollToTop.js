import React, { useState, useEffect } from 'react';
import ArrowUp from '../../images/down-arrow.png';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
     };

    return (
        <div className="scrollToTopArrowButton">
            {showTopBtn && (
                <img src={ArrowUp} alt="" className="scrollToTopArrowImage" onClick={ goToTop } />
            )}
        </div>
    );
};

export default ScrollToTop;