import './App.css'
import React, {MouseEventHandler} from 'react';
import { AppProps } from './types';
import UnitDisplay from './components/UnitDisplay';

function App({ onClick, text }:AppProps) {

  return (
    <UnitDisplay />
  )
}

export default App
