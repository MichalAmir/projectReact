import { useState } from 'react';
import LoginForm from '../src/loginComponent';
import  InputWithIcon  from '../src/textField';
import styled from 'styled-components';
import './styles.css';

function App() {
  return (
    <>
    <InputWithIcon />
      <LoginForm />    
    </>
  );
}

export default App;
