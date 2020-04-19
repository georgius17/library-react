import React, {Component} from 'react';
import classes from './Modal.module.css'
import Aux from '../../UI/Aux/Aux';
import Backdrop from './Backdrop';
import CSSTransition from "react-transition-group/CSSTransition";

class Modal extends Component {

    render(){
        const animationTiming = {
            enter: 400,
            exit: 1000
        };

        return (

        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />    
            <CSSTransition
                mountOnEnter 
                unmountOnExit 
                in={this.props.show} 
                timeout={animationTiming}
                classNames={{
                    enter: '',
                    enterActive: classes.ModalOpen,
                    exit: '',
                    exitActive: classes.ModalClosed
                }}> 
            
                <div className={classes.Modal}> 
                    {this.props.children}
                </div>
            </CSSTransition>
        </Aux>
        )
    }
} 

export default Modal;

