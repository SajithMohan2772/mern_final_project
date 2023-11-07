import React from 'react'

export default function MouseEvents() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Mouse Events Examples</h1>

      <button onClick={() => alert('Button Clicked!')}>
        Click me
      </button>
      
      <button onDoubleClick={() => alert('Button Double Clicked!')}>
        Double Click me
      </button>

      <div
       //onMouseDown={() => alert('Mouse Down!')}
      //  onMouseUp={() => alert('Mouse Up!')}
        style={{ marginTop: '20px', padding: '30px', border: '1px solid black' }}
      >
        Mouse Down & Up here
      </div>

      <div
        // onMouseMove={() => alert('Mouse is moving!')}
        style={{ marginTop: '10px', height: '50px', border: '1px solid black' }}
      >
        Move Mouse Over here
      </div>

      <div
       // onMouseOver={() => alert('Mouse Over!')}
        onMouseOut={() => alert('Mouse Out!')}
        style={{ marginTop: '10px', height: '50px', border: '1px solid black' }}
      >
        Mouse Over & Out here
      </div>

    </div>
  )
}
