import React, { useState } from 'react';

export default function ObjectsWithUseState() {
   // Initialize state
   const [user, setUser] = useState({ name: 'John', age: 30 });

   // Function to handle name change
   const changeName = () => {
     setUser(prevUser => ({ ...prevUser, name: 'Jane' }));
   };
 
   // Function to handle age increment
   const incrementAge = () => {
     setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));
   };
 
   return (
     <div>
        <h1>Objects With UseState Examples</h1>
       <p>{user.name} is {user.age} years old</p>
       <button onClick={changeName}>Change Name</button>
       <button onClick={incrementAge}>Increment Age</button>
     </div>
   );
}
