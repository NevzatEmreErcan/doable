import React, { useEffect, useRef } from "react";

const SlideIn = ({ children, isSlideInOpen, setIsSlideInOpen }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isSlideInOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSlideInOpen]);

  function handleClickOutside(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsSlideInOpen(false);
    }
  }

  if (!isSlideInOpen) return null;

  return (
    <>
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-[550px] bg-background-600 z-50">
        {children}
      </div>
    </>
  );
};

export default SlideIn;
