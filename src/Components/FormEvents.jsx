import React, { useState } from 'react';

export default function FormEvents() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission.
    alert('Form Submitted');
  };

  const handleInputChange = (e) => {
    console.log('Input Tag:', e.target); // Logs the target input element.
    setInputValue(e.target.value); // Sets the state with the input value.
  };

  const handleReset = () => {
    setInputValue('');
    setSelectValue('');
    setTextareaValue('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Form Events Examples</h1>

      <form onSubmit={handleSubmit} onReset={handleReset}>
      
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange} // Sets input value and logs the input tag.
          onFocus={(e) => console.log('Input Focused', e.target)}
          onBlur={(e) => console.log('Input Blurred', e.target)}
          onInput={(e) => console.log('User Input Received', e.target.value)}
        />

        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)} // Sets select value.
          onFocus={(e) => console.log('Select Focused', e.target)}
          onBlur={(e) => console.log('Select Blurred', e.target)}
          style={{ marginLeft: '10px' }}
        >
          <option value="">Choose</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>

        <textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)} // Sets textarea value.
          onFocus={(e) => console.log('Textarea Focused', e.target)}
          onBlur={(e) => console.log('Textarea Blurred', e.target)}
          style={{ display: 'block', marginTop: '10px' }}
        />

        <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
        <button type="reset" style={{ marginLeft: '10px' }}>Reset</button>

      </form>

    </div>
  );
}
