import Router from "next/router";

import React, { useEffect, useMemo, useState } from "react";
import useGet from "../../../lib/hooks/useGet";
import AnimalTestForm from "./AnimalTestForm";

import useDelete from "../../../lib/hooks/useDelete";
import useLazyGet from "../../../lib/hooks/useLazyGet";
import { usePopup } from "../../../lib/contexts/PopupContext";

export default function AnimalTestList() {
  const { showSuccess } = usePopup();

  const animalId = useMemo(() => Router.query.animalId, [Router.query]);
  const [animalTestPopup, setAnimalTestPopup] = useState({
    view: false,
    selectedAnimalTest: null,
  });

  const [animalFetch, { data: animalData = {} }] = useLazyGet(
    `/api/animal/${animalId}`,
    {
      noAlert: true,
    }
  );

  const [deleteAnimalTest] = useDelete(`/api/animal/test`, {
    afterSuccess: (res) => {
      showSuccess(res.data.message);
      animalRefetch();
    },
  });
  const [fetchAnimalTests, { refetch: animalRefetch, data: animalTests = [] }] =
    useLazyGet(`/api/animal/tests/${animalId}`);

  useEffect(() => {
    if (animalId) {
      fetchAnimalTests();
      animalFetch();
    }
  }, [animalId]);

  return (
    <div className='px-4 sm:px-6 lg:px-8  pt-20 relative'>
      <div className='max-w-5xl mx-auto'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-xl font-semibold text-gray-900'>
              {animalData.name} - Tests
            </h1>
            <p className='mt-2 text-sm text-gray-700'>
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
            <button
              onClick={() => setAnimalTestPopup({ view: true })}
              type='button'
              className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'>
              Create Animal Test
            </button>
          </div>
        </div>
        {animalTests.length > 0 ? (
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6'>
                          Test Name
                        </th>

                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Test Date And TIme
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Result
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {animalTests.map((animalTest) => (
                        <tr key={animalTest._id}>
                          <td className='whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6'>
                            {animalTest.testName}
                          </td>
                          <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                            {animalTest.testDateTime.slice(0, 10)}
                          </td>
                          <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                            {animalTest.result}
                          </td>
                          <td className='relative whitespace-nowrap text-center py-4 pl-3 pr-4 text-sm font-medium sm:pr-6'>
                            <button
                              onClick={() => {
                                setAnimalTestPopup({
                                  view: true,
                                  selectedAnimalTest: animalTest,
                                });
                              }}>
                              <svg
                                className='w-4 h-4 ml-3'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                deleteAnimalTest(animalTest._id);
                              }}>
                              <svg
                                className='w-4 h-4 ml-3'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center mt-10'>Animal Test List is empty</div>
        )}
      </div>
      <div className='absolute top-0 left-0 w-full items-center justify-center bg-[#a3a3a3e1]'>
        {animalTestPopup.view && (
          <AnimalTestForm
            animalTestPopup={animalTestPopup}
            setAnimalTestPopup={setAnimalTestPopup}
            animalRefetch={animalRefetch}
          />
        )}
      </div>
    </div>
  );
}
