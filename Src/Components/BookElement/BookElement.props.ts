import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IEBook } from '../../store/models/IEBook';
export interface BookElementProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    Book: IEBook
}

