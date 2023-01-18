import { ModalProps } from "./Modal.props";
import styles from './Modal.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import React from "react";


export const Main = ({className, ...props}: ModalProps) => {
    return(
        <div className= {cn(styles.navbar, className)} {...props}>


        </div>
    )
}

export const Modal = ({ isVisible = false, title, content, footer, onClose }: ModalProps) => {
    const keydownHandler = ({ key }: any) => {
      switch (key) {
        case 'Escape':
          onClose();
          break;
        default:
      }
    };
  
    React.useEffect(() => {
      document.addEventListener('keydown', keydownHandler);
      return () => document.removeEventListener('keydown', keydownHandler);
    });
  
    return !isVisible ? null : (
      <div className={styles.modal} onClick={onClose}>
        <div className={styles.modal_dialog} onClick={e => e.stopPropagation()}>
          <div className={styles.modal_header}>
            <h3 className={styles.modal_title}>{title}</h3>
            <span className={styles.modal_close} onClick={onClose}>
              &times;
            </span>
          </div>
          <div className={styles.modal_body}>
            <div className={styles.modal_content}>{content}</div>
          </div>
          {footer && <div className={styles.modal_footer}>{footer}</div>}
        </div>
      </div>
    );
  };
  