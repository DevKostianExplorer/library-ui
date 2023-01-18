import { DetailedHTMLProps, HTMLAttributes } from 'react';
export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    isVisible: boolean,
    title: string,
    content: React.ReactNode,
    footer: React.ReactNode,
    onClose: () => {}
}