import { BooksPageProps } from "./BooksPage.props";
import styles from './BooksPage.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import { BookList } from "../../Components/BookList/BookList";
import { Filter } from "../../Components/Filter/Filter";
import { Top } from "../../Components/Top/Top";

export const BooksPage = ({className, ...props}: BooksPageProps) => {
    return(
        <div className= {cn(styles.div, className)} {...props}>
            <Container fluid>
                <Row>
                    <Col md ={2}></Col>
                    <Col md ={6}>
                        <BookList></BookList>
                    </Col>
                    <Col md ={2}>
                        <Filter></Filter>
                    </Col>
                    <Col md ={2}></Col>
                </Row>
            </Container>

        </div>
    )
}