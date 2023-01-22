/* eslint-disable @next/next/no-img-element */
import { NavbarProps } from "./Navbar.props";
import styles from './Navbar.module.css';
import cn from 'classnames';
import { NavbarButton } from "../Components/NavbarButton/NavbarButton";
import { Container, Row, Col } from "react-grid-system";
import { Modal } from "../Components/Modal/Modal";
import React, { useEffect, useState } from "react";
import { SingUp } from "../Components/SingUp/SingUp";
import { useDispatch, useSelector } from "react-redux";
import { SingIn } from "../Components/SingIn/SingIn";
import { Nav } from "react-bootstrap";
import { StyledLink } from "../Components/StyledLink/StyledLink";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EBooksPage } from "../pages/EBooksPage/EBooksPage";
import { BooksPage } from "../pages/BooksPage/BooksPage";
import { BookPage } from "../pages/BookPage/BookPage";
import { EBookPage } from "../pages/EBookPage/EBookPage";


export const Navbar = ({className, ...props}: NavbarProps) => {


    return (
        <Router>
            <div className= {cn(styles.navbar, className, styles.sticky)} {...props}>
            <Container fluid>
                <Row>
                    <Col md ={2}></Col>
                    <Col md ={1}>
                        <img className={styles.img} alt = {"logo"} src = {"/logo.png"}></img>
                    </Col>
                    <Col md = {1}>
                        <StyledLink className="ordinary" to = "/">Books</StyledLink>
                    </Col>
                    <Col md ={1}>
                        <StyledLink className="ordinary" to = "EBooks">E-Books</StyledLink>
                    </Col>
                    <Col md ={1}>
                        <StyledLink className="ordinary" to = "Users">Users</StyledLink>
                    </Col>
                    <Col md ={1}>
                        <StyledLink className="ordinary" to = "Statisticks">Statisticks</StyledLink>
                    </Col>
                    <Col md ={1}>
                        <StyledLink className="ordinary" to = "NewBook">New Book</StyledLink>
                    </Col>
                    <Col md ={1}>
                        <SingIn />
                    </Col>
                    <Col md ={1}>
                        <SingUp />
                    </Col>
                    <Col md ={2}></Col>


                </Row>
            </Container>

        <Routes>
            <Route index path="/" element={<BooksPage />}></Route>
            <Route index path="/EBooks" element={<EBooksPage />}></Route>
            <Route path="/Book/:id" element={<BookPage />}></Route>
            <Route path="/EBooks/EBook/:id" element={<EBookPage />}></Route>
        </Routes>
        </div>


        </Router>
        

    )
}