import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { TinyGamesLogoWithText } from "./logo";
import { animate } from "motion";

export default function LoadingScreen({ loaded }: { loaded: boolean }) {
  const GRADIENT_WIDTH = 20;

  const fade = useMotionValue(`${-GRADIENT_WIDTH}%`);
  const maskImage = useMotionTemplate`radial-gradient(circle,rgba(0, 0, 0, 0) ${fade}, rgba(0, 0, 0, 1) calc(${fade} + ${GRADIENT_WIDTH}%))`;

  if (loaded)
    animate(fade, `100%`, { duration: .3 });

  return (
    <motion.div 
      data-tauri-drag-region={!loaded} 
      className={`bg-secondary size-full absolute top-0 left-0 z-100 flex items-center justify-center ${loaded ? "pointer-events-none" : ""}`}
      style={{
        maskImage
      }}
    >
      <div className="pointer-events-none">
        <TinyGamesLogoWithText className="w-64" />
      </div>
    </motion.div>
  );
}
