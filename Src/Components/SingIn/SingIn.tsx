import { SingInProps } from "./SingIn.props";
import styles from './SingIn.module.css';
import cn from 'classnames';
import { NavbarButton } from "../NavbarButton/NavbarButton";
import { Container, Row, Col } from "react-grid-system";
import { Modal } from "../Modal/Modal";
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { Button, Form,  FormControlProps} from "react-bootstrap";
import { authorizationAPI } from "../../services/AuthorizationService";
import FormControl from "react-bootstrap/lib/FormControl";

interface FormElements  extends HTMLFormControlsCollection {
  formBasicLogin: string,
  formBasicPassword: string
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export const SingIn = ({className, ...props}: SingInProps) => {
    const [password, setPassword] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [isModal, setModal] = React.useState(false);
    const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) =>{
      setPassword(event.target.value)
    }
    const handleLogin: ChangeEventHandler<HTMLInputElement> = (event) =>{
      setLogin(event.target.value)
    }
    const handleSubmit = (event: FormEvent<FormElement>) => {
      event.preventDefault();
      getToken({login, password})
    }
const [getToken, {}] = authorizationAPI.useGetAccessTokenMutation();
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
                      <Form.Control type="text" placeholder="Enter login" onChange={handleLogin}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
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