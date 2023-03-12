import { bar } from './foo';
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return <div>bar: {bar}</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
