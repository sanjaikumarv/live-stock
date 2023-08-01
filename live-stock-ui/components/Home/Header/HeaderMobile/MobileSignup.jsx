import React from "react";
import Router from "next/router";
import { useAuth } from "../../../../lib/contexts/AuthContext";

export default function MobileSignup() {
  const { LoggedIn } = useAuth();

  return (
    <div className='flex space-x-2 items-center'>
      <div className='flex gap-x-3'>
        <div className='flex gap-5'>
          {LoggedIn ? null : (
            <div>
              <button
                onClick={() => {
                  Router.push("/user/register");
                }}
                className='text-base hover:text-purple-600 mr-1'>
                Signup
              </button>
              /
              <button
                onClick={() => {
                  Router.push("/user/login");
                }}
                className='text-base hover:text-purple-600 ml-1'>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
