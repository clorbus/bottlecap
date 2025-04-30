import Image from "next/image";

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

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-12 gap-2 max-w-6xl mx-auto">
        {gridImages.map((image, index) => (
          <div key={index} className="aspect-square relative">
            <Image
              src={`/images/${image}`}
              alt={`Grid image ${index + 1}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
