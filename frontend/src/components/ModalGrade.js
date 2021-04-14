import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import * as api from '../api/ApiService';

ReactModal.setAppElement('#root');

export default function ModalGrade({onSave, onClose, selectedGrade}) {
  const {id, student, subject, value, type} = selectedGrade;
  const [gradeValue, setGradeValue] = useState(value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    }

    getValidation();    
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;
    if(gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(`O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`);
      return;
    }
    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

  const handleKeyDown = (event) => {
    if(event.key === 'Escape') {
      onClose(null);
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id,
      newValue: gradeValue,
    }
    onSave(formData);
  };

  const handleGradeChange = (event) => {
    const gradeInputValue = +event.target.value;
    setGradeValue(gradeInputValue);
  };

  const handleModalClose = () => {
    onClose(null);
  }
  
  return (
    <div style={{marginTop: '25px'}}>
      <ReactModal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de notas</span>
          <button className="waves-effect waves-lights btn red dark-4" onClick={handleModalClose}>X</button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className='inputField'>
            <label className='active' htmlFor='inputName'>
              Nome do aluno:
            </label>
            <input id='inputName' type='text' value={student} readOnly />            
          </div>
          <div className='inputField'>
            <label className='active' htmlFor='inputSubject'>
              Disciplina:
            </label>
            <input id='inputSubject' type='text' value={subject} readOnly />            
          </div>
          <div className='inputField'>
            <label className='active' htmlFor='inputType'>
              Tipo de avaliação:
            </label>
            <input id='inputType' type='text' value={type} readOnly />            
          </div>
          <div className='inputField'>
            <label className='active' htmlFor='inputGrade'>
              Nota:
            </label>
            <input 
              id='inputGrade'
              type="number" 
              min={gradeValidation.minValue} 
              max={gradeValidation.maxValue} 
              step='1'
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
            />            
          </div>
          <div style={styles.flexRow, styles.flexStart}>
            <button 
            className="waves-effect waves-lights btn"
            disabled={errorMessage.trim() !== ''}
            >
              Salvar
            </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </ReactModal>
    </div>
  )
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.3rem',
    marginBottom: '25px',
  },
  flexStart: {
    justifyContent: 'flex-start'
  },
  errorMessage: {
    marginLeft: '20px', 
    color: 'red',
    fontWeigth: 'bold',
  }
  
}
