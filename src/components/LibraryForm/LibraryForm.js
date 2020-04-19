import React, { Component } from "react";
import Input from '../../UI/Input/Input';
import classes from './LibraryForm.module.css';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class LibraryForm extends Component {

    state = {
        newBook: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Title of your book'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2
                },
                valid: false,
                touched: false
                },
            author: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Author'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            pages: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder:'Number of pages',
                    min:'10',
                    max:'5000'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            status: {
                elementType: 'select',
                elementConfig: {
                options: [
                    {value: 'read', displayValue: 'Read'},
                    {value: 'unread', displayValue: 'Unread'}
                ]
                },
                value: 'unread',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            notes: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your notes about the book'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

     baseState = this.state

     resetForm = () => {
         this.setState(this.baseState);
         this.props.submitted()
     }

    inputChangeHandler = (event, inputID) => {
        const updatedForm = {
            ...this.state.newBook
        };
        const updatedElement = {
            ...updatedForm[inputID]
        };
        updatedElement.value = event.target.value;
        updatedElement.touched= true;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedForm[inputID] = updatedElement;

        let formIsValid = true;

        for (let inputId in updatedForm){
            formIsValid = updatedForm[inputId].valid && formIsValid
        }

        this.setState({newBook: updatedForm, formIsValid: formIsValid});
    }

    checkValidity(value, rules) {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    addBookHandler = (event)=> {
        event.preventDefault();
        let newBookData = {
            title: this.state.newBook.title.value,
            author: this.state.newBook.author.value,
            pages: this.state.newBook.pages.value,
            status: this.state.newBook.status.value,
            notes: this.state.newBook.notes.value
        };
        //send the action to store
        this.props.onAddBook(newBookData)
        //for closing the modal
        this.props.submitted()
    }


    render(){

        let formArray = []
        for (let key in this.state.newBook){
            formArray.push({
                id: key,
                config: this.state.newBook[key]
            })
        }

        let form = (
            <form onSubmit={this.addBookHandler} onReset={()=>this.resetForm()} onLoad={()=>this.resetForm()} >
                {formArray.map(element => (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        validation={element.config.validation}
                        invalid={!element.config.valid}
                        touched={element.config.touched}
                        changed={(event)=> this.inputChangeHandler(event, element.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
                <input className={classes.Reset} type="reset" value="Cancel"></input>
            </form>
        )

        return (
            <div className={classes.FormData} >
                {form}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddBook: (bookData)=> dispatch(actions.addBook(bookData))
    }
}

export default connect(null, mapDispatchToProps)(LibraryForm);