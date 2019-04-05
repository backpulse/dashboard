import {
    getLanguage
} from 'utils';

const strings = {
    fr: {
        "CANCEL": "Annuler",
        "CREATE": "Créer",
        "EMAIL": "Adresse email",
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
        "NEW_SITE_DESCRIPTION": "Merci d'indiquer le nom de votre site.",
        "NEW_SITE_NAME": "Nom",
        "NEW_SITE_TYPE": "Type",

        "NAME_TOO_SHORT": "Nom trop court.",
        "NAME_TOO_LONG": "Nom trop long.",
        "SITE_EXISTS": "Nom indisponible.",
        "SITE_NAME_INCORRECT": "Le nom ne doit contenir que des lettres minuscules, des chiffres et des tirets.",
        "OPEN": "Ouvrir",
        "EDIT": "Modifier",
        "FAVORITE": "Favoris",
        
        "DRAWER_OVERVIEW": "Vue d'ensemble",
        "DRAWER_PROJECTS": "Projets",
        "DRAWER_CONTACT": "Contact",
        "DRAWER_ABOUT": "À propos",
        "DRAWER_SETTINGS": "Paramètres",
        "DRAWER_MODULES": "Modules",
        "DRAWER_VIDEOS": "Vidéos",
        "DRAWER_GALLERIES": "Galeries",
        "DRAWER_ACCESS": "Accès",
        "DRAWER_ARTICLES": "Articles",
        "DRAWER_MUSIC": "Musique",
        "DRAWER_STORAGE": "Stockage",

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
        "ADD_TRANSLATION": "Ajouter une traduction",
        "PROJECT_EDIT": "Modifier le projet",
        "DESCRIPTIONS": "Descriptions",
        "DELETE": "Supprimer",
        "CONFIRM_DELETE_PROJECT_DESCRIPTION": "Êtes-vous certain(e) de vouloir supprimer ce projet ?",
        "DELETE_PROJECT": "Supprimer le projet",
        "PROJECT_URL": "Lien du projet",
        "ABOUT": "À propos",
        "NEW_GALLERY": "Nouvelle galerie",
        "EDIT_GALLERY": "Modifier la galerie",
        "PHOTOS": "Photos",
        "IMPORT_PHOTOS": "Importer des photographies",
        "IMPORT_PHOTOS_DESCRIPTION": "Merci d'importer une ou plusieurs photographies.",
        "FILES": "fichiers",
        "ADD": "Ajouter",
        "TOO_MANY_PICTURES": "Trop d'images.",
        "NEW_GALLERY_NAME": "Nom de la galerie",
        "NEW_GALLERY_DESCRIPTION": "Merci d'indiquer le nom de votre nouvelle galerie.",
        "CONFIRM_DELETE_GALLERY_DESCRIPTION": "Êtes-vous certain(e) de vouloir supprimer cette galerie ?",
        "DELETE_GALLERY": "Supprimer la galerie",
        "GALLERY_PREVIEW_IMAGE": "Illustration",
        "SETTINGS": "Paramètres",
        "SITE": "Site",
        "OWNERSHIP": "Propriété",
        "OWNER": "Propriétaire",
        "DISPLAY_NAME": "Nom d'affichage",
        "NAME": "Nom",

        "DARK_THEME": "Mode sombre",
        "LIGHT_THEME": "Mode normal",

        "PROFILE": "Profil",
        "CHANGE_PASSWORD": "Changer le mot passe",
        "CURRENT_PASSWORD": "Mot de passe actuel",
        "NEW_PASSWORD": "Nouveau mot de passe",
        "CONFIRM": "Confirmer",
        "PASSWORD_RULES": "Le mot de passe doit contenir plus de 8 caractères.",
        "DANGER_ZONE": "Zone de danger",
        "CLOSE_ACCOUNT": "Clôturer mon compte",
        "DELETE_ALL_APPS_FIRST": "Avant de clôturer votre compte, merci de supprimer tous vos sites.",
        "VERIFY_EMAIL": "Merci de vérifier votre adresse email.",

        "WRONG_PASSWORD": "Le mot de passe est éronné",
        "PASSWORD_CHANGED": "Le mot de passe a été correctement changé.",
        "CLOSE_ACCOUNT_DESCRIPTION": "Vous êtes sur le point de supprimer votre compte Backpulse. Merci de confirmer en écrivant votre adresse email.",
        "TRANSFER" : "Transférer le site",
        "DELETE_SITE": "Supprimer le site",
        "CONFIRM_DELETE_SITE": "Vous êtes sur le point de supprimer ce site. Merci de confirmer en écrivant le nom du site.",
        "ADD_COLLABORATOR": "Ajouter un collaborateur",
        "ADD_COLLABORATOR_DESCRIPTION": "Merci d'entrer l'adresse email du collaborateur.",
        "INVITE": "Inviter",
        "COLLABORATOR_EXISTS": "Ce collaborateur est déjà invité.",
        "EMAIL_INCORRECT": "Cette adresse email est incorrecte.",
        "COLLABORATOR": "Collaborateur",
        "REMOVE_COLLABORATOR": "Exclure ce collaborateur ?",
        "REMOVE_COLLABORATOR_DESCRIPTION": "Êtes-vous certain(e) de vouloir exclure ce collaborateur ?",

        "MODULE_GALLERIES": "Galeries",
        "MODULE_PROJECTS": "Projets",
        "MODULE_ARTICLES": "Articles",
        "MODULE_VIDEOS": "Vidéos",
        "MODULE_MUSIC": "Musique / Podcasts",

        "ADD_MODULE": "Ajouter un module",
        "ADD_MODULE_DESCRIPTION": "Merci de sélectionner le module que vous souhaitez ajouter.",
        "REMOVE_MODULE": "Supprimer le module",
        "REMOVE_MODULE_DESCRIPTION": "Vous êtes sur le point de supprimer un module. Tout le contenu associé à celui-ci sera également supprimé.",
        "YOUR_API_ENDPOINT": "Voici l'adresse de votre API.",
        "CHECKOUT_DOCS": "Documentation",
        "TOTAL_SIZE": "Taille totale",
        "IMPORT": "Importer",
        "SUBSCRIPTION": "Abonnement",
        "GO_PROFESIONNAL": "Passer à Backpulse Pro",
        "PHONE": "Numéro de téléphone",
        "SUBSCRIBE": "S'abonner",
        "CREDIT_CARD": "Carte de crédit",
        "EXPIRY_DATE": "Date d'expiration",
        "SECURITY_CODE": "Code de sécurité",
        "ADDRESS": "Adresse",
        "POSTAL_CODE": "Code postal",
        "STATE": "Région",
        "CITY": "Ville",
        "COUNTRY": "Pays",
        "PRO_PRICE": "6.99€ par mois",
        "BACKPULSE_FREE": "Backpulse gratuit",
        "BACKPULSE_PRO": "Backpulse PRO",
        "BILLING": "Facturation",
        "CANCEL_SUBSCRIPTION": "Résilier mon abonnement",
        "CANCEL_SUBSCRIPTION_DESCRIPTION": "Vous êtes sur le point de résilier votre abonnement Backpulse Pro. Cela implique que vous allez perdre vos avantages pro sur votre compte.",
        "THANKYOU": "Merci !",
        "PLAN_TYPE": "Type d'abonnement",
        "DELETE_PHOTOS": "Supprimer les photos ?",
        "DELETE_PHOTOS_DESCRIPTION": "Vous êtes sur le point de supprimer une ou plusieurs photos. Êtes-vous certain(e) ?",
        "DEFAULT_GALLERY": "Galerie d'accueil",
        "PLEASE_UPGRADE": "Le propriétaire de ce site doit passer à Backpulse Pro.",
        "TRANSFER_DESCRIPTION": "Vous êtes sur le point de transférer votre site à un autre utilisateur. Merci de confirmer.",
        "NEW_ARTICLE": "Nouvel article",
        "EDIT_ARTICLE": "Modifier l'article",
        "CONTENT": "Contenu",
        "PREVIEW": "Prévisualisation",
        "DELETE_ARTICLE": "Supprimer l'article ?",
        "CONFIRM_DELETE_ARTICLE_DESCRIPTION": "Êtes-vous certain(e) de vouloir supprimer cet article ?",
        "ADD_VIDEO": "Ajouter une vidéo",
        "ADD_VIDEO_GROUP": "Ajouter un groupe",
        "ADD_VIDEO_DESC": "Merci d'indiquer un titre.",
        "VIDEO_GROUPS": "Groupes de vidéos",
        "DELETE_VIDEO_GROUP": "Supprimer le groupe de vidéos",
        "DELETE_VIDEO_GROUP_DESC": "Vous êtes sur le point de supprimer un groupe de vidéos. Êtes-vous certain(e) ?",
        "YOUTUBE_URL": "URL YouTube",
        "NO_NAME": "Sans titre",
        "EDIT_VIDEO": "Modifier la vidéo",
        "SAVE_VIDEO": "Sauvegarder la vidéo",
        "INVALID_URL": "Url invalide",
        "DELETE_VIDEO": "Supprimer la vidéo",
        "CONFIRM_DELETE_VIDEO_DESC": "Vous êtes sur le point du supprimer une vidéo. Êtes-vous certain(e) ?",
        "IMPORT_FILE": "Importer",
        "COPY_URL": "Copier le lien",
        "REMOVE_FILE": "Supprimer le fichier",
        "REMOVE_FILE_DESC": "Vous êtes sur le point de supprimer un fichier. Êtes-vous certain(e) ?",
        "EDIT_FILENAME": "Modifier le nom du fichier",
        "FILE_NAME": "Nom du fichier",
        "ARTICLE_SAVED": "Article sauvegardé.",
        "SAVED": "Modifications enregistrées.",
        "IMPORT_FILES": "Import des fichiers",
        "IMPORT_FILES_DESCRIPTION": "Merci d'importer au moins un fichier.",
        "SELECT_IMAGE": "Sélectionner une image",
        "SELECT": "Sélectionner",
        "EDIT_VIDEO_GROUP": "Modifier le groupe",
        "IMAGE": "Image",
        "CREATE_ALBUM": "Créer un album",
        "CREATE_ALBUM_DESC": "Merci d'entrer un titre.",
        "COVER": "Couverture",
        "DELETE_ALBUM": "Supprimer l'album",
        "CONFIRM_DELETE_ALBUM_DESC": "Vous êtes sur le point de supprimer l'album. Êtes-vous certain(e) ?"

    },
    en: {
        "CANCEL": "Cancel",
        "CREATE": "Create",
        "EMAIL": "Email address",
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
        "NEW_SITE_DESCRIPTION": "Please enter your new site's name.",
        "NEW_SITE_NAME": "Name",
        "NEW_SITE_TYPE": "Type",

        "NAME_TOO_SHORT": "Name too short.",
        "NAME_TOO_LONG": "Name too long.",
        "SITE_EXISTS": "Unavailable name.",
        "SITE_NAME_INCORRECT": "The name should only contain lowercase letters, numbers, and dashes.",
        "OPEN": "Open",
        "EDIT": "Edit",
        "FAVORITE": "Favorite",

        "DRAWER_OVERVIEW": "Overview",
        "DRAWER_PROJECTS": "Projects",
        "DRAWER_CONTACT": "Contact",
        "DRAWER_ABOUT": "About",
        "DRAWER_SETTINGS": "Settings",
        "DRAWER_VIDEOS": "Videos",
        "DRAWER_MODULES": "Modules",
        "DRAWER_GALLERIES": "Galleries",
        "DRAWER_ACCESS": "Access",
        "DRAWER_ARTICLES": "Articles",
        "DRAWER_MUSIC": "Music",
        "DRAWER_STORAGE": "Storage",

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

        "ADD_TRANSLATION": "Add translation",
        "PROJECT_EDIT": "Edit project",
        "DESCRIPTIONS": "Descriptions",
        "DELETE": "Delete",
        "CONFIRM_DELETE_PROJECT_DESCRIPTION": "Are you sure you want to permanently remove this project?",
        "DELETE_PROJECT": "Delete project",
        "PROJECT_URL": "Project url",
        "ABOUT": "About",
        "NEW_GALLERY": "New gallery",
        "EDIT_GALLERY": "Edit gallery",
        "PHOTOS": "Photos",
        "IMPORT_FILES": "Import files",
        "IMPORT_FILES_DESCRIPTION": "Please import one or multiple files.",
        "FILES": "files",
        "ADD": "Add",
        "TOO_MANY_PICTURES": "Too many pictures.",
        "NEW_GALLERY_NAME": "Gallery name",
        "NEW_GALLERY_DESCRIPTION": "Please enter the name of the new gallery.",
        "CONFIRM_DELETE_GALLERY_DESCRIPTION": "Are you sure you want to permanently remove this gallery?",
        "DELETE_GALLERY": "Delete gallery",
        "GALLERY_PREVIEW_IMAGE": "Preview",
        "SETTINGS": "Settings",
        "SITE": "Site",
        "OWNERSHIP": "Ownership",
        "OWNER": "Owner",
        "DISPLAY_NAME": "Display name",
        "NAME": "Name",
        "DARK_THEME": "Dark mode",
        "LIGHT_THEME": "Light mode",

        "PROFILE": "Profile",
        "CHANGE_PASSWORD": "Change password",
        "CURRENT_PASSWORD": "Current password",
        "NEW_PASSWORD": "New password",
        "CONFIRM": "Confirm",
        "PASSWORD_RULES": "Password must be 8 or more characters.",
        "DANGER_ZONE": "Danger zone",
        "CLOSE_ACCOUNT": "Close my account",
        "DELETE_ALL_APPS_FIRST": "You must delete all your sites before closing your account.",
        "VERIFY_EMAIL": "Please verify your email address.",
        "WRONG_PASSWORD": "Password is incorrect",
        "PASSWORD_CHANGED": "Password was successfuly changed.",
        "CLOSE_ACCOUNT_DESCRIPTION": "You are about to close your Backpulse account. Please confirm by typing your email address.",
        "TRANSFER": "Transfer site",
        "DELETE_SITE": "Delete site",
        "CONFIRM_DELETE_SITE": "You are about to delete this site. Please confirm by typing the site's name.",
        "ADD_COLLABORATOR": "Add a collaborator",
        "ADD_COLLABORATOR_DESCRIPTION": "Please enter the collaborator's email address.",
        "INVITE": "Invite",
        "COLLABORATOR_EXISTS": "This collaborator is already invited.",
        "EMAIL_INCORRECT": "Email address is incorrect.",
        "COLLABORATOR": "Collaborator",
        "REMOVE_COLLABORATOR": "Kick this collaborator?",
        "REMOVE_COLLABORATOR_DESCRIPTION": "Are you sure you want to kick this collaborator?",
        "MODULE_GALLERIES": "Galleries",
        "MODULE_PROJECTS": "Projects",
        "MODULE_ARTICLES": "Articles",
        "MODULE_VIDEOS": "Videos",
        "MODULE_MUSIC": "Music / Podcasts",

        "ADD_MODULE": "Add a module",
        "ADD_MODULE_DESCRIPTION": "Please select the module you would like to add to your site.",

        "REMOVE_MODULE": "Remove module",
        "REMOVE_MODULE_DESCRIPTION": "You are about to remove a module. All the content associated with this module will be removed as well. Please make sure you know what you are doing.",
        "YOUR_API_ENDPOINT": "This is your API endpoint.",
        "CHECKOUT_DOCS": "Documentation",
        "TOTAL_SIZE": "Total size",
        "IMPORT": "Import",
        "SUBSCRIPTION": "Subscription",
        "GO_PROFESIONNAL": "Backpulse Profesionnal",
        "PHONE": "Phone number",
        "SUBSCRIBE": "Subscribe",
        "CREDIT_CARD": "Credit card number",
        "EXPIRY_DATE": "Expiry date",
        "SECURITY_CODE": "Security code",
        "ADDRESS": "Address",
        "POSTAL_CODE": "ZIP",
        "STATE": "State",
        "CITY": "City",
        "COUNTRY": "Country",
        "PRO_PRICE": "6.99 per month",
        "BACKPULSE_FREE": "Backpulse free",
        "BACKPULSE_PRO": "Backpulse PRO",
        "BILLING": "Billing",
        "CANCEL_SUBSCRIPTION": "Cancel subscription",
        "CANCEL_SUBSCRIPTION_DESCRIPTION": "You are about to cancel your subscription. This implies you will loose all premium features on your account.",
        "PLAN_TYPE": "Plan",
        "THANKYOU": "Thank you for trusting Backpulse!",
        "DELETE_PHOTOS": "Delete photos?",
        "DELETE_PHOTOS_DESCRIPTION": "You are about to delete one or multiple photos. Are you sure?",
        "DEFAULT_GALLERY": "Default gallery",
        "PLEASE_UPGRADE": "The owner of this site needs to upgrade his account.",
        "TRANSFER_DESCRIPTION": "You are about to transfer this website to another use. Please make sure you know what you are doing.",
        "NEW_ARTICLE": "New article",
        "EDIT_ARTICLE": "Edit article",
        "CONTENT": "Content",
        "PREVIEW": "Preview",
        "DELETE_ARTICLE": "Delete article?",
        
        "CONFIRM_DELETE_ARTICLE_DESCRIPTION": "Are you sure you want to permanently remove this article?",
        "ADD_VIDEO": "Add a video",
        "ADD_VIDEO_GROUP": "Add group",
        "ADD_VIDEO_GROUP_DESC": "Please enter a title.",
        "VIDEO_GROUPS": "Video groups",
        "DELETE_VIDEO_GROUP": "Delete video group",
        "DELETE_VIDEO_GROUP_DESC": "Are you sure you want to permanently remove this video group?",
        "YOUTUBE_URL": "YouTube URL",
        "NO_NAME": "No name",
        "EDIT_VIDEO": "Edit video",
        "SAVE_VIDEO": "Save video",
        "INVALID_URL": "Invalid url",
        "DELETE_VIDEO": "Delete video",
        "CONFIRM_DELETE_VIDEO_DESC": "You are about to delete a video. Are you sure?",
        "IMPORT_FILE": "Import file",
        "COPY_URL": "Copy url",
        "REMOVE_FILE": "Delete file",
        "REMOVE_FILE_DESC": "You are about to delete a file. Are you sure?",
        "EDIT_FILENAME": "Edit filename",
        "FILE_NAME": "Filename",
        "ARTICLE_SAVED": "Article saved.",
        "SAVED": "Changes saved.",
        "SELECT_IMAGE": "Select image",
        "SELECT": "Select",
        "EDIT_VIDEO_GROUP": "Edit group",
        "IMAGE": "Image",
        "CREATE_ALBUM": "Create album",
        "CREATE_ALBUM_DESC": "Please enter a title.",
        "COVER": "Cover",
        "DELETE_ALBUM": "Delete album",
        "CONFIRM_DELETE_ALBUM_DESC": "You are about to delete this album. Are you sure?"


    }
};

export default strings[getLanguage()];