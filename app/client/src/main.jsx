import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';

import { RouterProvider } from 'react-router-dom';
import router from './router';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
