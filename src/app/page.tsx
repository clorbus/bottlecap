"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Bottlecap {
  id: string;
  frontImage: string;
  backImage: string;
  color: string;
  description: string;
  funFact: string;
}

const bottlecaps: Bottlecap[] = [
  {
    id: "red",
    frontImage: "red.svg",
    backImage: "red-back.svg",
    color: "Red",
    description: "A vibrant red bottlecap that catches the eye",
    funFact: "The color red can increase your heart rate and blood pressure!"
  },
  {
    id: "sienna",
    frontImage: "sienna.svg",
    backImage: "sienna-back.svg",
    color: "Sienna",
    description: "A warm, earthy sienna bottlecap",
    funFact: "Sienna is named after the Italian city of Siena, where the pigment was originally produced."
  },
  {
    id: "violet",
    frontImage: "violet.svg",
    backImage: "violet-back.svg",
    color: "Violet",
    description: "A rich purple bottlecap with royal elegance",
    funFact: "Violet is the color of royalty and was once the most expensive color to produce."
  },
  {
    id: "white",
    frontImage: "white.svg",
    backImage: "white-back.svg",
    color: "White",
    description: "A clean, pristine white bottlecap",
    funFact: "White light contains all the colors of the rainbow combined."
  },
  {
    id: "yellow",
    frontImage: "yellow.svg",
    backImage: "yellow-back.svg",
    color: "Yellow",
    description: "A bright, sunny yellow bottlecap",
    funFact: "Yellow is the most visible color from a distance, which is why it's used for traffic signs."
  },
  {
    id: "gray",
    frontImage: "gray.svg",
    backImage: "gray-back.svg",
    color: "Gray",
    description: "A sophisticated gray bottlecap",
    funFact: "Gray is considered a neutral color that can create a sense of calm and balance."
  },
  {
    id: "orange",
    frontImage: "orange.svg",
    backImage: "orange-back.svg",
    color: "Orange",
    description: "A vibrant orange bottlecap full of energy",
    funFact: "Orange is the only color named after a fruit, not the other way around!"
  },
  {
    id: "peach",
    frontImage: "peach.svg",
    backImage: "peach-back.svg",
    color: "Peach",
    description: "A soft, gentle peach bottlecap",
    funFact: "Peach was first used as a color name in English in 1588."
  },
  {
    id: "pink",
    frontImage: "pink.svg",
    backImage: "pink-back.svg",
    color: "Pink",
    description: "A playful pink bottlecap",
    funFact: "Pink was considered a masculine color in the 1920s."
  },
  {
    id: "purple",
    frontImage: "purple.svg",
    backImage: "purple-back.svg",
    color: "Purple",
    description: "A rich purple bottlecap with depth",
    funFact: "Purple was once so rare and expensive that only royalty could afford it."
  },
  {
    id: "black",
    frontImage: "black.svg",
    backImage: "black-back.svg",
    color: "Black",
    description: "A sleek, elegant black bottlecap",
    funFact: "Black isn't actually a color - it's the absence of light!"
  },
  {
    id: "blue",
    frontImage: "blue.svg",
    backImage: "blue-back.svg",
    color: "Blue",
    description: "A calming blue bottlecap",
    funFact: "Blue is the world's favorite color, according to various global surveys."
  },
  {
    id: "brown",
    frontImage: "brown.svg",
    backImage: "brown-back.svg",
    color: "Brown",
    description: "A warm, natural brown bottlecap",
    funFact: "Brown is the color of earth and wood, symbolizing stability and reliability."
  },
  {
    id: "cyan",
    frontImage: "cyan.svg",
    backImage: "cyan-back.svg",
    color: "Cyan",
    description: "A refreshing cyan bottlecap",
    funFact: "Cyan is a primary color in the CMYK color model used in printing."
  },
  {
    id: "beige",
    frontImage: "beige.svg",
    backImage: "beige-back.svg",
    color: "Beige",
    description: "A subtle, neutral beige bottlecap",
    funFact: "Beige is derived from the French word for natural wool that has been neither bleached nor dyed."
  }
];

export default function Home() {
  // Create a grid of bottlecaps (12x12)
  const gridBottlecaps = Array.from({ length: 144 }, (_, index) => bottlecaps[index % bottlecaps.length]);
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

    for (let i = 0; i < newStates.length; i++) {
      newStates[i] = !allFlipped;
    }

    setFlippedStates(newStates);
    setTimeout(() => setIsFlippingAll(false), 1000);
  };

  const getDelay = (index: number) => {
    const row = Math.floor(index / 12);
    const col = index % 12;
    return (row + col) * 0.05;
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
        {gridBottlecaps.map((bottlecap, index) => (
          <motion.div
            key={`${bottlecap.id}-${index}`}
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
                src={`/images/${bottlecap.frontImage}`}
                alt={`${bottlecap.color} bottlecap front`}
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
              <Image
                src={`/images/${bottlecap.backImage}`}
                alt={`${bottlecap.color} bottlecap back`}
                fill
                className="object-contain"
              />
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
                          src={`/images/${gridBottlecaps[selectedIndex].frontImage}`}
                          alt={`${gridBottlecaps[selectedIndex].color} bottlecap`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 mb-2"
                      >
                        {gridBottlecaps[selectedIndex].color} Bottlecap
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-4">
                          {gridBottlecaps[selectedIndex].description}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Fun Fact:</span> {gridBottlecaps[selectedIndex].funFact}
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
