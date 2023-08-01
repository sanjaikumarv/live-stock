import { Form, Formik } from "formik";
import React, { useMemo } from "react";
import { SelectInput, TextInput } from "../../Common/Widgets";
import Router from "next/router";
import usePost from "../../../lib/hooks/usePost";
import usePut from "../../../lib/hooks/usePut";
import { usePopup } from "../../../lib/contexts/PopupContext";
import * as Yup from "yup";
const animalTestSchema = Yup.object().shape({
  testDateTime: Yup.string().required("Required"),
  testName: Yup.string().required("Required"),
  result: Yup.string().required("Required"),
});

export default function AnimalTestForm({
  setAnimalTestPopup,
  animalTestPopup,
  animalRefetch,
}) {
  const { showSuccess } = usePopup();
  const RESULT = [
    { value: "", label: "Select" },
    { value: "POSITIVE", label: "Positive" },
    { value: "NEGATIVE", label: "Negative" },
    { value: "INVALID", label: "Invalid" },
  ];

  const selectedTestAnimal = useMemo(
    () => animalTestPopup.selectedAnimalTest,
    [animalTestPopup]
  );

  const [createAnimalTest] = usePost(
    `/api/animal/test/${Router.query.animalId}`,
    {
      afterSuccess: (res) => {
        showSuccess(res.data.message);
        animalRefetch();
        setAnimalTestPopup({ view: false });
      },
    }
  );

  const [updateTestAnimal] = usePut(
    `/api/animal/test/${selectedTestAnimal?._id}`,
    {
      afterSuccess: (res) => {
        showSuccess(res.data.message);
        animalRefetch();
        setAnimalTestPopup({ view: false });
      },
    }
  );

  return (
    <div className='m-10 px-8 gap-5 space-y-5 md:space-y-0 max-w-5xl mx-auto'>
      <Formik
        initialValues={{
          testDateTime: selectedTestAnimal?.testDateTime.slice(0, 10) || "",
          testName: selectedTestAnimal?.testName || "",
          result: selectedTestAnimal?.result || "",
        }}
        validationSchema={animalTestSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
          if (selectedTestAnimal) {
            return updateTestAnimal(values);
          }
          createAnimalTest(values);
        }}>
        {({ isSubmitting }) => (
          <Form className='space-y-8  sm:col-span-3 shadow-lg rounded-xl dark:bg-bgForm bg-sandle-100 border  dark:border-0 p-5 sm:p-10 pt-10 sm:grid'>
            <button
              onClick={() => setAnimalTestPopup({ view: false })}
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
            <h1 className='text-center text-2xl font-bold'>Animal Test</h1>
            <div className='sm:grid mt-5 grid-cols-2 gap-x-8'>
              <div className='pt-5 col-span-1'>
                <div className='w-full'>
                  <TextInput
                    name='testName'
                    label='Test Name'
                    placeholder='Test Name'
                  />
                </div>
              </div>

              <div className='pt-5 col-span-1'>
                <div className='w-full'>
                  <TextInput
                    name='testDateTime'
                    label='Test Date And Time'
                    placeholder='Test Date And Time'
                    type='date'
                  />
                </div>
              </div>
              <div className='pt-5 sm:pt-0 col-span-2'>
                <div className='w-full'>
                  <SelectInput label='Result' options={RESULT} name='result' />
                </div>
              </div>
            </div>
            <div className='flex justify-center py-6'>
              <button
                type='submit'
                className='bg-purple-600 px-6 text-base font-bold w-full sm:w-32  text-white py-1.5 rounded-md'>
                {selectedTestAnimal ? "Update" : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
