import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IBook } from '../../store/models/IBook';
import { IEBook } from '../../store/models/IEBook';
export interface BookElementProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    Book: IBook
}

