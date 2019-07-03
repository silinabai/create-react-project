import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './router/router';
import store from './redux/store/store';
import 'Utils/rem';
import 'Styles/base';

ReactDom.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));
