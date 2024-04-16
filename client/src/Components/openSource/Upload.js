import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
// import Loader2 from '../Loader2';
// import './Upload.css';


const FileUpload = ({ onFileUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false);
  const [reload,setReload]=useState(false);
  const [uploading, setUploading] = useState(false);
  const isNonMobileScreens = useMediaQuery('(min-width:820px)');
  const { paper }=useParams();
  console.log(paper);
  const getUserData = () => {
    const userStr = localStorage.getItem('userDetails');;
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  };

  const [user, setUser] = useState(getUserData());
  console.log(user);

  useEffect(() => {
    const storedUser = getUserData();
    setUser(storedUser);
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  let type;
  if((window.location.href).includes("notes"))
  {
    type="Notes";
  }
  else if((window.location.href).includes("qp"))
  {
    type="qp";
  }
  else 
  {
    type="lectures";
  }
  const submit = async () => {
    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }
    formData.append("id", user._id);
    // formData.append("email", user.email);
    formData.append("username", `${user.name}`);
    formData.append("subject",paper);
    formData.append("type",type);
    // await axios.post("http://localhost:3001/api/posts", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    try {
      const response = await fetch(`http://localhost:3500/api/posts`, {
        method: "POST",
        // headers: {
        //   authorization: `Bearer ${token}`
        // },
        body: formData,
      });
    } catch (error) {
      console.error("Error during file upload", error);
    } finally {
      setUploading(false); // Set the uploading state back to false
      setSelectedFiles(null);
      setUploadClicked(false);
      setReload(!reload);
    }

    
    
  }

  const handleUpload = async () => {
    if (selectedFiles) {
      // You can perform additional actions before uploading, if needed
      setUploadClicked(true);
      
      const res = await submit();
      // Clear the selected files after upload
      setSelectedFiles(null);
      setUploadClicked(false);
    }
  };

  const handleReject = () => {
    setSelectedFiles(null);
  };

  useEffect(()=>{
    console.log(selectedFiles);
  },[selectedFiles,reload]);

  // function getAllLocalStorageData() {
  //   const data = {};
  //   for (let i = 0; i < localStorage.length; i++) {
  //     console.log(i);
  //     const key = localStorage.key(i);
  //     const value = localStorage.getItem(key);
  //     try {
  //       data[key] = JSON.parse(value); // Parse if the value is JSON
  //     } catch (error) {
  //       // Handle non-JSON values (optional)
  //       data[key] = value; // Store the raw value if parsing fails
  //     }
  //   }
  //   return data;
  // }
  
  // const allData = getAllLocalStorageData();
  // console.log(allData); // This will log an object containing all stored key-value pairs
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isNonMobileScreens ? 'row' : 'column', // Change to column for screens less than 820px
        justifyContent: isNonMobileScreens ? 'space-between' : 'center',
        alignItems: isNonMobileScreens ? 'center' : 'center', // Align center for all screens
        mt: 3
      }}
      className="uploadContainer"
    >
      
      <input
        type="file"
        id="fileInput"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="fileInput" className="UploadBtn">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload Files
        </Button>
      </label>
      {selectedFiles && !uploading && (
        <div className="fileName" style={{ marginTop: '10px', textAlign: 'center' }}>
          <strong style={{ fontSize: '1rem' }}>
            {selectedFiles.length === 1
              ? 'Selected File:'
              : `${selectedFiles.length} Files Selected`}
          </strong>
          {selectedFiles.length === 1 && (
            <ul>
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {uploading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          File is being uploaded
        </Typography>
        {/* <Loader2/> */}
      </Box>

      )}

      <Box>

        {selectedFiles && (
          <Button
            sx={isNonMobileScreens ? { mr: 1 } : { mt: 3, mr: 1 }}
            className="removeBtn"
            variant="contained"
            color="error"
            onClick={handleReject}
            disabled={uploadClicked}
          >
            {isNonMobileScreens ? 'Remove' : <CloseIcon />}
          </Button>
        )}
        <Button
          sx={isNonMobileScreens ? {} : { mt: 3, ml: 1 }}
          className="uploadBtn"
          variant="contained"
          color="success"
          onClick={handleUpload}
          disabled={!selectedFiles || uploading}
        >
          {isNonMobileScreens ? 'Upload' : <CloudUploadIcon />}
        </Button>
      </Box>
    </Box>
  );
};

export default FileUpload;