import HomePage from "./components/HomePage/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/messages" component={MessagesPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/more" component={MorePage} />
        {/* Add more routes for other pages */}
      </Switch>
    </Router>


  );
}

export default App;
