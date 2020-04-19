import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import './App.css';
import BooksPage from './containers/BooksPage/BooksPage';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  //load "default" books if the localstorage is empty
  componentDidMount(){
    const localBooks = localStorage.getItem('books');
    if (!localBooks){
      let book1 = {
        title: 'Robinson Crusoe',
        author: 'Daniel Defoe',
        pages: '252',
        status: true,
        notes: 'very great book'
      };
      let book2 = {
        title: 'The Old Man and the Sea',
        author: 'Ernest Hemingway',
        pages: '127',
        status: true,
        notes: 'such an inspirative book'
      };

      this.props.onAddBook(book1)
      this.props.onAddBook(book2)
      localStorage.setItem('books', JSON.stringify(this.props.books))
    } else {
      this.props.onFetchBooks(JSON.parse(localBooks))
    }

  }

  render(){

    return (
      <Layout>
        <BooksPage />
      </Layout>
    )
  }
} 

const mapStateToProps = state => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAddBook: (bookData) => dispatch(actions.addBook(bookData)),
      onFetchBooks:(storedBooks)=> dispatch (actions.fetchBooks(storedBooks))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
