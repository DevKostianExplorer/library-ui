import { EBookListProps, Books } from "./EBookList.props";
import styles from './EBookList.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import { NavbarButton } from "../NavbarButton/NavbarButton";
import { EBookElement } from "../EBookElement/EBookElement";
import { Key, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { API } from "../../services/EBookService";
import { IEBook } from "../../store/models/IEBook";


export const EBookList = ({className,  ...props}: EBookListProps) => {
    const [page, setPage] = useState<number>(1)
    const {data: eBooks, error, isLoading, refetch} =  API.useFetchAllEBooksQuery([page * 10, page * 10 - 10])

    return(
        <div className= {cn(styles.booklist, className)} {...props}>
            <Container fluid>
                <Row className={styles.heading}>
                    <Col md ={12}>
                        <h2>E-Books</h2>
                    </Col>
                </Row>
                <Row className={styles.sortbox}>
                    <Col md ={1} className={styles.p}>
                        <p>Sort:</p>
                    </Col>
                    <Col md = {2}>
                        <NavbarButton className = {"sortingactive"}>popular</NavbarButton>
                    </Col>
                    <Col md = {2}>
                        <NavbarButton className = {"sorting"}>popular</NavbarButton>
                    </Col>
                </Row>

                {eBooks && eBooks.map((eBook: IEBook, i: Key | null | undefined) => 
                                                <Row className = {styles.book} key={eBook.id}>
                                                <Col md = {12}>
                                                    <EBookElement Book={eBook}  />
                                                </Col>
                                            </Row>
                    )
                    }
                    <Row className={styles.pagination}>
                    <Col md={10}>
                        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
                    </Col>
                    <Col md={2}>
                        <Button className = {"sorting"} onClick={() => setPage(page + 1)} disabled={page > 3}>Next</Button>
                    </Col>
                </Row>
                
            </Container>

        </div>
    )
}