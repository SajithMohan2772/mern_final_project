import React, { useState, useCallback } from 'react';

// Child component
const ChildComponent = ({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me!</button>;
};

export default function UseCallback() {
  const [count, setCount] = useState(0);

  // Define a callback function using useCallback
  const handleClick = useCallback(() => {
    console.log('Button clicked');
    setCount(prevCount => prevCount + 1); // Using functional update
  }, []); // Empty dependency array because of the functional update

  return (
    <div>
      <h1>UseCallback Example</h1>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}
