import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {Auth0Provider} from '@auth0/auth0-react';
import './index.css';
import {store} from './state';
import App from './App';
import './utils/i18n';

window.onload = () => {
  if (window.devicePixelRatio !== 1) {
    document.body.style.transform = 'scale(1)';
    document.body.style.transformOrigin = 'top left';
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: process.env.REACT_APP_AUTH_REDIRECT_URI,
      }}
    >
      <Provider store={store}>
        <App/>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);
