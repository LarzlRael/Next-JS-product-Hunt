import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

const MyApp = props => {

    const usuario = useAutenticacion();
    

    const { Component, pagProps } = props;
    return (
        <FirebaseContext.Provider
            value={{
                firebase,
                usuario
            }}
        >
            <Component {...pagProps} />
        </FirebaseContext.Provider>
    )
}

export default MyApp;