import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';

export default function ToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 0);
    const throttledScroll = throttle(handleScroll, 300);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <button
      className={`totopbutton ${showButton ? 'totopbutton--show' : ''}`}
      onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
    >
      ^
    </button>
  );
}
