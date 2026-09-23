'use client'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import style from './Modal.module.css'
import sprite from '/icons.svg?no-inline'

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
    children: React.ReactElement
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {

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
        <div className={style.modalContainer} onClick={(e) => e.stopPropagation()}>
            <svg className={style.closeIcon} width={28} height={28} onClick={() => onClose()}>
                <use href={`${sprite}#icon-x`}></use>
            </svg>
            
            { children }
        </div>
    </div>, 
    modalRoot
    );
}

export default Modal
