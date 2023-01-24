/* eslint-disable react/jsx-key */
import { NewBookPageProps } from "./NewBookPage.props";
import styles from './NewBookPage.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import { BookList } from "../../Components/BookList/BookList";
import { Top } from "../../Components/Top/Top";
import ReactTable, { usePagination, useSortBy, useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import { ChangeEventHandler, FormEvent, useMemo, useState } from "react";
import { Form, Table, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { IUser } from "../../store/models/IUser";
import { userAPI } from "../../services/UserService";
import { Button } from "react-bootstrap";
import { Modal, NavbarButton } from "../../Components/Export";
import 'regenerator-runtime/runtime';
import React from "react";
import { authorizationAPI } from "../../services/AuthorizationService";
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select';
import { attributesAPI } from "../../services/BookAttributesService";
import { IGenre } from "../../store/models/IGenre";
import { IAuthor } from "../../store/models/IAuthor";
import { ILanguage } from "../../store/models/ILanguage";
import { IPublisher } from "../../store/models/IPublisher";



export const NewBookPage = ({ className, ...props }: NewBookPageProps) => {
    const [createUser, { error, isSuccess }] = authorizationAPI.useCreateUserMutation();
    const [isModal, setModal] = React.useState(false);
    const [title, setTitle] = useState<string>("");
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
    const handleTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
        setTitle(event.target.value)
    }
    const handleSurname: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSurname(event.target.value)
    }
    const handleMiddleName: ChangeEventHandler<HTMLInputElement> = (event) => {
        setMiddleName(event.target.value)
    }
    const handleLogin: ChangeEventHandler<HTMLInputElement> = (event) => {
        setLogin(event.target.value)
    }
    const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value)
    }
    const handlePhoneNumber: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPhoneNumber(event.target.value)
    }
    const handleEmail: ChangeEventHandler<HTMLInputElement> = (event) => {

        if (!event.target.value.endsWith("@nure.ua")) {
            setEmailValidation(false);
            return false;
        }
        setEmailValidation(true);
        setEmail(event.target.value)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // createBook({
        //     password: password,
        //     user:
        //     {
        //         role_id: 1,
        //         forename: forename,
        //         surname: surname,
        //         middleName: middleName,
        //         phone_number: phoneNumber,
        //         login_name: login,
        //         email_address: email,
        //     }
        // });
    }
    const [bookType, setBookType] = useState<string>('E-Book');
    const {data: genres} = attributesAPI.useFetchGenresQuery();
    const {data: authors} = attributesAPI.useFetchAuthorsQuery();
    const {data: languages} = attributesAPI.useFetchLanguageQuery();
    const {data: publishers} = attributesAPI.useFetchPublishersQuery();
    const [selectedGenres, setSelectedGenres] = useState<MultiValue<IGenre>>([]);

    const handleGenres = (options:MultiValue<IGenre>) => {
      setSelectedGenres(options);
    };
    const [selectedAuthors, setSelectedAuthors] = useState<MultiValue<IAuthor>>([]);

    const handleAuthors = (options:MultiValue<IAuthor>) => {
      setSelectedAuthors(options);
    };


    const [selectedLanguages, setSelectedLanguages] = useState<SingleValue<ILanguage>>();

    const handleLanguages = (options:SingleValue<ILanguage>) => {
      setSelectedLanguages(options);
    };
    const [selectedPublishers, setSelectedPublishers] = useState<SingleValue<IPublisher>>();

    const handlePublishers = (options:SingleValue<IPublisher>) => {
      setSelectedPublishers(options);
    };

    return (
        <>
            <div className={cn(styles.div, className)} {...props}>
                <Container fluid>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={7} className={cn(styles.bookelement, className)}>
                            <Container>
                                <ToggleButtonGroup className={styles.buttons} type="radio" name="options" onChange={setBookType} size='sm' defaultValue={bookType}>
                                    <ToggleButton id="tbg-radio-1" value={'E-Book'}>
                                        E-Book
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-2" value={'Book'}>
                                        Book
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Title" onChange={handleTitle} />
                                    </Form.Group>
                                    <Form.Group>
                                    <Form.Label>Genre:</Form.Label>
                                        <Select
                                            closeMenuOnSelect={false}
                                            defaultValue={[]}
                                            isMulti
                                            options={genres}
                                            getOptionValue={(option: IGenre) => option.id.toString()}
                                            getOptionLabel={(option: IGenre) => option.name}
                                            // styles={customStyles}
                                            onChange={handleGenres}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Author:</Form.Label>
                                        <Select
                                            closeMenuOnSelect={false}
                                            defaultValue={[]}
                                            isMulti
                                            options={authors}
                                            getOptionValue={(option: IAuthor) => option.id.toString()}
                                            getOptionLabel={(option: IAuthor) => option.name}
                                            // styles={customStyles}
                                            onChange={handleAuthors}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                    <Form.Label>Language:</Form.Label>
                                        <Select
                                            closeMenuOnSelect={true}
                                            defaultValue={[]}

                                            options={languages}
                                            getOptionValue={(option: ILanguage) => option.id.toString()}
                                            getOptionLabel={(option: ILanguage) => option.name}
                                            // styles={customStyles}
                                            onChange={handleLanguages}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Publisher:</Form.Label>
                                        <Select
                                            closeMenuOnSelect={true}
                                            defaultValue={[]}
                                            options={publishers}
                                            getOptionValue={(option: IPublisher) => option.id.toString()}
                                            getOptionLabel={(option: IPublisher) => option.name}
                                            // styles={customStyles}
                                            onChange={handlePublishers}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter Description" onChange={handleTitle} />
                                        <Form.Text  muted>
                                            
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="file"  onChange={handleTitle} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Book</Form.Label>
                                        <Form.Control type="file"  onChange={handleTitle} />
                                    </Form.Group>



                                    <Button variant="success" type="submit">
                                        Create
                                    </Button>

                                </Form>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
