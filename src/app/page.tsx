"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import bottlecapData from "@/data/bottlecaps.json";

export default function Home() {
  // Create a 12x12 grid (144 total) of bottlecaps by repeating our bottlecap data
  // This creates a full grid even though we have fewer unique bottlecaps
  const gridBottlecaps = Array.from(
    { length: 144 },
    (_, index) => bottlecapData.bottlecaps[index % bottlecapData.bottlecaps.length]
  );

  // State management using React hooks
  // Each state variable represents a different aspect of our UI:
  const [flippedStates, setFlippedStates] = useState<boolean[]>(Array(144).fill(false)); // Track which bottlecaps are flipped
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Track which bottlecap is selected for the modal
  const [isClosing, setIsClosing] = useState(false); // Track if the modal is in the process of closing
  const [isFlippingAll, setIsFlippingAll] = useState(false); // Track if we're in the middle of flipping all bottlecaps

  // Handle right-click (context menu) on a bottlecap
  // This prevents the default context menu and toggles the flip state
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); // Prevent the default browser context menu
    setFlippedStates(prev => {
      const newStates = [...prev]; // Create a new array to maintain immutability
      newStates[index] = !newStates[index]; // Toggle the flip state for this specific bottlecap
      return newStates;
    });
  };

  // Handle left-click on a bottlecap
  // This opens the modal with the bottlecap's details
  const handleClick = (index: number) => {
    setSelectedIndex(index); // Set the selected bottlecap
    setIsClosing(false); // Ensure the modal isn't in closing state
  };

  // Handle modal close
  // This starts the closing animation
  const handleClose = () => {
    setIsClosing(true);
  };

  // Handle after modal close animation completes
  // This cleans up the state after the animation is done
  const handleAfterLeave = () => {
    setSelectedIndex(null); // Clear the selected bottlecap
    setIsClosing(false); // Reset the closing state
  };

  // Handle the "Flip All" button click
  // This creates a cascade animation effect
  const handleFlipAll = () => {
    setIsFlippingAll(true); // Start the flip all animation
    const newStates = [...flippedStates];
    const allFlipped = newStates.every(state => state); // Check if all bottlecaps are currently flipped

    // Flip all bottlecaps to the opposite state
    for (let i = 0; i < newStates.length; i++) {
      newStates[i] = !allFlipped;
    }

    setFlippedStates(newStates);
    // Reset the flipping state after animation completes
    setTimeout(() => setIsFlippingAll(false), 1000);
  };

  // Calculate animation delay based on position in the grid
  // This creates a diagonal cascade effect
  const getDelay = (index: number) => {
    const row = Math.floor(index / 12); // Calculate row number (0-11)
    const col = index % 12; // Calculate column number (0-11)
    return (row + col) * 0.05; // 50ms delay between each diagonal
  };

  return (
    <div className="min-h-screen p-8">
      {/* Flip All button container */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={handleFlipAll}
          disabled={isFlippingAll}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isFlippingAll ? 'Flipping...' : 'Flip All'}
        </button>
      </div>

      {/* Main grid container */}
      <div className="grid grid-cols-12 gap-2 max-w-6xl mx-auto">
        {gridBottlecaps.map((bottlecap, index) => (
          <motion.div
            key={`${bottlecap.id}-${index}`}
            className="aspect-square relative cursor-pointer"
            onContextMenu={(e) => handleContextMenu(e, index)}
            onClick={() => handleClick(index)}
            animate={{
              rotateY: flippedStates[index] ? 180 : 0, // Rotate 180 degrees when flipped
            }}
            transition={{
              duration: 0.6, // Animation duration
              ease: "easeInOut", // Smooth acceleration and deceleration
              delay: isFlippingAll ? getDelay(index) : 0 // Add delay for cascade effect
            }}
            style={{
              transformStyle: "preserve-3d", // Enable 3D transforms
            }}
          >
            {/* Front side of the bottlecap */}
            <motion.div
              style={{
                backfaceVisibility: "hidden", // Hide the back when showing front
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

            {/* Back side of the bottlecap */}
            <motion.div
              style={{
                backfaceVisibility: "hidden", // Hide the front when showing back
                position: "absolute",
                width: "100%",
                height: "100%",
                transform: "rotateY(180deg)", // Start rotated 180 degrees
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

      {/* Modal for displaying bottlecap details */}
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
          {/* Modal backdrop */}
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

          {/* Modal content container */}
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
                      {/* Bottlecap image */}
                      <div className="relative w-48 h-48 mx-auto mb-4">
                        <Image
                          src={`/images/${gridBottlecaps[selectedIndex].frontImage}`}
                          alt={`${gridBottlecaps[selectedIndex].color} bottlecap`}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Bottlecap title */}
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 mb-2"
                      >
                        {gridBottlecaps[selectedIndex].color} Bottlecap
                      </Dialog.Title>

                      {/* Bottlecap description and fun fact */}
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-4">
                          {gridBottlecaps[selectedIndex].description}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Fun Fact:</span> {gridBottlecaps[selectedIndex].funFact}
                        </p>
                      </div>

                      {/* Close button */}
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
