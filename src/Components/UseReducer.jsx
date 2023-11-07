import React, { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};

const initialState = { count: 0 };

export default function UseReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <h1>useReducer Example</h1>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
        </div>
    );
}
