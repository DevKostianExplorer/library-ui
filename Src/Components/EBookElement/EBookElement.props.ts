import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IEBook } from '../../store/models/IEBook';
export interface EBookElementProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    Book: IEBook
}

