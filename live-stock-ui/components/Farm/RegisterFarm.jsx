import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCallback, useState, useEffect } from "react";

import { useAuth } from "../../lib/contexts/AuthContext";
import useHttpClient from "../../lib/hooks/useHttpClient";
import useGet from "../../lib/hooks/useGet";
import usePost from "../../lib/hooks/usePost";
import { usePopup } from "../../lib/contexts/PopupContext";

import Router from "next/router";

import { MultiSelectInput, TextAreaInput, TextInput } from "../Common/Widgets";
import LittleLoader from "../Common/LittleLoader";

const farmRegisterSchema = Yup.object().shape({
  farmName: Yup.string().required("Required"),
  picName: Yup.string().required("Required"),
  date: Yup.date().nullable().required("Required"),
  postCode: Yup.string().required("Required"),
  picPhone: Yup.string().required("Required"),
  address1: Yup.string().required("Required"),
  address2: Yup.string().required("Required"),
  picEmail: Yup.string().email("Invalid email").required("Required"),
  animalType: Yup.array()
    .min(1, "Alteast 1 type Required")
    .required("Required"),
  password: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
});

const ANIMAl_TYPE = [
  {
    label: "Goat",
    value: 1,
  },
  {
    label: "Chicken",
    value: 2,
  },
  {
    label: "Cow",
    value: 3,
  },
];

export default function RegisterFarm() {
  const [farm = {}] = useGet("/api/farm", {
    noAlert: true,
  });
  const [createFarm] = usePost("/api/farm", {
    afterSuccess: () => {
      Router.push("/user/login");
    },
  });
  console.log(farm);
  return (
    <div className='m-10 max-w-5xl mx-auto px-8 space-y-5 md:space-y-0 '>
      <Formik
        initialValues={{
          farmName: "",
          picName: "",
          date: "",
          postCode: "",
          state: "",
          city: "",
          picPhone: "",
          address1: "",
          address2: "",
          picEmail: "",
          animalType: [],
          password: "",
        }}
        validationSchema={farmRegisterSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          createFarm(values);
        }}>
        {({ isSubmitting }) => (
          <Form className='space-y-8 sm:col-span-3 shadow-lg rounded-xl dark:bg-bgForm bg-sandle-100 border dark:border-0 p-5 sm:p-10 pt-10 sm:grid'>
            <div className=''>
              <div className='text-3xl font-bold text-center'>
                Register Your Farm
              </div>
              <div className='sm:grid mt-5 grid-cols-2 gap-x-8'>
                <div className='gap-4 pt-5 col-span-1'>
                  <div className='w-full'>
                    <TextInput
                      name='farmName'
                      label='Farm Name'
                      placeholder='Farm Name'
                    />
                  </div>
                </div>
                <div className='pt-5 col-span-1'>
                  <div className='w-full'>
                    <TextInput
                      name='picName'
                      label='Pic Name'
                      placeholder='Pic Name'
                    />
                  </div>
                </div>
                <div className='pt-5 sm:pt-4'>
                  <div className='w-full'>
                    <TextInput
                      type='date'
                      name='date'
                      className='rounded-md h-9 sm:mt-2 border-gray-300 w-full'
                      label='Date'
                    />
                  </div>
                </div>
                <div className='pt-5'>
                  <div className='w-full'>
                    <TextInput
                      name='postCode'
                      label='Post Code'
                      placeholder='Post Code'
                    />
                  </div>
                </div>

                <div className=' pt-3'>
                  <div className='w-full'>
                    <TextAreaInput
                      name='address1'
                      label='Address 1'
                      placeholder='Address 1'
                    />
                  </div>
                </div>
                <div className=' pt-2 sm:pt-3'>
                  <div className='w-full'>
                    <TextAreaInput
                      name='address2'
                      label='Address 2'
                      placeholder='Address 2'
                    />
                  </div>
                </div>

                <div className='pt-5 sm:pt-4'>
                  <div className='w-full'>
                    <TextInput
                      name='picPhone'
                      label='Pic Phone'
                      placeholder='Pic Phone'
                    />
                  </div>
                </div>
                <div className=' pt-5'>
                  <div className='w-full'>
                    <TextInput name='city' label='City' placeholder='City' />
                  </div>
                </div>

                <div className='pt-5'>
                  <div className='w-full'>
                    <TextInput
                      name='picEmail'
                      label='Pic Email'
                      placeholder='Pic email'
                    />
                  </div>
                </div>
                <div className=' pt-5'>
                  <div className='w-full'>
                    <TextInput
                      name='password'
                      type='password'
                      label='Password'
                      placeholder='Password'
                    />
                  </div>
                </div>
                <div className='gap-4  pt-3'>
                  <div className='w-full'>
                    <TextInput name='state' placeholder='State' label='State' />
                  </div>
                </div>
                <div className='pt-5 sm:pt-4 col-span-1'>
                  <label htmlFor='Animal Type'>Animal Type</label>
                  <div className='w-full'>
                    <MultiSelectInput
                      label='Animal Type'
                      name='animalType'
                      options={ANIMAl_TYPE}
                    />
                  </div>
                </div>
              </div>
              <div className='flex justify-center py-5 mt-10 sm:mt-5'>
                <button
                  type='submit'
                  className='bg-purple-600 px-6 text-base font-bold w-full sm:w-36  text-white py-1.5 rounded-md'>
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
