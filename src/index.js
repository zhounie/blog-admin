import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css';

import Layout from './layout/index'
import Menu from './page/menu'
import Blog from './page/Blog/blog'
import addBlog from './page/Blog/add'
import Book from './page/book'

ReactDOM.render(
  <HashRouter>
    <Switch>
        <Route path="/">
            <Layout>
                <Route path="/menu" component={Menu}></Route>
                <Route path="/blog" component={Blog}></Route>
                <Route path="/book" component={Book}></Route>
                <Route path="/addBlog" component={addBlog}></Route>
            </Layout>
        </Route>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);

reportWebVitals();
