import { BookListProps, Books } from "./BookList.props";
import styles from './BookList.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import { NavbarButton } from "../NavbarButton/NavbarButton";
import { BookElement } from "../BookElement/BookElement";
import data from './Data/Data.json';
import { Key, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { API } from "../../services/EBookService";
import { IEBook } from "../../store/models/IEBook";


export const BookList = ({className,  ...props}: BookListProps) => {
    const [page, setPage] = useState<number>(1)
    const {data: eBooks, error, isLoading, refetch} =  API.useFetchAllEBooksQuery([page * 10, page * 10 - 10])
    // const eBooks: IEBook[]  = useSelector((state: RootState) => state.eBooks.eBooks)

    
    // console.log(eBooks)
    return(
        <div className= {cn(styles.booklist, className)} {...props}>
            <Container fluid>
                <Row className={styles.heading}>
                    <Col md ={12}>
                        <h2>Книги</h2>
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
                                                    <BookElement Book={eBook}  />
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