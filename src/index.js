import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import registerServiceWorker from './registerServiceWorker';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import './/layouts/css/theme.less'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}
export const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <App/>
        </Provider>
    </LocaleProvider>,
    document.getElementById('root'));
registerServiceWorker();
