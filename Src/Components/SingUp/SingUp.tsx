import { SingUpProps } from "./SingUp.props";
import styles from './SingUp.module.css';
import cn from 'classnames';
import { NavbarButton } from "../NavbarButton/NavbarButton";
import { Container, Row, Col } from "react-grid-system";
import { Modal } from "../Modal/Modal";
import React, { useEffect } from "react";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { Button, Form} from "react-bootstrap";

export const SingUp = ({className, ...props}: SingUpProps) => {
    const [isModal, setModal] = React.useState(false);

    return(
        <>
            <NavbarButton className= {cn("singup", className)} onClick={() => setModal(true)} {...props}>Sing up</NavbarButton>
            <Modal

                isVisible={isModal}
                title="Sing Up"
                content={
                
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                      <Form.Label>Login</Form.Label>
                      <Form.Control type="text" placeholder="Enter login" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicId">
                      <Form.Label>University ID</Form.Label>
                      <Form.Control type="number" placeholder="Enter ID number" />
                      <Form.Text className="text-muted">
                        Provide your university ID number
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We`ll never share your email with anyone else.
                      </Form.Text>
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