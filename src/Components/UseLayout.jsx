import React, { useState, useLayoutEffect } from 'react';

export default function UseLayout() {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // Measure the width of a DOM element
    const element = document.getElementById('myElement');
    if (element) {
      const elementWidth = element.clientWidth;
      setWidth(elementWidth);
    }
  }, []); // Runs synchronously after initial render

  return (
    <div>
        <h1>Use Layout Effect Example</h1>
      {/* Attach an ID to the DOM element to be measured */}
      <div id="myElement">This element's width: {width}px</div>
    </div>
  );
}
