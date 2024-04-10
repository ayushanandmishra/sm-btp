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
        
        {user.userType === "staff" && (
          <li>
            <Link
              className="rounded-md px-2 py-1 underline decoration-violet-900   decoration-2 underline-offset-2 hover:bg-violet-950 hover:text-slate-100 hover:decoration-0 dark:decoration-inherit dark:hover:bg-violet-900/80 dark:hover:text-slate-200 md:p-2 "
              to="add"
            >
              Add Note
            </Link>
          </li>
        )}
      </ul>
         <FileUpload/>

    </main>
    
  )
}

export default OpensDash