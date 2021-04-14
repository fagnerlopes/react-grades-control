import React, { useState, useEffect } from "react";
import * as api from "./api/ApiService";
import GradesControl from "./components/GradesControl";
import Header from "./components/Header";
import ModalGrade from "./components/ModalGrade";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";

export default function App() {
  // set the state with Hooks
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };

    // api.getAllGrades().then((grades) => {
    //   setTimeout(() => {
    //     setAllGrades(grades);
    //   }, 2000);
    // });

    getGrades();
  }, []);

  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);

    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade.id === gradeToDelete.id
      );

      // copy the object no changes
      const newsGrades = Object.assign([], allGrades);
      newsGrades[deletedGradeIndex].isDeleted = true;
      newsGrades[deletedGradeIndex].value = 0;

      // set the state with Hooks
      setAllGrades(newsGrades);
    }
  };

  const handlePersist = (grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const handlePersistData = async ({id, newValue }) => {
    const newGrades = Object.assign([], allGrades);

    const gradeToPersist = newGrades.find(grade => grade.id === id);
    gradeToPersist.value = newValue;

    if(gradeToPersist.isDeleted) {
      gradeToPersist.isDeleted = false;
      await api.insertGrade(gradeToPersist);
    } else {
      await api.updateGrade(gradeToPersist);
    }
    setIsModalOpen(false); 
  };

  const handleClose= () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {!isModalOpen && <Navbar />}
      {allGrades.length === 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )};
      {isModalOpen && 
      <ModalGrade
        onSave={handlePersistData}
        onClose={handleClose}
        selectedGrade={selectedGrade}
      />}
    </div>
  );
}
