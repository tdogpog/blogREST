import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };
  return (
    <div className="card">
      <div className="content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// send in a form json payload that has user/pass to the api
// the api will verify at the endpoint
// it should return a json payload contaaining the jwt
// put this jwt into local storage for future referenc
//redir to the Dashboard page.