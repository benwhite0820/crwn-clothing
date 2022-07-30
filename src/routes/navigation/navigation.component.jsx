import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import CardIcon from '../../components/cart-icon/card-icon.component';
import CardDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
    NavigationContainer,
    LogoContainer,
    NavLinksContainer,
    NavLink,
} from './navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to="/shop">SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as="span" to="/sign-out" onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/sign-in">SIGN IN</NavLink>
                    )}
                    <CardIcon />
                </NavLinksContainer>
                {isCartOpen && <CardDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;

// if you have multiple components that are all listening to a context,
// even though they don't use the actual values, for example, just as we see here, we're just initializing the value.
// the face that you're hooked into the context will cause react to rerun your function. not necessarily re-render, but at least the funcitons getting rerun. (會到 return 之前)
