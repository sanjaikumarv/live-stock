import Link from "next/link";
import React from "react";

import HeaderNavbar from "./Header/HeaderNavbar";
import HeaderSignup from "./Header/HeaderSignup";
import PopUP from "./Header/PopUp";

import { useState } from "react";
import MobileHeaderMain from "./Header/HeaderMobile/MobileNavbarMain";

export default function Header() {
  const [mobile, setMobile] = useState();

  return (
    <div className='relative'>
      <header className='flex shadow-md rounded-md dark:border-b dark:border-white dark:border-opacity-20 py-3 items-center justify-between px-5 lg:px-14 text-2xl'>
        <Link href='/farm'>
          <div className='dark:text-white text-black hover:cursor-pointer'>
            LIVE STOCK
          </div>
          {/* <Image src='/logo.png' alt='Locum' width={160} height={50} /> */}
        </Link>
        <HeaderNavbar />
        <div className='flex gap-5'>
          <HeaderSignup />

          <div className=''>
            <PopUP mobile={mobile} setMobile={setMobile} />
            <div className={`${mobile && "duration-200 "} `}>
              {mobile && (
                <MobileHeaderMain mobile={mobile} setMobile={setMobile} />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
