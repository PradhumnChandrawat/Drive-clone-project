import React, { useState } from "react";
import "./App.css";
import Data from "./components/Data";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      {user ? (
        <>
          <Header
            photoURL={user.photoURL}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className="App">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <Data />
          </div>
        </>
      ) : (
        <div className="LoginWrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png"
            alt="Google Drive"
          />
          <button onClick={signIn}>Login to Google Drive</button>
        </div>
      )}
    </>
  );
}

export default App;
