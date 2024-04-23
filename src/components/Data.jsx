import React, { useEffect, useState } from "react";
import "./Data.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SubjectIcon from "@mui/icons-material/Subject";
import InfoIcon from "@mui/icons-material/Info";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const myFilesCollectionRef = collection(db, "myfiles");

    const unsubscribe = onSnapshot(myFilesCollectionRef, (snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  const changeBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleDelete = async (fileId) => {
    const fileRef = doc(db, "myfiles", fileId);
    try {
      await deleteDoc(fileRef);
      // Update the state to reflect the UI change
      setFiles(files.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  return (
    <div className="DataContainer">
      <div className="DataHeader">
        <div className="headerLeft">
          <p>My Drive</p>
          <ArrowDropDownIcon />
        </div>
        <div className="headerRight">
          <SubjectIcon />
          <InfoIcon />
        </div>
      </div>
      <div>
        <div className="DataGrid">
          {files.map((file) => (
            <div className="DataFile" key={file.id}>
              <InsertDriveFileIcon />
              <p>{file.data.filename}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="DataListRow">
            <p>
              <b>
                Name <ArrowDownwardIcon />
              </b>
            </p>
            <p>
              <b>Owner</b>
            </p>
            <p>
              <b>Last Modified</b>
            </p>
            <p>
              <b>File Size</b>
            </p>
          </div>
          {files.map((file) => (
            <div className="DataListRow" key={file.id}>
              <a href={file.data.fileURL} target="_blank" rel="noreferrer">
                <p>
                  <InsertDriveFileIcon /> {file.data.filename}
                </p>
              </a>
              <p>Owner </p>
              <p>
                {new Date(file.data.timestamp?.seconds * 1000).toUTCString()}
              </p>
              <p>{changeBytes(file.data.size)}</p>
              <DeleteOutlineIcon onClick={() => handleDelete(file.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
