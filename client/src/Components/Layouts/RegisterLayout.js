import React from "react";
import CircleDesign from "./CircleDesign";
import { FaUniversity } from "react-icons/fa";
import { PiStudentThin, PiUserThin } from "react-icons/pi";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import lnmiit from '../Forms/download1.png'

// layout of the register route
const RegisterLayout = () => {
  const location = useLocation().pathname;

  
  return (
    <main
    style={{
      backgroundImage: `url(${lnmiit})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
    }}
      id="register"
      className="relative z-0 flex h-screen items-center justify-center bg-gradient-to-b from-slate-400 to-slate-300 py-8 text-slate-900 dark:from-slate-800 dark:to-slate-950 dark:text-slate-200"
    >
     
      <section className="my-8 flex h-fit w-fit animate-fadeInFast flex-col duration-200 justify-start gap-6 rounded-md bg-slate-100 p-4 text-slate-900 opacity-90 focus:opacity-100 dark:bg-[#010924] dark:text-slate-50 md:p-8 lg:flex-row xl:w-1/2 ">
        <div className="flex flex-col-reverse justify-between lg:flex-col">
          <h1 className="text-4xl font-semibold lg:text-5xl">
            {location === "/register/reg_staff" ? "Staff" : "Student"}
            <br />
            Registration
          </h1>
          <div className="m-2 flex flex-col-reverse gap-4 text-4xl md:text-5xl  lg:flex-col ">
            <div className="flex gap-4 ">
              <NavLink to={"./reg_staff"}>
                {/* <PiUserThin className="rounded-full border-[1px] border-slate-900 p-[2px] font-light dark:border-slate-300 md:p-2" /> */}
                <p className="font-spectral text-2xl font-semibold decoration-violet-900 decoration-2 hover:underline dark:decoration-violet-300">Staff</p>
              </NavLink>
              <NavLink to={"./reg_student"}>
              <p className="font-spectral text-2xl font-semibold decoration-violet-900 decoration-2 hover:underline dark:decoration-violet-300">Student</p>
              </NavLink>
            </div>
            <Link
              className="flex items-center font-spectral text-xl font-semibold text-slate-900 dark:text-slate-50"
              to="../"
            >
              
              <p className="decoration-violet-900 decoration-2 hover:underline dark:decoration-violet-300">
                LNMIIT
              </p>
            </Link>
          </div>
        </div>
        <div className=" scrollWidth w-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default RegisterLayout;
