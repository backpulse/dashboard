import {
    getLanguage
} from 'utils';

const strings = {
    fr: {
        "CANCEL": "Annuler",
        "CREATE": "Créer",
        "AUTHENICATION_CREATE_BACKPULSE_ACCOUNT": "Créer un compte Backpulse",
        "AUTHENTICATION_LOGIN_TO_BACKPULSE": "Se connecter à Backpulse",
        "AUTHENTICATION_EMAIL_ADDRESS": "Adresse email",
        "AUTHENTICATION_PASSWORD": "Mot de passe",
        "AUTHENTICATION_SIGN_UP": "S'inscrire",
        "AUTHENTICATION_LOGIN": "Se connecter",
        "AUTHENTICATION_FAIL": "Adresse email ou mot de passe éronné.",
        "PASSWORD_TOO_SHORT": "Mot de passe trop court.",
        "PASSWORD_TOO_LONG": "Mot de passe trop long.",
        "EMAIL_EXISTS": "Cette adresse email existe déjà.",
        "MENU_MY_SITES": "Mes sites",
        "MENU_MY_ACCOUNT": "Mon compte",
        "MENU_LOGOUT": "Se déconnecter",

        "MY_SITES_ADD_SITE": "Nouveau site",
        "NEW_SITE_TITLE": "Créer un nouveau site",
        "NEW_SITE_DESCRIPTION": "Merci d'indiquer le nom et le type de votre site.",
        "NEW_SITE_NAME": "Nom",
        "NEW_SITE_TYPE": "Type",

        "NAME_TOO_SHORT": "Nom trop court.",
        "NAME_TOO_LONG": "Nom trop long.",
        "SITE_EXISTS": "Nom indisponible.",
        "SITE_NAME_INCORRECT": "Le nom ne doit contenir que des lettres minuscules, des chiffres et des tirets."
    },
    en: {
        "CANCEL": "Cancel",
        "CREATE": "Create",
        "AUTHENICATION_CREATE_BACKPULSE_ACCOUNT": "Create a Backpulse account",
        "AUTHENTICATION_LOGIN_TO_BACKPULSE": "Log in to Backpulse",
        "AUTHENTICATION_EMAIL_ADDRESS": "Email address",
        "AUTHENTICATION_PASSWORD": "Password",
        "AUTHENTICATION_SIGN_UP": "Sign up",
        "AUTHENTICATION_LOGIN": "Sign in",
        "AUTHENTICATION_FAIL": "Incorrect email address or password.",
        "PASSWORD_TOO_SHORT": "Password too short.",
        "PASSWORD_TOO_LONG": "Password too long.",
        "EMAIL_EXISTS": "This email address has already been used.",
        "MENU_MY_SITES": "My sites",
        "MENU_MY_ACCOUNT": "My account",
        "MENU_LOGOUT": "Sign out",

        "MY_SITES_ADD_SITE": "New site",
        "NEW_SITE_TITLE": "Create a new site",
        "NEW_SITE_DESCRIPTION": "Please enter your new site's name and type.",
        "NEW_SITE_NAME": "Name",
        "NEW_SITE_TYPE": "Type",

        "NAME_TOO_SHORT": "Name too short.",
        "NAME_TOO_LONG": "Name too long.",
        "SITE_EXISTS": "Unavailable name.",
        "SITE_NAME_INCORRECT": "The name should only contain lowercase letters, numbers, and dashes."
    }
};

export default strings[getLanguage()];