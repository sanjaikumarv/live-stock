import React from "react";

export default function PopUP({ setMobile, mobile }) {
  return (
    <button
      onClick={() => setMobile(!mobile)}
      className='block lg:hidden dark:bg-white bg-bgForm  dark:text-purple-600 rounded-full w-10 h-10 px-1 py-1  border-opacity-30 dark:border-opacity-50'>
      <svg
        xmlns='http://www.w3.org/2000/svg'

        className='w-6 h-6 text-white mx-auto dark:text-black focus:text-purple-600'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4 6h16M4 12h16M4 18h16'
        />
      </svg>
    </button>
  );
}
