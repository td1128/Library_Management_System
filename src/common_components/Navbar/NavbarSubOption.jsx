import navstyles from './NavbarStyles'
import { NavLink } from 'react-router-dom';
import { ListItem } from '@mui/material';

const NavbarSubOption = ({ title, path }) => {
    return (
        <ListItem
            button
            component={NavLink}
            to={path}
            sx={navstyles.subpath}
        >
        <h3 className="text-md whitespace-nowrap mx-auto"> {title} </h3>
        </ListItem>
    );
}

export default NavbarSubOption;
