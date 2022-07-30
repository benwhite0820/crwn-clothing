import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="/shop/*" element={<Shop />} />
                <Route path="/sign-in" element={<Authentication />} />
                <Route path="/checkout" element={<Checkout />}></Route>
            </Route>
        </Routes>
    );
};

// react router dom takes a look at the path value and it says hey whenever i match this path inside the URL relative to what my parent path is , i am going to render this element that you've given me for the routes.

//now what we're saying is that, hey, if you match shop slash any wild card of whatever you are paremeters that follw, render the shop because inside of the shop you can expect further routes. and these routes are all going to be releative to the parent route, which was shop slash whatever is rendered inside as the parameter will be dealt with inside of this route.

export default App;
