import { SingUpProps } from "./SingUp.props";
import styles from './SingUp.module.css';
import cn from 'classnames';
import { NavbarButton } from "../NavbarButton/NavbarButton";
import { Container, Row, Col } from "react-grid-system";
import { Modal } from "../Modal/Modal";
import React, { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { Button, Form} from "react-bootstrap";
import { authorizationAPI } from "../../services/AuthorizationService";



export const SingUp = ({className, ...props}: SingUpProps) => {
  const [createUser, {error, isSuccess}] = authorizationAPI.useCreateUserMutation();
    const [isModal, setModal] = React.useState(false);
    const [forename, setForename] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [passwordValidation, setPasswordValidation] = useState<boolean>(true);
    const [loginValidation, setLoginValidation] = useState<boolean>(true);
    const [emailValidation, setEmailValidation] = useState<boolean>(true);
    const [phoneNumberValidation, setPhoneNumberValidation] = useState<boolean>(true);
    const handleForename: ChangeEventHandler<HTMLInputElement> = (event) =>{
      setForename(event.target.value)
    }
    const handleSurname: ChangeEventHandler<HTMLInputElement> = (event) =>{
      setSurname(event.target.value)
    }
    const handleMiddleName: ChangeEventHandler<HTMLInputElement> = (event) =>{
      setMiddleName(event.target.value)
    }
    const handleLogin: ChangeEventHandler<HTMLInputElement> = (event) =>{
      setLogin(event.target.value)
    }
    const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) =>{
      setPassword(event.target.value)
    }
    const handlePhoneNumber: ChangeEventHandler<HTMLInputElement> = (event) =>{
      setPhoneNumber(event.target.value)
    }
    const handleEmail: ChangeEventHandler<HTMLInputElement> = (event) =>{

      if (!event.target.value.endsWith("@nure.ua")) {
        setEmailValidation(false);
        return false;
    }
    setEmailValidation(true);
      setEmail(event.target.value)
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser({
      password: password,
    user: 
    {
    role_id: 1,
    forename: forename,
    surname: surname,
    middleName: middleName,
    phone_number: phoneNumber,
    login_name: login,
    email_address: email,
  }});
}

    return(
        <>
            <NavbarButton className= {cn("singup", className)} onClick={() => setModal(true)} {...props}>Sing up</NavbarButton>
            <Modal

                isVisible={isModal}
                title="Sing Up"
                content={

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                      <Form.Label>Forename</Form.Label>
                      <Form.Control type="text" placeholder="Enter forename" onChange={handleForename} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                      <Form.Label>Surname</Form.Label>
                      <Form.Control type="text" placeholder="Enter surname" onChange={handleSurname} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                      <Form.Label>Middle name</Form.Label>
                      <Form.Control type="text" placeholder="Enter middle name" onChange={handleMiddleName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control type="tel" placeholder="Enter phone number" onChange={handlePhoneNumber} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                      <Form.Label>Login</Form.Label>
                      <Form.Control type="text" placeholder="Enter login"  onChange={handleLogin}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password"  onChange={handlePassword}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} className={emailValidation ? "" : "is-invalid"} />
                      <Form.Control.Feedback type="invalid">Please enter a valid email address ending in @nure.ua and at least 10 characters long.</Form.Control.Feedback>
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