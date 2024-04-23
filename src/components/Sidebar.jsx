import React, { useState } from "react";
import "./Sidebar.css";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { db, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, "myfiles"), {
            timestamp: serverTimestamp(),
            filename: file.name,
            fileURL: downloadURL,
            size: uploadTask.snapshot.bytesTransferred,
          })
            .then(() => {
              setUploading(false);
              setFile(null);
              setOpen(false);
            })
            .catch((error) => {
              alert("Error adding document: ", error);
            });
        });
      }
    );
  };

  // Function to close the sidebar
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <Backdrop
        open={isOpen}
        onClick={closeSidebar}
        style={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      ></Backdrop>
      <Modal open={open} onClose={() => setOpen(false)} className="modal">
        <div className="modalPopup">
          <form onSubmit={handleUpload}>
            <div className="modalHeading">
              <h3>Select file you want to upload</h3>
            </div>
            <div className="modalBody">
              {uploading ? (
                <p className="uploadingPara">Uploading</p>
              ) : (
                <>
                  <input
                    type="file"
                    className="modalFile"
                    onChange={handleFile}
                  />
                  <input type="submit" className="modalSubmit" />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
      <div className={`sidebarContainer ${isOpen ? "open" : ""}`}>
        <div className="sidebarBtn">
          <button onClick={() => setOpen(true)}>
            <MobileScreenShareIcon />
            <span>New</span>
          </button>
        </div>
        <div className="sidebarOptions">
          <div className="sidebarOption">
            <MobileScreenShareIcon />
            <span>My Drive</span>
          </div>
          <div className="sidebarOption">
            <DevicesIcon />
            <span>Computers</span>
          </div>
          <div className="sidebarOption">
            <PeopleAltIcon />
            <span>Shared with me</span>
          </div>
          <div className="sidebarOption">
            <QueryBuilderIcon />
            <span>Recent</span>
          </div>
          <div className="sidebarOption">
            <StarBorderIcon />
            <span>Starred</span>
          </div>
          <div className="sidebarOption">
            <DeleteOutlineIcon />
            <span>Trash</span>
          </div>
        </div>
        <hr />
        <div className="sidebarOptions">
          <div className="sidebarOption">
            <CloudQueueIcon />
            <span>Storage</span>
          </div>
          <div className="progressBar">
            <progress size="tiny" value="33" max="100" />
            <span>5 GB of 15 GB used</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
