import React from "react";
import Router from "next/router";
import LightModeSVG from "../../SVG/LightModeSVG";
import DarkModeSVG from "../../SVG/DarkModeSVG";
import useTheme from "../../../lib/hooks/useTheme";
import { useAuth } from "../../../lib/contexts/AuthContext";
import LoggedInOnly from "../../Common/LoggedInOnly";

export default function HeaderSignup() {
  const { loggedIn, logout } = useAuth();

  return (
    <div className='flex space-x-2 items-center'>
      <div className='flex gap-x-3'>
        <div className='flex gap-5'>
          {loggedIn ? (
            <div>
              <div className='hidden lg:block'>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className='inline-flex font-medium border-black dark:border-white text-base hover:text-purple-600 border dark:hover:border-purple-600 px-4 py-1.5 hover:border-purple-600 rounded-lg  focus:ring-offset-2 '>
                  LOGOUT
                </button>
              </div>
            </div>
          ) : (
            <div className='flex gap-x-3'>
              <div className='hidden lg:block'>
                <button
                  onClick={() => {
                    Router.push("/user/register");
                  }}
                  className='inline-flex font-medium text-base hover:text-purple-600 border border-black dark:border-white dark:hover:border-purple-600 hover:border-purple-600 rounded-lg px-4 py-1.5 focus:ring-offset-2 '>
                  SIGNUP
                </button>
              </div>

              <div className='hidden lg:block'>
                <button
                  onClick={() => {
                    Router.push("/user/login");
                  }}
                  className='inline-flex font-medium border-black dark:border-white text-base hover:text-purple-600 border dark:hover:border-purple-600 px-4 py-1.5 hover:border-purple-600 rounded-lg  focus:ring-offset-2 '>
                  LOGIN
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
