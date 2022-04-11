import { useState, useEffect, useRef } from "react";

export default function useComponentVisible() {
  const [displayFoodPopup, setDisplayFoodPopup] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setDisplayFoodPopup(!displayFoodPopup);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !displayFoodPopup);

    return () => {
      document.removeEventListener("click", handleClickOutside, !displayFoodPopup);
    };
  });

  return { ref, displayFoodPopup, setDisplayFoodPopup };
}