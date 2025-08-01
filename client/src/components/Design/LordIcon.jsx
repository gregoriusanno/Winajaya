import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

// Define custom element
defineElement(lottie.loadAnimation);

const LordIcon = ({ src, trigger, state, colors = "primary:#121331,secondary:#000000", stroke = "bold", style }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.addEventListener('ready', () => {
        // Icon is ready to be manipulated
      });
    }
  }, []);

  return (
    <lord-icon
      ref={iconRef}
      src={src}
      trigger={trigger}
      state={state}
      stroke={stroke}
      colors={colors} // Format warna harus string
      style={style}
    />
  );
};

export default LordIcon;