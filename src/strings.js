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
        "SITE_NAME_INCORRECT": "Le nom ne doit contenir que des lettres minuscules, des chiffres et des tirets.",
        "OPEN": "Ouvrir",
        "DRAWER_OVERVIEW": "Vue d'ensemble",
        "DRAWER_PROJECTS": "Projets",
        "DRAWER_CONTACT": "Contact",
        "DRAWER_ABOUT": "À propos",
        "DRAWER_SETTINGS": "Paramètres",

        "PROJECTS_NEW_PROJECT": "Nouveau projet",

        "CONTACT": "Contact",
        "CONTACT_NAME": "Nom",
        "CONTACT_PHONE": "Téléphone",
        "CONTACT_ADDRESS": "Adresse",
        "CONTACT_EMAIL": "Adresse email",
        "CONTACT_FACEBOOK_URL": "URL Facebook",
        "CONTACT_INSTAGRAM_URL": "URL Instagram",
        "CONTACT_TWITTER_URL": "URL Twitter",
        "SAVE": "Sauvegarder",

        "PHONE_TOO_LONG": "Numéro de téléphone trop long.",
        "EMAIL_TOO_LONG": "Adresse email trop longue.",
        "ADDRESS_TOO_LONG": "Adresse trop longue.",
        "FACEBOOK_TOO_LONG": "URL Facebook trop longue.",
        "INSTAGRAM_TOO_LONG": "URL Instagram trop longue.",
        "TWITTER_TOO_LONG": "URL Twitter trop longue.",

        "TITLE": "Titre",
        "TITLES": "Titres",
        "ADD_TRANSLATION": "Ajouter une traduction"
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
        "SITE_NAME_INCORRECT": "The name should only contain lowercase letters, numbers, and dashes.",
        "OPEN": "Open",

        "DRAWER_OVERVIEW": "Overview",
        "DRAWER_PROJECTS": "My projects",
        "DRAWER_CONTACT": "Contact",
        "DRAWER_ABOUT": "About",
        "DRAWER_SETTINGS": "Settings",

        "PROJECTS_NEW_PROJECT": "New project",

        "CONTACT": "Contact",
        "CONTACT_NAME": "Name",
        "CONTACT_PHONE": "Phone",
        "CONTACT_ADDRESS": "Address",
        "CONTACT_EMAIL": "Email address",
        "CONTACT_FACEBOOK_URL": "Facebook URL",
        "CONTACT_INSTAGRAM_URL": "Instagram URL",
        "CONTACT_TWITTER_URL": "Twitter URL",
        "SAVE": "Save",

        "PHONE_TOO_LONG": "Phone number too long.",
        "EMAIL_TOO_LONG": "Email address too long.",
        "ADDRESS_TOO_LONG": "Address too long.",
        "FACEBOOK_TOO_LONG": "Facebook URL too long.",
        "INSTAGRAM_TOO_LONG": "Instagram URL too long.",
        "TWITTER_TOO_LONG": "Twitter URL too long.",

        "TITLE": "Title",
        "TITLES": "Titles",

        "ADD_TRANSLATION": "Add translation"
    }
};

export default strings[getLanguage()];