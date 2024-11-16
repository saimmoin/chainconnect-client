/** @format */
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/details" element={<PostDetails />} />
            <Route path="/register" element={<Register heading={"Create Your Account"} buttonText={"Register"} />} />
            <Route path="/update" element={<Register heading={"Update Your Account"} buttonText={"Update"} isUpdating={true} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
