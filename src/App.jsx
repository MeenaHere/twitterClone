import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import HomePage from "./components/home/HomePage.jsx"; 
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
} 

export default App