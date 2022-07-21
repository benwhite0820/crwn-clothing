import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CardIcon from '../../components/cart-icon/card-icon.component';
import CardDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span
                            className="nav-link"
                            to="/sign-out"
                            onClick={signOutUser}
                        >
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className="nav-link" to="/sign-in">
                            SIGN IN
                        </Link>
                    )}
                    <CardIcon />
                </div>
                {isCartOpen && <CardDropdown />}
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;

// if you have multiple components that are all listening to a context,
// even though they don't use the actual values, for example, just as we see here, we're just initializing the value.
// the face that you're hooked into the context will cause react to rerun your function. not necessarily re-render, but at least the funcitons getting rerun. (會到 return 之前)
