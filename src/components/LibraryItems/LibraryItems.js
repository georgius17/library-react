import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class LibraryItems extends Component {

  state = {
    data: null
  }

  //save the books to localstorage with every update of this component
  componentDidUpdate(){
    localStorage.setItem('books', JSON.stringify(this.props.books))
  }
  
  render() {
    
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Title", field: "title"},
            { title: "Author", field: "author" },
            { title: "Pages", field: "pages" },
            { title: "Read", field: "status", type: "boolean" },
            { title: "Notes", field: "notes" }
            
          ]}
          
          title=""

          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.props.books;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    this.setState({ }, () => resolve());
                    this.props.onEditBook(data)
                  }
                  resolve()
                }, 1000)
              }),
              onRowDelete: oldData => 
              new Promise ((resolve, reject)=> {
                setTimeout(()=> {
                  {
                    let data = this.props.books;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({ }, () => resolve());
                    this.props.onEditBook(data)
                  }
                  resolve()
                }, 1000);
              })
          }}

          data={this.props.books}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
      
      onEditBook: (updatedBooks) => dispatch(actions.editBook(updatedBooks))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryItems)