import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/app/App";
import "bootstrap/dist/css/bootstrap.min.css"
import "aos/dist/aos.css";
import "./global.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
