import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";

import { useAuth } from "../../lib/contexts/AuthContext";
import useHttpClient from "../../lib/hooks/useHttpClient";
import { usePopup } from "../../lib/contexts/PopupContext";
import Router from "next/router";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  rememberme: Yup.boolean().required("Required"),
});

export default function Login() {
  const { login } = useAuth();

  return (
    <div className='p-5 dark:bg-bgGray'>
      <div className='bg-sandle-100 mt-10 dark:bg-bgForm border-gray-200 dark:border-opacity-30 rounded-xl  shadow-lg max-w-lg mx-auto'>
        <h1 className='px-5 py-10 text-center text-xl sm:text-3xl font-bold'>
          Login Your Account
        </h1>
        <hr className='  border-gray-700 dark:border-white dark:border-opacity-20' />
        <Formik
          initialValues={{ email: "", password: "", rememberme: "" }}
          validationSchema={SigninSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            const formValues = { ...values };
            delete formValues.rememberme;
            login(formValues);
          }}>
          {({ isSubmitting }) => (
            <div>
              <Form>
                <div className='space-y-6 p-8 md:p-14'>
                  <div className='relative'>
                    <label htmlFor='Email'>Email Address</label>

                    <Field
                      type='email'
                      className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0  focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600 py-2 px-2 w-full'
                      name='email'
                      placeholder='Email'
                    />
                    <ErrorMessage
                      name='email'
                      className='text-red-400 absolute top-18'
                      component='div'
                    />
                  </div>
                  <div className=' relative'>
                    <label htmlFor='Password'>Password</label>

                    <Field
                      type='password'
                      className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                      name='password'
                      placeholder='Password'
                    />
                    <ErrorMessage
                      name='password'
                      className='text-red-400 absolute top-18'
                      component='div'
                    />
                  </div>
                  <div className='mt-5 relative flex text-xs lg:text-base justify-between'>
                    <div className='flex'>
                      <Field
                        type='checkbox'
                        className='mt-[0.680rem] dark:placeholder-white rounded-[0.320rem] focus:ring-1 focus:ring-purple-600'
                        name='rememberme'
                      />
                      <p className='mt-1.5 ml-1'>Remember me</p>
                      <div>
                        <ErrorMessage
                          name='rememberme'
                          className='text-red-400 absolute top-6 left-0'
                          component='p'
                        />
                      </div>
                    </div>

                    <a href='' className=' mt-1.5 hover:underline'>
                      Forgot Password ?
                    </a>
                  </div>
                  <div className='mt-5  mx-auto'>
                    <button
                      type='submit'
                      className='mt-8 py-2 text-center w-full flex justify-center px-4  items-center rounded-lg font-bold text-white  bg-purple-600  focus:shadow-md'
                      disabled={isSubmitting}>
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
