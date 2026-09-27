'use client'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import style from './Modal.module.css'
import sprite from '/icons.svg?no-inline'

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
    /** id of the modal title, announced by screen readers */
    labelledBy?: string;
    children: React.ReactElement
}

const Modal = ({isOpen, onClose, labelledBy, children}: ModalProps) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") onClose();
        }

        if(isOpen){
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, onClose]);

    if(!isOpen) return null;

    const modalRoot = document.querySelector('#modal-root');
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
    <div className={style.backdrop} onClick={() => onClose()}>
        <div className={style.modalContainer} role='dialog' aria-modal='true' aria-labelledby={labelledBy} onClick={(e) => e.stopPropagation()}>
            <button type='button' className={style.closeButton} aria-label='Close' onClick={() => onClose()}>
                <svg width={28} height={28} aria-hidden='true'>
                    <use href={`${sprite}#icon-x`}></use>
                </svg>
            </button>
            
            { children }
        </div>
    </div>, 
    modalRoot
    );
}

export default Modal
