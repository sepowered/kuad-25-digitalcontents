import React from 'react';
import { createRoot } from 'react-dom/client';
import BandiApp from './components/BandiApp';
import './style.scss';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<BandiApp />);
}
