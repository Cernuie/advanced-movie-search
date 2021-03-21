import React, { useState, useEffect } from "react";

import './ScrollToTop.scss'

export default function ScrollToTop(props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop}>
          <img
            className="scroll-to-top-btn"
            width="75px"
            height="75px"
            src="https://cdn.icon-icons.com/icons2/2596/PNG/512/arrow_circle_up_icon_155797.png"
            alt="Go to top"
          />
        </div>
      )}
    </div>
  );
}
