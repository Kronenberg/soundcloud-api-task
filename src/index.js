import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from './store/store';

import App from './App';

import SC from 'soundcloud';
import {CLIENT_ID} from './constants';

SC.initialize({
    client_id: CLIENT_ID
});

const store = configureStore();
	  ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
 		</Provider>,
		document.getElementById('root')
		);
		
registerServiceWorker();