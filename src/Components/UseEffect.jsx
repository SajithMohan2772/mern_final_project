import React, { useState, useEffect } from 'react';

export default function UseEffect() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Example with Empty Dependencies Array
  useEffect(() => {
    console.log('This runs once after the initial render');
  }, []);

  // Example with No Dependencies Array
  useEffect(() => {
    console.log('This runs after every render');
  });

  // Example with Dependencies Array with Values
  useEffect(() => {
    console.log('This runs when either count or name state changes', count, name);
  }, [count, name]);

  return (
    <div>
      <h1>UseEffect Examples</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>Increase Counting</button>
        <p>Count: {count}</p>
      </div>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type a name"/>
        <p>Name: {name}</p>
      </div>
    </div>
  );
}
