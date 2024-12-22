import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {createClient} from '@supabase/supabase-js';
import {SessionContextProvider} from '@supabase/auth-helpers-react';
import {store} from './state';
import App from './App';
import './utils/i18n';
import './index.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY,
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SessionContextProvider supabaseClient={supabase}>
        <App/>
      </SessionContextProvider>
    </Provider>
  </React.StrictMode>,
);
