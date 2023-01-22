import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IEBook } from '../../store/models/IEBook';

export interface EBookListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{}
export interface Books {
    BookList: IEBook[]
}
