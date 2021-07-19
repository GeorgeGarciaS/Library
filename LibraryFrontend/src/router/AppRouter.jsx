import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import AddBook from '../components/crudComponents/AddBook';
import Book from '../components/crudComponents/Book';
import EditBook from '../components/crudComponents/EditBook';
import BooksList from '../components/crudComponents/BooksList';
import IndexList from '../components/crudComponents/IndexList';
import InternalServerError from '../components/errorHandlingComponents/InternalServerError';
import Errors from '../components/errorHandlingComponents/Errors';
import NotImplemented from '../components/errorHandlingComponents/NotImplemented';

class DebugRouter extends BrowserRouter {
  constructor(props) {
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null, 2));
    this.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`,
      );
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
    });
  }
}
const AppRouter = () => (
  <DebugRouter>
    <div className="main-content">
      <HeaderComponent />
      <Switch>
        <Route exact path="/500" component={InternalServerError} />
        <Route exact path="/error" component={Errors} />
        <Route exact path="/books/create" component={AddBook} />
        <Route exact path="/books/delete/:id" component={NotImplemented} />
        <Route path="/books/edit/:id" component={EditBook} />
        <Route path="/books/:id" component={Book} />
        <Route exact path="/books" component={BooksList} />
        <Route exact path="/authors" component={NotImplemented} />
        <Route exact path="/genres" component={NotImplemented} />
        <Route exact path="/" component={IndexList} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  </DebugRouter>
);

export default AppRouter;
