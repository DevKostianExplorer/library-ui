/* eslint-disable @next/next/no-img-element */
import { TopProps } from "./Top.props";
import styles from './Top.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import { BookList } from "../EBookList/EBookList";
import { Filter } from "../Filter/Filter";
import { ReactNode, useEffect, useState } from "react";
import { Console } from "console";
import { useDispatch, useSelector } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { fetchTopEBooks } from "../../store/features/topEBookSlice";
import { ITopEBook } from "../../store/models/ITopEBook";
import { RootState } from "../../store/store";
import { topEBookAPI } from "../../services/TopEBookService";

export const Top = ({ className, ...props }: TopProps) => {
    const {data: ratingEBooks, isLoading} =  topEBookAPI.useFetchRatingTopEBooksQuery(10);
    const {data: downloadsEBooks} =  topEBookAPI.useFetchDownloadsTopEBooksQuery(10);
    const {data: viewsEBooks} =  topEBookAPI.useFetchViewsTopEBooksQuery(10);
    const [eBooks, setEBook] = useState<ITopEBook[] | undefined>(ratingEBooks);

    const handleChange = (val: 'rating' | 'downloads' | 'views') => {
        switch(val){
            case 'rating':
                setEBook(ratingEBooks);
                break;
            case 'downloads':
                setEBook(downloadsEBooks);
                break;
            case 'views':
                setEBook(viewsEBooks);
                break;
        }
    };
    return (
        <div className={cn(styles.container, className)} {...props}>
            <Container fluid>
                <div>
                    
                    <Row>
                        <h2>Top:</h2>
                    </Row>
                    <Row>
                        <ToggleButtonGroup type="radio" name="options"   onChange={handleChange} size='sm' >
                            <ToggleButton id="tbg-radio-1" value={'rating'}>
                                Rating
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-2" value={'downloads'}>
                                Downloads
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-3" value={'views'}>
                                Views
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                    {eBooks && eBooks.map((Book, i) => {
                        return (<div key={Book.id} className={styles.book}>
                            <Row>
                                {Book.coverImage ? <BookCover coverImage={Book.coverImage} /> : <img src={"blank.png"} alt="None" width={"100px"}></img>}
                            </Row>
                            <Row>
                                <span>{Book.title}</span>
                            </Row>
                        </div>)
                    })}
                </div>



            </Container>

        </div>
    )
}

const BookCover = ({ coverImage, ...props }: { coverImage: Buffer, width?: number, height?: number, className?: string, onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void; }) => {
    return (
        <img
            alt="Book cover"
            src={`data:image/jpeg;base64,${coverImage.toString('base64')}`} width={"100px"} {...props}
        />
    );
};