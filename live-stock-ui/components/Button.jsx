import React from "react";
import { useAuth } from "../lib/contexts/AuthContext";
import { usePopup } from "../lib/contexts/PopupContext";
import useHttpClient from "../lib/hooks/useHttpClient";

function Button() {
  const { login, logout } = useAuth();
  const httpClient = useHttpClient();
  const { showSuccess } = usePopup();
  return (
    <>
      <button
        type='button'
        onClick={() => {
          login({
            email: "dev@gmail.com",
            password: "123456",
          });
        }}
        className='inline-flex font-medium border-black dark:border-white text-base hover:text-purple-600 border dark:hover:border-purple-600 px-4 py-1.5 hover:border-purple-600 rounded-lg  focus:ring-offset-2'>
        Login
      </button>
      <button
        type='button'
        onClick={() => {
          logout();
        }}
        className='inline-flex font-medium border-black dark:border-white text-base hover:text-purple-600 border dark:hover:border-purple-600 px-4 py-1.5 hover:border-purple-600 rounded-lg  focus:ring-offset-2'>
        Logout
      </button>
      <button
        type='button'
        onClick={async () => {
          const res = await httpClient.get("api/user/protected");
          console.log("res", res);
        }}
        className='inline-flex font-medium border-black dark:border-white text-base hover:text-purple-600 border dark:hover:border-purple-600 px-4 py-1.5 hover:border-purple-600 rounded-lg  focus:ring-offset-2'>
        Fetch Auth
      </button>
      <button
        type='button'
        onClick={async () => {
          showSuccess("Hello");
          const res = await httpClient.get("api/health-check");
          console.log("res", res);
        }}
        className='inline-flex font-medium border-black dark:border-white text-base hover:text-purple-600 border dark:hover:border-purple-600 px-4 py-1.5 hover:border-purple-600 rounded-lg  focus:ring-offset-2'>
        Normal API
      </button>
    </>
  );
}

export default Button;
