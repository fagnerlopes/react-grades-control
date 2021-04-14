import React, { useState, useEffect } from 'react';
import * as api from './api/ApiService';
export default function App() { 
  const testApi = async () => {
    const result = await api.getAllGrades();
    console.log(result);
  };
  testApi();
  return (    
    <div>
      Teste
    </div>
  );
}
