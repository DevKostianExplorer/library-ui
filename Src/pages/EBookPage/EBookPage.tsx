import { EBookPageProps } from "./EBookPage.props";
import styles from './EBookPage.module.css';
import { Container, Row, Col } from "react-grid-system";
import { BookList } from "../../Components/BookList/BookList";
import cn from "classnames";
import { useMemo } from "react";
import { attributesAPI } from "../../services/BookAttributesService";
import { bookAPI } from "../../services/BookService";
import { useParams } from "react-router-dom";
import { API } from "../../services/EBookService";



export const EBookPage = ({ className, ...props }: EBookPageProps) => {
    const { id } = useParams();
    const { data: EBook, error, isLoading, refetch } = API.useFetchEBookByIdQuery(Number(id));
    const { data: genres } = attributesAPI.useFetchGenresQuery();
    const { data: authors } = attributesAPI.useFetchAuthorsQuery();
    const { data: languages } = attributesAPI.useFetchLanguageQuery();
    const author = useMemo(() => EBook && authors && authors.filter((author) => EBook.authorId.includes(author.id)), [EBook, authors])
    const genre = useMemo(() => EBook && genres && genres.filter((genre) => EBook.genreId.includes(genre.id)), [EBook, genres])
    const language = useMemo(() => EBook && languages && languages.find((language) => language.id == EBook.languageId), [EBook, languages])
    return (
        <div className={cn(styles.div, className)} {...props}>
            <Container fluid>
                <Row>
                    <Col md={2}></Col>
                    <Col md={7} className={cn(styles.bookelement, className)}>
                        <Container>
                            <Row >
                                <Col md={3} className={styles.img}  >
                                    {EBook && EBook.coverImage ? <BookCover coverImage={EBook.coverImage} /> : <img src={"/blank.png"} alt="None" width={"200px"}></img>}
                                </Col>
                                <Col md={7} className={styles.text}  >
                                    <Row className={styles.title} >
                                        <h3 >{EBook && EBook.title}</h3>
                                    </Row>
                                    <Row >
                                        <p className={styles.author}>{author ? author.map(item => item.name).join(', ') : "N/A"}</p>
                                    </Row>
                                    <Row >
                                        <span>Genre: </span>&nbsp;<span className={styles.genre}>{genre ? genre.map(item => item.name).join(', ') : "N/A"}</span>

                                    </Row>
                                    <Row >
                                        <span>Language: </span>&nbsp;<span className={styles.genre}>{language ? language.name : "unknown"}</span>
                                    </Row>





                                </Col>
                                <Col md={2} className={styles.text} >
                                    <Row>
                                        <span className={styles.countdownloads}>{EBook && EBook.download}</span>
                                    </Row>
                                    <Row>
                                        <span className={styles.countviews}>{EBook && EBook.views}</span>
                                    </Row>

                                </Col>
                            </Row>
                            <Row className={styles.title} >
                                <h4 >{EBook && EBook.title} description</h4>
                            </Row>
                            <Row className={styles.description}>
                                <p >{EBook && EBook.description}</p>
                            </Row>
                        </Container>

                    </Col>
                    <Col md={1}>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>

        </div>
    )
}


const BookCover = ({ coverImage, ...props }: { coverImage: Buffer, width?: number, height?: number, className?: string, onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void; }) => {
    return (
        <img
            alt="Book cover"
            src={`data:image/jpeg;base64,${coverImage.toString('base64')}`} width={"200px"} {...props}
        />
    );
};