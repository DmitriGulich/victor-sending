import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

const modalRoot = document.getElementById( 'modal' );

const Modal = (props) => {
    const { children } = props;

    let element = document.createElement( 'div' );

    useEffect(() => {
        modalRoot.appendChild(element);

        return () => {
            modalRoot.removeChild( element );
        }
    }, [element])

    return createPortal( children, element );

}
export default Modal;