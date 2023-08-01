import useGet from "../../../lib/hooks/useGet";
import AnimalForm from "./AnimalForm";
import Router from "next/router";
import { useState } from "react";
import useDelete from "../../../lib/hooks/useDelete";

export default function AnimalList() {
  const [animals = [], _, __, animalRefetch] = useGet("/api/animal", {
    noAert: true,
  });
  const [animalPopup, setAnimalPopup] = useState({
    view: false,
    selectedAnimal: null,
  });
  const [deleteAnimal] = useDelete(`/api/animal`, {
    afterSuccess: animalRefetch,
  });
  return (
    <div className='px-4 sm:px-6 lg:px-8 pt-20 relative '>
      <div className='max-w-5xl mx-auto'>
        <div className='sm:flex sm:items-center '>
          <div className='sm:flex-auto'>
            <h1 className='text-xl font-semibold text-gray-900'>Animals</h1>
            <p className='mt-2 text-sm text-gray-700'>
              A list of all the animals in your farm.
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
            <button
              onClick={() =>
                setAnimalPopup({
                  view: true,
                })
              }
              type='button'
              className='inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white'>
              Create Animal
            </button>
          </div>
        </div>
        {animals.length > 0 ? (
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-black md:rounded-lg'>
                  <table className='min-w-full rounded-md border divide-y divide-gray-300'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Animal Id
                        </th>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6'>
                          Name
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Type
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Colour
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Date
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Description
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {animals.map((animal) => (
                        <tr key={animal._id}>
                          <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                            {animal.animalId}
                          </td>
                          <td className='whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6'>
                            {animal.name}
                          </td>
                          <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                            {animal.type}
                          </td>
                          <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                            {animal.colour}
                          </td>
                          <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                            {animal.date.slice(0, 10)}
                          </td>
                          <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                            {animal.description}
                          </td>

                          <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6'>
                            <button
                              onClick={() => {
                                setAnimalPopup({
                                  view: true,
                                  selectedAnimal: animal,
                                });
                              }}>
                              <svg
                                className='w-4 h-4 mr-2'
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
                                deleteAnimal(animal._id);
                              }}>
                              <svg
                                className='w-4 h-4 mr-2'
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
                            <button
                              onClick={() => {
                                Router.push(`/animal/test/${animal._id}`);
                              }}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                />
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
          <div className='text-center mt-10'>Animal list is empty</div>
        )}

        <div className='absolute top-0 left-0 w-full items-center justify-center bg-[#a3a3a3e1]'>
          {animalPopup.view && (
            <AnimalForm
              setAnimalPopup={setAnimalPopup}
              animalPopup={animalPopup}
              animalsCount={animals.length + 1}
              animalRefetch={animalRefetch}
            />
          )}
        </div>
      </div>
    </div>
  );
}
