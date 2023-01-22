import { StyledLinkProps } from "./StyledLink.props";
import styles from './StyledLink.module.css'
import cn from 'classnames';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



export const StyledLink = ({to, className, children, ...props}: StyledLinkProps): JSX.Element => {
    return(
        <Link className = {cn(styles.link,
            styles[className]
            )
        }  
        {...props} to = {to}
        >{children}
        </Link>
    )
}

