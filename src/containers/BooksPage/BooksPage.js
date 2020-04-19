import React,{ Component } from 'react';
import Aux from '../../UI/Aux/Aux';
import LibraryForm from '../../components/LibraryForm/LibraryForm'
import Modal from '../../UI/Modal_Backdrop/Modal';
import Button from '../../UI/Button/Button';
import classes from './BooksPage.module.css';
import LibraryItems from '../../components/LibraryItems/LibraryItems';

class BooksPage extends Component {

    state = {
        modalIsOpen: false,
        showBlock: false,
        resetForm: false
      };
    
    showModal = () => {
        this.setState({ modalIsOpen: true, resetForm: false });
        console.log('Show modal')
      };
    
    closeModal = () => {
        this.setState({ modalIsOpen: false, resetForm: true });
        console.log('close modal');
      };

    render(){
        return (
            <Aux>
                <Modal show={this.state.modalIsOpen} modalClosed={this.closeModal} >
                    <LibraryForm submitted={this.closeModal}  />
                </Modal>
                <div className={classes.newButton} >
                    <Button btnType="Success" clicked={this.showModal}>Add new book</Button>
                </div>
                <LibraryItems />
            </Aux>
        )
    }
}

export default BooksPage