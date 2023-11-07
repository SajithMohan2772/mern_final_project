import React, { useRef } from "react";

export default function Uncontrolled_Component() {

    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value
        };
        console.log('Uncontrolled Form submitted with values:', values);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Uncontrolled Components Example</h1>
            <input 
                type="text" 
                name="firstName"
                placeholder="First Name"
                ref={firstNameRef}
            />
            <input 
                type="text" 
                name="lastName"
                placeholder="Last Name"
                ref={lastNameRef}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

