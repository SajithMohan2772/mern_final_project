import React, { useMemo } from 'react';

const SquareComponent = ({ number }) => {
  // Use useMemo to calculate and memoize the square
  const square = useMemo(() => {
    console.log('Calculating square...');
    return number * number;
  }, [number]); // Depend on the 'number' prop

  return (
    <div>
      <p>Number: {number}</p>
      <p>Square: {square}</p>
    </div>
  );
};

export default function UseMemo() {
  // You can further expand this to take dynamic values. 
  // For now, I'm passing a static value for the sake of example. In the case above, 
  // it computes the square of the number only when the number prop changes.
  return (
    <div>
      <h1>UseMemo Example</h1>
      <SquareComponent number={5} />
    </div>
  );
}
