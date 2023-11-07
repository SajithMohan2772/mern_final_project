import React,{useState} from 'react'

export default function ArraysWithUseState() {
    const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);
  
    const addItem = () => setItems([...items, 'Date']);
    
    const removeItem = (index) => {
      setItems(items.filter((_, i) => i !== index));
    };
    
    const updateItem = (index) => {
      // Assuming you want to update item in some manner
      const newItems = [...items];
      newItems[index] = 'Grape';
      setItems(newItems);
    };
    
    return (
      <div>
        <h1>Arrays With UseState Examples</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => removeItem(index)}>Remove</button>
              <button onClick={() => updateItem(index)}>Update</button>
            </li>
          ))}
        </ul>
        <button onClick={addItem}>Add Item</button>
      </div>
    );
}
