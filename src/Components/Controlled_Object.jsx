import React, { useState } from "react";

export default function Controlled_Object() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Controlled Form submitted with values:', values);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Controlled Components with Objects Example</h1>
            <input 
                type="text" 
                name="firstName"
                value={values.firstName} 
                placeholder="First Name"
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="lastName"
                value={values.lastName} 
                placeholder="Last Name"
                onChange={handleChange} 
            />
            <button type="submit">Submit</button>
        </form>
    );
}
