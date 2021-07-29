import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
// errors
import InternalServerError from '../components/errorHandlingComponents/InternalServerError';
import Errors from '../components/errorHandlingComponents/Errors';
// header
import HeaderComponent from '../components/header/HeaderComponent';
// index
import IndexPage from '../components/crudComponents/index/IndexPage';
// book
import BookCreate from '../components/crudComponents/create/book/BookCreate';
import BookListPage from '../components/crudComponents/list/book/BookListPage';
import BookUpdate from '../components/crudComponents/update/book/BookUpdate';
import BookDetailPage from '../components/crudComponents/read/book/BookDetailPage';
import BookDelete from '../components/crudComponents/delete/book/BookDelete';
// author
import AuthorListPage from '../components/crudComponents/list/author/AuthorListPage';
import AuthorDetailPage from '../components/crudComponents/read/author/AuthorDetailPage';
import AuthorDelete from '../components/crudComponents/delete/author/AuthorDelete';
import AuthorUpdate from '../components/crudComponents/update/author/AuthorUpdate';
import AuthorCreate from '../components/crudComponents/create/author/AuthorCreate';
// genre
import GenreDetailPage from '../components/crudComponents/read/genre/GenreDetailPage';
import GenreCreate from '../components/crudComponents/create/genre/GenreCreate';
import GenreListPage from '../components/crudComponents/list/genre/GenreListPage';
import GenreUpdate from '../components/crudComponents/update/genre/GenreUpdate';
import GenreDelete from '../components/crudComponents/delete/genre/GenreDelete';

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
      {/* Book Routes */}
      <Route exact path="/book/create" component={BookCreate} />
      <Route exact path="/book/delete/:id" component={BookDelete} />
      <Route path="/book/edit/:id" component={BookUpdate} />
      <Route path="/book/:id" component={BookDetailPage} />
      <Route exact path="/book" component={BookListPage} />
      {/* Author Routes */}
      <Route exact path="/author/create" component={AuthorCreate} />
      <Route exact path="/author/delete/:id" component={AuthorDelete} />
      <Route path="/author/edit/:id" component={AuthorUpdate} />
      <Route path="/author/:id" component={AuthorDetailPage} />
      <Route exact path="/author" component={AuthorListPage} />
      {/* Genre Routes */}
      <Route exact path="/genre/create" component={GenreCreate} />
      <Route exact path="/genre/delete/:id" component={GenreDelete} />
      <Route path="/genre/edit/:id" component={GenreUpdate} />
      <Route path="/genre/:id" component={GenreDetailPage} />
      <Route exact path="/genre" component={GenreListPage} />
      {/* Home Route */}
      <Route exact path="/home" component={IndexPage} />
      <Route component={() => <Redirect to="/home" />} />
    </Switch>
  </DebugRouter>
);

export default AppRouter;
