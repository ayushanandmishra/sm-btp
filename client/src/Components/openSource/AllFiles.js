import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AllFiles = () => {


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

  
  const subject = useParams().paper;
  const [files, setFiles] = useState([]);
  const getFile = async () => {
    const response = await fetch(`http://localhost:3500/getfile/${subject}/${type}`, {
      method: "GET"
    });
    const data = await response.json();

    setFiles(data);
  };

  useEffect(() => {
    getFile();
  }, []);

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="mt-2 grid grid-cols-1 gap-4">
      {files.map((file) => (
        <div
          key={file._id}
          className="bg-black bg-opacity-70 rounded p-4 cursor-pointer hover:bg-opacity-100"
          onClick={() => handleClick(file.fileurl)}
        >
          <p className="text-white font-bold">{file.ResourceName}</p>
          <p className="text-gray-300">Type: {file.ResourceType}</p>
          <p className="text-gray-300">Subject: {file.ResourceSubject}</p>
          <p className="text-gray-300">Owner: {file.ResourceOwner}</p>
        </div>
      ))}
    </div>
  )
}