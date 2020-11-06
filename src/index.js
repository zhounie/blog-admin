import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css';

import Layout from './layout/index'
import Menu from './page/menu'
import Blog from './page/blog'
import Book from './page/book'

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
        <Switch>
            <Route path="/">
                <Layout>
                    <Route path="/menu" component={Menu}></Route>
                    <Route path="/blog" component={Blog}></Route>
                    <Route path="/book" component={Book}></Route>
                </Layout>
            </Route>
        </Switch>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
