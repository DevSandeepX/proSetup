import React from 'react';

const Public = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 w-full h-screen text-center border border-gray-200 rounded-none">
      <div className="w-full max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Welcome to <span className="text-indigo-600">TechNots</span>
        </h1>
        <p className="max-w-2xl text-slate-600 mt-6 mx-auto text-lg">
          Your one-stop platform for mastering technology, taking online exams, and earning certifications with ease.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 w-full max-w-md mx-auto">
          <button
            type="button"
            className="group flex items-center justify-center gap-2 px-6 py-2 border border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            Learn More
            <svg
              className="mt-0.5 group-hover:translate-x-1 transition-transform"
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 transition-all px-6 py-2 text-white font-medium rounded-full"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Public;
