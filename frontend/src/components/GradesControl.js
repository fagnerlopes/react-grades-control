import React from "react";
import Action from "./Action";

export default function GradesControl({ grades, onDelete, onPersist }) {
  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });

      currentSubject = grade.subject;
      currentGrades = [];
    }

    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }

    currentGrades.push(grade);
  });

  // após o loop inserir o último elemento
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  });

  const handleActionClick = (id, type) => {
    console.log(id);
    console.log(type);
  }

  return (
    <div className="container">
      {tableGrades.map(({id, grades}) => {
        return (
          <table className="striped" key={id}>
            <thead>
              <tr>
                <th style={{width: '22.5%'}}>Aluno</th>
                <th style={{width: '22.5%'}}>Disciplina</th>
                <th style={{width: '22.5%'}}>Avaliação</th>
                <th style={{width: '22.5%'}}>Nota</th>
                <th style={{width: '10%'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>                        
                        <Action onActionClick={handleActionClick} id={id} type={isDeleted ? 'add' : 'edit'}/>
                        {!isDeleted && <Action onActionClick={handleActionClick} id={id} type="delete"/>}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot></tfoot>
          </table>
        );
      })}
    </div>
  );
}
