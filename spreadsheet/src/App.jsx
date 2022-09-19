import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.less';

function App() {
  return (
    <div className={styles.wrapper}>App</div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
