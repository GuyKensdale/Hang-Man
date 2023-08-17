import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // State to capture the input value

  const handleSignIn = () => {
    let path = `/MainGame`;
    navigate(path, { state: { username } }); // Pass the username as state
  };

  return (
    <>
      <div className="body">
        <h1>Welcome to Hangman</h1>
        <h2>Create a unique username</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update the username state
        />
        <button onClick={handleSignIn}>Submit</button>
        <h3>Created by Guy Kensdale</h3>
      </div>
    </>
  );
}

export default SignIn;
