import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['CONTENT-TYPE'] =  'application/json';

axios.interceptors.request.use(requestConfig => {
    console.log('requestConfig:', requestConfig);
    return requestConfig;
}, err => {
    console.log('err: ', err);
    return Promise.reject(err);
});

axios.interceptors.response.use(responseConfig => {
    console.log('requestConfig:', responseConfig);
    return responseConfig;
}, err => {
    console.log('err: ', err);
    return Promise.reject(err);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
