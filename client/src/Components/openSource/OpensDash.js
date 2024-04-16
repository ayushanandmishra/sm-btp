import React from 'react'
import FileUpload from './Upload'
import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { AiFillBook } from "react-icons/ai";
import { AllFiles } from './AllFiles';

function OpensDash() {

    const { paper, notes, setNotes, user } = useContext(UserContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("notes/paper/" + paper._id);
        setNotes(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNotes();
    return () => setNotes([]);
  }, [paper, setNotes]);


  return (
    
    <main>
        <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        {paper.paper}
      </h2>
      <ul className="grid grid-cols-1 font-semibold sm:grid-cols-2 lg:flex lg:items-center lg:justify-start lg:gap-16">
        <li className="p-1">Batch : {paper.year}</li>
        <li className="p-1">Semester : {paper.semester}</li>
        {user.userType === "student" && (
          <li className="p-1">Teacher : {paper.teacher.name}</li>
        )}
      
      </ul>
         <FileUpload/>

         <AllFiles/>

    </main>
    
  )
}

export default OpensDash