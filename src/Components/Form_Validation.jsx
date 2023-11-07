import React, { useState } from "react";

export default function Form_Validation() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value); // Update the phone number in state regardless of its validity.
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsMatching(e.target.value === password);
  };

  const handleDOBChange = (e) => {
    setDob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneError && isMatching) {
      console.log({
        username: e.target.username.value,
        email: e.target.email.value,
        password,
        confirmPassword,
        phoneNumber,
        dob,
      });
    }
  };

  return (
      <div>
     <h1>Form Validation Example</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            title="Please enter a valid email address."
          />
        </label>
        <br />

        <label>
        Phone Number:
        <input
          type="tel"
          name="phone"
          pattern="^[0-9]{10}$"
          title="Please enter a valid 10-digit phone number without spaces or dashes."
          required
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!isMatching && (
            <div style={{ color: "red" }}>Passwords do not match</div>
          )}
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            max={new Date().toISOString().split("T")[0]}
            value={dob}
            onChange={handleDOBChange}
          />
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
