import React from 'react'
import { HashRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import './App.css';

import Layout from './layout/index'
import Menu from './page/menu'
import Blog from './page/Blog/blog'
import AddBlog from './page/Blog/add'
import Book from './page/book'
import Login from './page/login'


function App() {
  return (
    <HashRouter>
      <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/">
              <Layout>
                  <Route path="/menu" component={
                    (props) => {
                      return sessionStorage.getItem('token') ? <Menu {...props} /> : <Redirect to={{
                        pathname: '/login'
                      }} />
                    }
                  }></Route>
                  <Route path="/blog" component={
                    (props) => {
                      return sessionStorage.getItem('token') ? <Blog {...props} /> : <Redirect to={{
                        pathname: '/login'
                      }} />
                    }
                  }></Route>
                  <Route path="/book" component={
                    (props) => {
                      return sessionStorage.getItem('token') ? <Book {...props} /> : <Redirect to={{
                        pathname: '/login'
                      }} />
                    }
                  }></Route>
                  <Route path="/addBlog/:id" component={
                    (props) => {
                      return sessionStorage.getItem('token') ? <AddBlog {...props} /> : <Redirect to={{
                        pathname: '/login'
                      }} />
                    }
                  }></Route>
              </Layout>
          </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
