import { motion, Variants } from 'framer-motion';

type Props = {
  isOpen: boolean;
  className?: string;
};

const AnimatedHamburgerIcon = ({ isOpen, className }: Props) => {
  const pathOneVariants: Variants = {
    closed: { d: 'M 3 9 L 21 9' },
    open: { d: 'M 5 5 L 19 19' },
  };
  const pathTwoVariants: Variants = {
    closed: { d: 'M 3 15 L 21 15' },
    open: { d: 'M 5 19 L 19 5' },
  };

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={isOpen ? 'open' : 'closed'}
      initial="closed"
    >
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={pathOneVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={pathTwoVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
};

export default AnimatedHamburgerIcon; 