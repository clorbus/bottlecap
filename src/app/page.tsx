"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import bottlecapData from "@/data/bottlecaps.json";

export default function Home() {
  // Create a grid of bottlecaps (12x12)
  const gridBottlecaps = Array.from(
    { length: 144 },
    (_, index) => bottlecapData.bottlecaps[index % bottlecapData.bottlecaps.length]
  );
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
