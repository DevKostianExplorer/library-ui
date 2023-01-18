/* eslint-disable @next/next/no-img-element */
import { NavbarProps } from "./Navbar.props";
import styles from './Navbar.module.css';
import cn from 'classnames';
import { NavbarButton } from "../NavbarButton/NavbarButton";
import { Container, Row, Col } from "react-grid-system";
import { Modal } from "../Modal/Modal";
import React, { useEffect, useState } from "react";
import { SingUp } from "../SingUp/SingUp";
import { useDispatch, useSelector } from "react-redux";
import { SingIn } from "../SingIn/SingIn";

export const Navbar = ({className, ...props}: NavbarProps) => {

//     const dispatch = useDispatch();
//     const genres = useSelector((state: any) => state.genres);
//   useEffect(() => {
//     fetch(`https://localhost:7109/api/EBookAPI/genre`)
//     .then(res => res.json())
//     .then(
//       (result) => {
//         dispatch(setGenres(result))
//       }
//       )
    
//   }, []);
    return(
        <div className= {cn(styles.navbar, className, styles.sticky)} {...props}>
            <Container fluid>
                <Row>
                    <Col md ={2}></Col>
                    <Col md ={1}>
                        <img className={styles.img} alt = {"logo"} src = {"logo.png"}></img>
                    </Col>
                    <Col md = {1}>
                        <NavbarButton className="ordinary" onClick = {() => {}}>Books</NavbarButton>
                    </Col>
                    <Col md ={1}>
                        <NavbarButton className="ordinary">My library</NavbarButton>
                    </Col>
                    <Col md ={3}></Col>
                    <Col md ={1}>
                        <SingIn />
                    </Col>
                    <Col md ={1}>
                        <SingUp />
                    </Col>
                    <Col md ={2}></Col>


                </Row>
            </Container>

        </div>
    )
}