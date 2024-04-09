import { useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorStrip from "../ErrorStrip";

const StudentForm = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    username: "",
    password: "",
    rollno:"",
  });
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      console.log(student);
      const reqData = JSON.stringify(student);
      const response = await axios.post("student", reqData);
      navigate("/");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form className="scrollWidth w-full animate-fadeIn font-medium tracking-wide accent-violet-600">
      <label className="block" htmlFor="name">
        Name:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="text"
        required
        id="name"
        value={student.name}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="email">
        Email:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="text"
        required
        id="email"
        value={student.email}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="name">
        Roll No:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="text"
        required
        id="rollno"
        value={student.rollno}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="course">
        Course:
      </label>
      <select
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-[1.5px] focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        placeholder="select department"
        name="course"
        id="course"
        value={student.course}
        required
        onChange={(e) => handleFormChange(e)}
      >
        <option defaultValue hidden>
          Select Course
        </option>

        <option
          className="min-h-[2rem] bg-violet-700 font-semibold leading-8 text-slate-100"
          value="Computer"
        >
          Computer
        </option>
        <option
          className="min-h-[2rem] bg-violet-500 font-semibold leading-8 text-slate-100"
          value="Electronics"
        >
          Electronics
        </option>
        <option
          className="min-h-[2rem] bg-violet-700 font-semibold leading-8 text-slate-100"
          value="Mechanical"
        >
          Mechanical
        </option>
      </select>
      <label className="block" htmlFor="username">
        Username:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="text"
        id="username"
        required
        value={student.username}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="password">
        Password:
      </label>
      <input
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
        type="password"
        id="password"
        value={student.password}
        onChange={(e) => handleFormChange(e)}
        required
      />
      <button
        type="submit"
        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 "
        onClick={(e) => addStudent(e)}
      >
        Register
      </button>
      {error ? <ErrorStrip error={error} /> : ""}
    </form>
  );
};

export default StudentForm;
