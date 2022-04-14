import { useState, useEffect, useRef } from "react";

export default function useComponentVisible() {
  const [displayFoodPopup, setDisplayFoodPopup] = useState(false);
  const ref = useRef(null);
  const [cartVisibility, switchCartVisibility] = useState(false);
  const cartRef = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setDisplayFoodPopup(!displayFoodPopup);
    }
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      switchCartVisibility(!cartVisibility);
  }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !displayFoodPopup);
    document.addEventListener("click", handleClickOutside, !cartVisibility);

    return () => {
      document.removeEventListener("click", handleClickOutside, !displayFoodPopup);
      document.removeEventListener("click", handleClickOutside, !cartVisibility);
    };
  });

  return { ref, displayFoodPopup, setDisplayFoodPopup, cartRef, cartVisibility, switchCartVisibility};
}