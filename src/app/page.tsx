"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

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

const funFacts = [
  "The color red can increase your heart rate and blood pressure!",
  "Sienna is named after the Italian city of Siena, where the pigment was originally produced.",
  "Violet is the color of royalty and was once the most expensive color to produce.",
  "White light contains all the colors of the rainbow combined.",
  "Yellow is the most visible color from a distance, which is why it's used for traffic signs.",
  "Gray is considered a neutral color that can create a sense of calm and balance.",
  "Orange is the only color named after a fruit, not the other way around!",
  "Peach was first used as a color name in English in 1588.",
  "Pink was considered a masculine color in the 1920s.",
  "Purple was once so rare and expensive that only royalty could afford it.",
  "Black isn't actually a color - it's the absence of light!",
  "Blue is the world's favorite color, according to various global surveys.",
  "Brown is the color of earth and wood, symbolizing stability and reliability.",
  "Cyan is a primary color in the CMYK color model used in printing.",
  "Beige is derived from the French word for natural wool that has been neither bleached nor dyed."
];

export default function Home() {
  const gridImages = Array.from({ length: 144 }, (_, index) => images[index % images.length]);
  const [flippedStates, setFlippedStates] = useState<boolean[]>(Array(144).fill(false));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isFlippingAll, setIsFlippingAll] = useState(false);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setFlippedStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAfterLeave = () => {
    setSelectedIndex(null);
    setIsClosing(false);
  };

  const handleFlipAll = () => {
    setIsFlippingAll(true);
    const newStates = [...flippedStates];
    const allFlipped = newStates.every(state => state);

    // Flip all tiles to the opposite state
    for (let i = 0; i < newStates.length; i++) {
      newStates[i] = !allFlipped;
    }

    setFlippedStates(newStates);
    setTimeout(() => setIsFlippingAll(false), 1000); // Reset after animation completes
  };

  // Calculate delay based on position in the grid
  const getDelay = (index: number) => {
    const row = Math.floor(index / 12);
    const col = index % 12;
    return (row + col) * 0.05; // 50ms delay between each diagonal
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={handleFlipAll}
          disabled={isFlippingAll}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isFlippingAll ? 'Flipping...' : 'Flip All'}
        </button>
      </div>
      <div className="grid grid-cols-12 gap-2 max-w-6xl mx-auto">
        {gridImages.map((image, index) => (
          <motion.div
            key={index}
            className="aspect-square relative cursor-pointer"
            onContextMenu={(e) => handleContextMenu(e, index)}
            onClick={() => handleClick(index)}
            animate={{
              rotateY: flippedStates[index] ? 180 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: isFlippingAll ? getDelay(index) : 0
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
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <span className="text-gray-500">Flipped!</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <Transition
        appear
        show={selectedIndex !== null && !isClosing}
        as={Fragment}
        afterLeave={handleAfterLeave}
      >
        <Dialog
          as="div"
          className="relative z-50"
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {selectedIndex !== null && (
                    <>
                      <div className="relative w-48 h-48 mx-auto mb-4">
                        <Image
                          src={`/images/${gridImages[selectedIndex]}`}
                          alt={`Bottlecap ${selectedIndex + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 mb-2"
                      >
                        Color Fun Fact
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {funFacts[selectedIndex % funFacts.length]}
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={handleClose}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
