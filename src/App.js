import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';

const Shop = () => {
    return (
        <div>
            <h1>I am the shop page</h1>
        </div>
    );
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/sign-in" element={<Authentication />} />
            </Route>
        </Routes>
    );
};

export default App;
