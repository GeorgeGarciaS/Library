import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import HeaderComponent from '../components/header/HeaderComponent';
import BookCreate from '../components/crudComponents/book/bookCreate/BookCreate';
import BookListPage from '../components/crudComponents/book/bookList/BookListPage';
import BookEdit from '../components/crudComponents/book/bookUpdate/BookEdit';
import BookDetailPage from '../components/crudComponents/book/bookDetails/BookDetailPage';
import IndexPage from '../components/crudComponents/Index/IndexPage';
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
      console.log(
        `The last navigation action was ${action}`,
        JSON.stringify(this.history, null, 2),
      );
    });
  }
}
const AppRouter = () => (
  <DebugRouter>
    <HeaderComponent />
    <Switch>
      <Route exact path="/500" component={InternalServerError} />
      <Route exact path="/error" component={Errors} />
      <Route exact path="/books/create" component={BookCreate} />
      <Route exact path="/books/delete/:id" component={NotImplemented} />
      <Route path="/books/edit/:id" component={BookEdit} />
      <Route path="/books/:id" component={BookDetailPage} />
      <Route exact path="/books" component={BookListPage} />
      <Route exact path="/authors/create" component={NotImplemented} />
      <Route exact path="/authors" component={NotImplemented} />
      <Route exact path="/genres/create" component={NotImplemented} />
      <Route exact path="/genres" component={NotImplemented} />
      <Route exact path="/" component={IndexPage} />
      <Route component={() => <Redirect to="/" />} />
    </Switch>
  </DebugRouter>
);

export default AppRouter;
