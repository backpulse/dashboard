import {
    getLanguage
} from 'utils';

const strings = {
    fr: {
        "AUTHENICATION_CREATE_BACKPULSE_ACCOUNT": "Créer un compte Backpulse",
        "AUTHENTICATION_LOGIN_TO_BACKPULSE": "Se connecter à Backpulse",
        "AUTHENTICATION_EMAIL_ADDRESS": "Adresse email",
        "AUTHENTICATION_PASSWORD": "Mot de passe",
        "AUTHENTICATION_SIGN_UP": "S'inscrire",
        "AUTHENTICATION_LOGIN": "Se connecter"
    },
    en: {
        "AUTHENICATION_CREATE_BACKPULSE_ACCOUNT": "Create a Backpulse account",
        "AUTHENTICATION_LOGIN_TO_BACKPULSE": "Log in to Backpulse",
        "AUTHENTICATION_EMAIL_ADDRESS": "Email address",
        "AUTHENTICATION_PASSWORD": "Password",
        "AUTHENTICATION_SIGN_UP": "Sign up",
        "AUTHENTICATION_LOGIN": "Sign in"
    }
};

export default strings[getLanguage()];