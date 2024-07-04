import React, { useState, useEffect } from "react";
import Upload from "./components/Upload";
import Status from "./components/Status";
import Images from "./components/Images";
import axios from "axios";
import './App.css';

const App = () => {
  const [newImageData, setNewImageData] = useState(null);
  const [serverStatus, setServerStatus] = useState(false);

  useEffect(() => {
    // Check server status on component mount
    axios.get("https://project-1-i21e.onrender.com/status")
      .then((response) => {
        if (response.status === 200) {
          setServerStatus(true);
        }
      })
      .catch((error) => {
        console.error("Server's are starting", error);
      });
  }, []);

  const handleUploadSuccess = (data) => {
    setNewImageData(data);
  };

  return (
    <div className="App">
      <a href="https://github.com/furiousluck/ID-OCR-Application">Github Repository!!</a>
      <h1>OCR Application</h1>
      {serverStatus ? (
        <>
          <Status />
          <Upload onUploadSuccess={handleUploadSuccess} />
          <Images newImageData={newImageData} />
        </>
      ) : (
        <p>Server's are starting. Please wait and reload the page.</p>
      )}
    </div>
  );
};

export default App;