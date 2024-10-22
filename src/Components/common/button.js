import React, { useState } from "react";

const SuccessPopup = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white border border-green-500 p-4 rounded shadow-lg flex items-center">
      <svg
        className="w-6 h-6 text-green-500 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span className="text-green-500">Form submitted successfully!</span>
    </div>
  </div>
);

const MyForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here

    // set the state to true to show the popup
    setIsSubmitted(true);

    // Optionally, you can reset the state after some time
    setTimeout(() => setIsSubmitted(false), 3000); // hide after 3 seconds
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields here */}
      <div className="form-group mb-4 flex justify-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md "
        >
          Submit
        </button>
      </div>
      {isSubmitted && <SuccessPopup />}
    </form>
  );
};

export default MyForm;
