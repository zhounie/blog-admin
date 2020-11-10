import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';

import Layout from './layout/index'
import Menu from './page/menu'
import Blog from './page/Blog/blog'
import addBlog from './page/Blog/add'
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
                    () => {
                      return sessionStorage.getItem('token') ? <Menu /> : <Redirect to={{
                        pathname: '/login'
                      }} />
                    }
                  }></Route>
                  <Route path="/blog" component={
                    () => {
                      return sessionStorage.getItem('token') ? <Blog /> : <Redirect to={{
                        pathname: '/login'
                      }} />
                    }
                  }></Route>
                  <Route path="/book" component={
                    () => {
                      return sessionStorage.getItem('token') ? <Book /> : <Redirect to={{
                        pathname: '/login'
                      }} />
                    }
                  }></Route>
                  <Route path="/addBlog/:id" component={
                    () => {
                      return sessionStorage.getItem('token') ? <addBlog /> : <Redirect to={{
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
