import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();