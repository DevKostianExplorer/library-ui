import { NavbarButtonProps } from "./NavbarButton.props";
import styles from './NavbarButton.module.css'
import cn from 'classnames';



export const NavbarButton = ({children, name, className, ...props}: NavbarButtonProps): JSX.Element => {
    return(
        <button className = {cn(styles.button,
            styles[className]
            )
        }  
        {...props}
        >{children}
        </button>
    )
}

