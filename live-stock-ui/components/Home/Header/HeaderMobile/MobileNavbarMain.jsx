import React from "react";
import MobileNavbar from "./MobileNavbar";
import MobileSignup from "./MobileSignup";

export default function MobileHeaderMain({ mobile, setMobile }) {
  return (
    <div>
      <div className=' border dark:border-0 fixed top-0 right-0 h-full rounded-lg space-y-2 w-[18rem] dark:bg-bgForm px-5 py-5 bg-sandle-100 shadow-lg '>
        <button className='flex justify-end' onClick={() => setMobile(!mobile)}>
          <svg
            className=' dark:text-purple-600 rounded-md dark:border-white h-6 w-6 '
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </button>
        <div className=' space-y-1 py-1 border-t-2 dark:border-opacity-25  dark:border-white border-opacity-30 '>
          <MobileNavbar />
          <MobileSignup />
        </div>
      </div>
    </div>
  );
}
