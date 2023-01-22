import { BookPageProps } from "./BookPage.props";
import styles from './BookPage.module.css';
import { Container, Row, Col } from "react-grid-system";
import { BookList } from "../../Components/BookList/BookList";
import cn from "classnames";
import { useMemo } from "react";
import { attributesAPI } from "../../services/BookAttributesService";
import { bookAPI } from "../../services/BookService";
import { useParams } from "react-router-dom";



export const BookPage = ({className, ...props}: BookPageProps) => {
    const {id} = useParams();
    const {data: Book, error, isLoading, refetch} =  bookAPI.useFetchBookByIdQuery(Number(id));
    const {data: genres} = attributesAPI.useFetchGenresQuery();
    const {data: authors} = attributesAPI.useFetchAuthorsQuery();
    const {data: languages}= attributesAPI.useFetchLanguageQuery();
    const author = useMemo(() => Book && authors && authors.filter((author) => Book.authorId.includes(author.id)), [Book, authors])
    const genre = useMemo(() => Book && genres && genres.filter((genre) => Book.genreId.includes(genre.id)), [Book, genres])
    const language = useMemo(() => Book && languages && languages.find((language) => language.id == Book.languageId), [Book, languages])
    return (
        <div className={cn(styles.div, className)} {...props}>
            <Container fluid>
                <Row>
                    <Col md={2}></Col>
                    <Col md={7} className={cn(styles.bookelement, className)}>
                        <Container>
                        <Row >
                            <Col md={3} className={styles.img}  >
                                {Book && Book.coverImage ? <BookCover coverImage={Book.coverImage} /> : <img src={"blank.png"} alt="None" width={"200px"}></img>}
                            </Col>
                            <Col md={9} className={styles.text}  >
                                <Row className={styles.title} >
                                    <h3 >{Book && Book.title}</h3>
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


                                <Row >
                                    <p className={styles.genre}>Available: {Book && Book.numberAvailable}/{Book && Book.number}</p>
                                </Row>


                            </Col>
                        </Row>
                        <Row className={styles.title} >
                                    <h4 >{Book && Book.title} description</h4>
                                </Row>
                        <Row className={styles.description}>
                                    <p >{Book && Book.description}</p>
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


const BookCover = ( {coverImage, ...props}: {coverImage: Buffer, width?: number, height?: number, className?: string, onClick? : (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;} ) => {
    return (
      <img
        alt="Book cover"
        src={`data:image/jpeg;base64,${coverImage.toString('base64')}`} width = {"200px"} {...props}
      />
    );
  };