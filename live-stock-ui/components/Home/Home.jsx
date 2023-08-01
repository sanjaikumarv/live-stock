import Input from "./Input";
import React from "react";
import NumberOption from "./NumberOption";
import NameOption from "./NameOption";
import SearchButton from "./SearchButton";
import NavbarBottom from "./NavbarBottom";
import dayjs from "dayjs";
import { useAuth } from "../../lib/contexts/AuthContext";
export default function Home() {
  const { user } = useAuth();
  return (
    <div className='bg-white dark:bg-bgGray'>
      {/* <div>{user?.name}</div> */}
      <div className='mt-14 p-10 md:p-24 md:mt-5 lg:mt-14 lg:px-40'>
        <div>
          <h1 className='text-purple-600 text-3xl md:text-5xl lg:text-7xl  tracking-wider text-center font-medium md:mb-10'>
            THE MALAYSIA’S NO1
          </h1>
          <h1 className='dark:text-white text-center  text-2xl md:text-4xl lg:text-6xl mt-2 font-extralight'>
            LOCUM DOCTOR AGENCY
          </h1>
        </div>

        <div className='space-y-10 lg:space-y-0 lg:flex block mt-20 sm:mt-14 gap-y-10 lg:gap-x-5 md:gap-y-5 sm:mx-auto md:max-w-3xl lg:max-w-[56rem] lg:px-[2rem]  p-8 lg:py-6 dark:bg-opacity-20 dark:bg-white bg-opacity-10 bg-gray-500 rounded-lg shadow-md'>
          <Input />
          <NameOption />
          <NumberOption />
          <div className='text-center lg:text-base'>
            <SearchButton />
          </div>
        </div>
        <div className='mt-14 px-10 sm:px-0 sm:mt-14 lg:mt-14 mx-auto max-w-2xl lg:max-w-[54rem]'>
          <p className='dark:text-white text-black text-sm md:text-base font-semibold'>
            <span className='tracking-wider'>Trending Keywords :</span>

            <span className='font-light ml-2'>
              General, Medicine - Cardiology, Medicine -
              Endocrinology,Neurology, Medicine - Palliative Care, Medicine -
              Rehabilitation,Respiratory, Medicine - Strok{" "}
            </span>
          </p>
        </div>
      </div>
      <div className='px-6 mt-10 sm:px-0 bg-opacity-20 text-white '>
        <NavbarBottom />
      </div>
    </div>
  );
}
