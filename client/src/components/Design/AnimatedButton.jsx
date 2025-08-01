import { motion } from "framer-motion";
import buttonStyles from "../Design/ButtonDesign";

const AnimatedButton = ({
  children,
  variant,
  className,
  onClick,
  disabled,
}) => {
  const buttonClass = buttonStyles[variant] || buttonStyles.default;

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      // whileHover={{ scale: disabled ? 1 : 1.05 }}
      transition={{ duration: 0.2 }}
      className={`${buttonClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
