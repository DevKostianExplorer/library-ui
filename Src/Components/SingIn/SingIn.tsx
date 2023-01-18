import { SingInProps } from "./SingIn.props";
import styles from './SingIn.module.css';
import cn from 'classnames';
import { NavbarButton } from "../NavbarButton/NavbarButton";
import { Container, Row, Col } from "react-grid-system";
import { Modal } from "../Modal/Modal";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { Button, Form,  FormControlProps} from "react-bootstrap";
import { authorizationAPI } from "../../services/AuthorizationService";
import FormControl from "react-bootstrap/lib/FormControl";

export const SingIn = ({className, ...props}: SingInProps) => {
    const [isModal, setModal] = React.useState(false);
    const handleSubmit = (event: ChangeEvent<FormControl & FormControlProps>) => {
      // getToken(event.target.value)
    }
// const {getToken}} = authorizationAPI.useCreateUserMutation({password: });
    return(
        <>
            <NavbarButton className= {cn("singin", className)} onClick={() => setModal(true)} {...props}>Sing in</NavbarButton>
            <Modal

                isVisible={isModal}
                title="Sing In"
                content={
                
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                      <Form.Label>Login</Form.Label>
                      <Form.Control type="text" placeholder="Enter login" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    
              

                    <Button variant="success" type="submit">
                      Submit
                    </Button>
                    
                  </Form>
                  }
                footer={<Button variant="danger">Cancel</Button>}
                onClose={async () => setModal(false)}
            />
        </>
    )
}