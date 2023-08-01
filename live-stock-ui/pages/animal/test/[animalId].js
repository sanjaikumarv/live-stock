import Router from "next/router";

import React from "react";
import AnimalTestList from "../../../components/Farm/animalTest/AnimalTestList";

export default function index() {
  return (
    <div>
      <AnimalTestList />
    </div>
  );
}
