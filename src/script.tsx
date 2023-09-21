import React from 'react';
import { createRoot } from 'react-dom/client';
import './common.css';
import { App } from './Components/App/App';

createRoot(document.getElementById('root')!).render(<App />);