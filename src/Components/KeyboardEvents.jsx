import React from 'react';

export default function KeyboardEvents() {
  const handleKeyDown = (e) => {
    console.log('Key Down:', e.key);
  };

  const handleKeyPress = (e) => {
    console.log('Key Press:', e.key);
  };

  const handleKeyUp = (e) => {
    console.log('Key Up:', e.key);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Keyboard Events Examples</h1>

      {/* //Inspect in console log */}
      <input
        type="text"
        onKeyDown={handleKeyDown} // Executed when a key is pressed down.
        // onKeyPress={handleKeyPress} // Executed when a key is pressed.
        onKeyUp={handleKeyUp} // Executed when a key is released.
        placeholder="Type something..."
        style={{ marginTop: '10px', display: 'block' }}
      />
    </div>
  );
}
