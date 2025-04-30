"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const images = [
  'red.svg',
  'sienna.svg',
  'violet.svg',
  'white.svg',
  'yellow.svg',
  'gray.svg',
  'orange.svg',
  'peach.svg',
  'pink.svg',
  'purple.svg',
  'black.svg',
  'blue.svg',
  'brown.svg',
  'cyan.svg',
  'beige.svg'
];

export default function Home() {
  // Create an array of 144 items (12x12) by repeating the images
  const gridImages = Array.from({ length: 144 }, (_, index) => images[index % images.length]);
  const [flippedStates, setFlippedStates] = useState<boolean[]>(Array(144).fill(false));

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setFlippedStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-12 gap-2 max-w-6xl mx-auto">
        {gridImages.map((image, index) => (
          <motion.div
            key={index}
            className="aspect-square relative cursor-pointer"
            onContextMenu={(e) => handleContextMenu(e, index)}
            animate={{
              rotateY: flippedStates[index] ? 180 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              style={{
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={`/images/${image}`}
                alt={`Grid image ${index + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
            <motion.div
              style={{
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%",
                transform: "rotateY(180deg)",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="text-gray-500">Flipped!</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
