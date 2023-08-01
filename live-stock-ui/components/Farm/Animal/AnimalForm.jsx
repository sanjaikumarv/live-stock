import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useCallback, useState } from "react";

import Router from "next/router";
import axios from "axios";
import useGet from "../../../lib/hooks/useGet";
import usePost from "../../../lib/hooks/usePost";
import usePut from "../../../lib/hooks/usePut";
import useDelete from "../../../lib/hooks/useDelete";
import LittleLoader from "../../Common/LittleLoader";
import useHttpClient from "../../../lib/hooks/useHttpClient";
import { SelectInput, TextInput } from "../../Common/Widgets";
import { usePopup } from "../../../lib/contexts/PopupContext";
import { useMemo } from "react";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  colour: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  animalId: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const ANIMAl_TYPE = [
  { value: "", label: "Select" },
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
export default function AnimalForm({
  setAnimalPopup,
  animalPopup,
  animalsCount,
  animalRefetch,
}) {
  const { showSuccess } = usePopup();

  const selectedAnimal = useMemo(
    () => animalPopup.selectedAnimal,
    [animalPopup]
  );
  const [Animal] = useGet("/api/animal");

  const [createAnimal] = usePost("/api/animal", {
    afterSuccess: (res) => {
      showSuccess(res.data.message);
      animalRefetch();
      setAnimalPopup({
        view: false,
      });
    },
  });
  const [updateAnimal] = usePut(`/api/animal/${selectedAnimal?._id}`, {
    afterSuccess: (res) => {
      showSuccess(res.data.message);
      animalRefetch();
      setAnimalPopup({
        view: false,
      });
    },
  });

  return (
    <div className='m-10 px-8 gap-5 space-y-5 md:space-y-0 max-w-5xl mx-auto'>
      <Formik
        initialValues={{
          name: selectedAnimal?.name || "",
          type: selectedAnimal?.type || "",
          colour: selectedAnimal?.colour || "",
          date: selectedAnimal?.date.slice(0, 10) || "",
          animalId: animalsCount,
          description: selectedAnimal?.description || "",
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          if (selectedAnimal) {
            return updateAnimal(values);
          }
          createAnimal(values);
        }}>
        {({ isSubmitting }) => (
          <Form className='space-y-8  sm:col-span-3 shadow-lg rounded-xl dark:bg-bgForm bg-sandle-100 border  dark:border-0 p-5 sm:p-10 pt-10 sm:grid'>
            <button
              onClick={() => setAnimalPopup({ view: false })}
              className='flex justify-end'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M18 6L6 18'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'></path>
                <path
                  d='M6 6L18 18'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'></path>
              </svg>
            </button>
            <h1 className='text-center text-2xl font-bold'>Animal</h1>
            <div className='sm:grid mt-5 grid-cols-2 gap-x-8'>
              <div className='pt-5 col-span-1'>
                <div className='w-full'>
                  <TextInput name='name' label=' Name' placeholder='Name' />
                </div>
              </div>
              <div className='pt-5 col-span-1'>
                <div className='w-full'>
                  <TextInput
                    name='animalId'
                    label=' Animal id'
                    placeholder='Animal id'
                    disabled
                  />
                </div>
              </div>
              <div className=' col-span-1'>
                <div className='w-full'>
                  <SelectInput name='type' label='Type' options={ANIMAl_TYPE} />
                </div>
              </div>
              <div className='pt-5 col-span-1'>
                <div className='w-full'>
                  <TextInput
                    name='colour'
                    label='Colour'
                    placeholder='Colour'
                  />
                </div>
              </div>
              <div className=' pt-5 col-span-1'>
                <div className='w-full'>
                  <TextInput
                    name='date'
                    label='Date'
                    placeholder='Date'
                    type='date'
                  />
                </div>
              </div>

              <div className='pt-5 col-span-1'>
                <div className='w-full'>
                  <TextInput
                    name='description'
                    label='Description'
                    placeholder='Description'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center py-6'>
              <button
                type='submit'
                className='bg-purple-600 px-6 text-base font-bold w-full sm:w-32  text-white py-1.5 rounded-md'>
                {selectedAnimal ? "Update" : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
