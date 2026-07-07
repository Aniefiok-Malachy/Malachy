import { motion } from 'motion/react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-gray-50 dark:bg-[#030305] transition-colors duration-500">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Radial fade to hide edges of grid */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-gray-50/50 to-gray-50 dark:via-[#030305]/50 dark:to-[#030305] pointer-events-none" />

      {/* Decorative Blob 1 */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[10%] left-[5%] md:left-[15%] w-72 h-72 md:w-112.5 md:h-112.5 rounded-full bg-blue-400 dark:bg-blue-900/30 glow-orb pointer-events-none"
      />

      {/* Decorative Blob 2 */}
      <motion.div
        animate={{
          x: [0, -70, 60, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[15%] right-[5%] md:right-[15%] w-80 h-80 md:w-125 md:h-125 rounded-full bg-purple-400 dark:bg-purple-900/30 glow-orb pointer-events-none"
      />

      {/* Decorative Blob 3 */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, 40, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[50%] left-[45%] w-60 h-60 md:w-87.5 md:h-87.5 rounded-full bg-emerald-300 dark:bg-emerald-900/20 glow-orb pointer-events-none"
      />
    </div>
  );
}
