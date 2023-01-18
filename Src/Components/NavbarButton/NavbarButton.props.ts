import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';
export interface NavbarButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode,
    className: string
}