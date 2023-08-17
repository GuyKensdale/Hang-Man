import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainGame from "./routes/MainGame"; // Adjust the import path as needed
import SignIn from "./routes/SignIn";
import HighScores from "./routes/HighScores";
function App() {
  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/MainGame" element={<MainGame />} />
          <Route path="/HighScores" element={<HighScores />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
