import React, { useState, useEffect } from "react";

export default function Async_Validation() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkUsernameAvailability = (username) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (["john", "alice", "bob"].includes(username)) {
          reject("Username is taken");
        } else {
          resolve("Username is available");
        }
      }, 1000);
    });
  };

  useEffect(() => {
    if (!username) return; // Don't check if username is empty

    setIsLoading(true);
    setError(null);

    checkUsernameAvailability(username)
      .then(() => setError(null))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && !isLoading) {
      console.log("Form submitted with username:", username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Asynchronous Validation Example</h1>
      <div>
        <label>Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        {isLoading && <span>Loading...</span>}
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
      <button type="submit" disabled={error || isLoading}>
        Register
      </button>
    </form>
  );
}
