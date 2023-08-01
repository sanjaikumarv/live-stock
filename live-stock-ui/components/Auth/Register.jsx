import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCallback, useState, useEffect } from "react";

import { useAuth } from "../../lib/contexts/AuthContext";
import useHttpClient from "../../lib/hooks/useHttpClient";
import { usePopup } from "../../lib/contexts/PopupContext";

import Router from "next/router";
import axios from "axios";

import { CheckboxInput, SelectInput, TextInput } from "../Common/Widgets";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmpassword: Yup.string().required("Required"),
  userType: Yup.string().required("Required"),
  terms: Yup.boolean().required("You must accept the terms and conditions"),
});

export default function Register() {
  const [usertypes, setUsertypes] = useState([]);
  const httpClient = useHttpClient();

  const { showSuccess } = usePopup();
  const { showError } = usePopup();

  const registerUser = useCallback(
    (values) => {
      httpClient
        .post("api/user/register", values)
        .then((res) => {
          showSuccess(res.data.message);
          Router.push("/user/login");
        })
        .catch((err) => {
          showError(err.message);
        });
    },
    [httpClient]
  );

  useEffect(() => {
    userType();
  }, []);

  const userType = useCallback(
    (values) => {
      httpClient
        .get("api/user/user-types")
        .then((res) => {
          setUsertypes(res.data);
          console.log(usertypes);
        })
        .catch((err) => {
          showError(err.message);
        });
    },
    [httpClient]
  );

  console.log("usertypes", usertypes);

  return (
    <div className='px-10 dark:bg-bgGray'>
      <div className='lg:p-10 max-w-4xl mx-auto'>
        <div className='dark:bg-bgForm rounded-lg shadow-xl '>
          <h1 className='text-5xl py-10 text-center font-bold text-black dark:text-white'>
            Register
          </h1>
          <hr className='border-gray-700 dark:border-white border-opacity-20' />

          <div className='px-5 sm:px-0 md:py-10 md:px-14 '>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                password: "",
                userType: "",
                confirmpassword: "",
                terms: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const formValues = { ...values };
                delete formValues.confirmpassword;
                delete formValues.terms;
                formValues.userType = Number(formValues.userType);
                registerUser(formValues);
              }}>
              {({ isSubmitting }) => (
                <Form>
                  <section>
                    <div className='sm:grid sm:grid-cols-2 gap-x-10 gap-y-6'>
                      <div className='relative mt-5 lg:mt-0'>
                        <label htmlFor='First Name'>First Name</label>
                        <Field
                          type='text'
                          name='firstName'
                          placeholder='First Name'
                          className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                        />
                        <ErrorMessage
                          className='text-red-400 absolute top-18'
                          name='firstName'
                          component='div'
                        />
                      </div>
                      <div className='relative mt-5 lg:mt-0'>
                        <label htmlFor='lastName'>Last Name</label>

                        <Field
                          type='text'
                          name='lastName'
                          placeholder='Last Name'
                          className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                        />
                        <ErrorMessage
                          className='text-red-400 mb-2 absolute top-18'
                          name='lastName'
                          component='div'
                        />
                      </div>
                      <div className='relative mt-5 lg:mt-0'>
                        <label htmlFor='Email'>Email</label>

                        <Field
                          type='text'
                          name='email'
                          placeholder='Email'
                          className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                        />
                        <ErrorMessage
                          className='text-red-400 absolute top-18'
                          name='email'
                          component='div'
                        />
                      </div>
                      <div className='relative mt-5 lg:mt-0'>
                        <label htmlFor='Email'>Phone</label>

                        <Field
                          type='text'
                          name='phone'
                          placeholder='Phone'
                          className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                        />
                        <ErrorMessage
                          className='text-red-400 absolute top-18'
                          name='phone'
                          component='div'
                        />
                      </div>

                      <div className='relative mt-5 lg:mt-0'>
                        <label htmlFor='Password'>Password</label>

                        <Field
                          type='password'
                          name='password'
                          placeholder='Password'
                          className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                        />
                        <ErrorMessage
                          className='text-red-400 absolute top-18'
                          name='password'
                          component='div'
                        />
                      </div>
                      <div className='relative mt-5 lg:mt-0'>
                        <label htmlFor='Conform password'>
                          Confirm Password
                        </label>

                        <Field
                          type='password'
                          name='confirmpassword'
                          placeholder='Confrrm Password'
                          className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                        />
                        <ErrorMessage
                          className='text-red-400 absolute top-18'
                          name='confirmpassword'
                          component='div'
                        />
                      </div>
                      <div className='relative mt-5 lg:mt-0 col-span-2'>
                        <label htmlFor='userType'>User Types</label>

                        <Field
                          type='select'
                          name='userType'
                          className='mt-2 bg-white dark:bg-opacity-30   focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                          component='select'>
                          <option className='dark:bg-[#69686e]'>Select</option>
                          {usertypes.map((user) => {
                            return (
                              <option
                                key={""}
                                className=' dark:bg-[#69686e] focus:border-gray-0 py-2 px-2 w-full focus:outline-none dark:placeholder-white rounded-md focus:ring-1 focus:ring-purple-600'
                                value={user.value}>
                                {user.label}
                              </option>
                            );
                          })}
                        </Field>
                        <ErrorMessage
                          className='text-red-400 absolute top-18'
                          name='userType'
                          component='div'
                        />
                      </div>
                    </div>
                    <div className='ms:col-span-2'>
                      <div className='flex relative justify-center mt-5 lg:mt-10 p-2 lg:p-0'>
                        <Field
                          type='checkbox'
                          name='terms'
                          className='mt-[0.330rem] rounded-[4px]'
                        />
                        <p className='ml-1  text-xs md:text-base'>
                          I agreed to the
                          <a
                            href=''
                            className='text-purple-600 hover:underline mx-1'>
                            Terms and Conditions
                          </a>
                          governing the use of jobportal
                        </p>
                        <ErrorMessage
                          className='text-red-400 absolute top-5'
                          name='terms'
                          component='div'
                        />
                      </div>
                      <div className='md:max-w-[17rem] mx-auto'>
                        <button
                          type='submit'
                          className='mt-8 py-2 text-center w-full flex justify-center px-4  items-center rounded-lg font-bold text-white  bg-purple-600  focus:shadow-md'
                          disabled={isSubmitting}>
                          Create Account
                        </button>
                      </div>
                    </div>
                  </section>
                </Form>
              )}
            </Formik>
            <p className='text-center  mt-3 md:mt-10'>
              Already a member
              <a
                href=''
                className='text-purple-600 hover:underline ml-2 hover:font-medium'>
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
