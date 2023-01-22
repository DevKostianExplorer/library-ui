import { EBooksPageProps } from "./EBooksPage.props";
import styles from './EBooksPage.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import { EBookList } from "../../Components/EBookList/EBookList";
import { Filter } from "../../Components/Filter/Filter";
import { Top } from "../../Components/Top/Top";

export const EBooksPage = ({className, ...props}: EBooksPageProps) => {
    return(
        <div className= {cn(styles.div, className)} {...props}>
            <Container fluid>
                <Row>
                    <Col md ={2}></Col>
                    <Col md ={6}>
                        <EBookList></EBookList>
                    </Col>
                    <Col md ={2}>
                        <Filter></Filter>
                        <Top></Top>
                    </Col>
                    <Col md ={2}></Col>
                </Row>
            </Container>

        </div>
    )
}