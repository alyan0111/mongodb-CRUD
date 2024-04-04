// App.js

import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './login';
import FormData from './formDta';
import UpdateForm from './updateform';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
        <Route path="/" element={<Login/>} />
        <Route path="/formData" element={<FormData/>} />
        <Route path="/update/:id" element={<UpdateForm/>} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
