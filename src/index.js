import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import  {store, persistor} from './redux/store';

import 'react-quill/dist/quill.snow.css';
import './styles/styles.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </BrowserRouter>

    </Provider>,
    document.getElementById('app')
)







