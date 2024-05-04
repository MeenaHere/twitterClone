import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Home from "./components/Home.jsx"; 
import Login from "./components/login/Login.jsx";
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
} 

export default App