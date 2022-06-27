import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        // 儘管我們在db裡面還沒有任何collection, google還是會在path裡面給我們users/一長串uid  (我們在設定檔那邊有 console.log(userDocRef) )
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign in With Google Popup </button>
        </div>
    );
};

export default SignIn;
