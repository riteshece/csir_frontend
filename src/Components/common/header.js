import React from "react";

const Header = () => {
  return (
    <div className="mb-1 bg-slate-400 sticky top-0 p-3 -m-4 flex justify-between items-center bg-[#dbeafe]">
      <h1 className="text-4xl text-center font-bold ml-96 ">
        CSIR Technology Database India (TMD)
      </h1>
      <img
        src="https://www.csir.res.in/sites/default/files/inline-images/CSIR-Logo.jpg"
        alt="Logo"
        className="h-10 w-10 mr-4"
      ></img>
    </div>
  );
};

export default Header;
