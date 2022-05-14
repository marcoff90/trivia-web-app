import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import Layout from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Layout>
      <App/>
    </Layout>
);

