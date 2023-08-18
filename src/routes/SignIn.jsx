import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // State to capture the input value
  const [validUserState, setValidUserDate] = useState("");
  const handleSignIn = () => {
    if (username.length > 0 && username.length < 14) {
      let path = `/MainGame`;
      navigate(path, { state: { username } }); // Pass the username as state
    } else {
      setValidUserDate(
        "Your username must be between 1-15 characters in length"
      );
    }
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
        <button
          className="button-53
        "
          onClick={handleSignIn}
        >
          Submit
        </button>
        <h5>{validUserState}</h5>
        <h3>Created by Guy Kensdale</h3>
      </div>
    </>
  );
}

export default SignIn;
