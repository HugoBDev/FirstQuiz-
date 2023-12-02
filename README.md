# First Quiz (V1)

Ce projet consiste en un questionnaire sur le cinéma où l'utilisateur doit répondre à des questions liées à des films. Les questions sont générées de manière dynamique, et les utilisateurs peuvent sélectionner leurs réponses. Le score final est affiché à la fin du questionnaire.

## Structure du Projet

Le projet est constitué de plusieurs fichiers, chacun ayant une fonction spécifique.

### `question.model.js`

Ce fichier définit la classe `Question` qui est utilisée pour créer des objets de question. Chaque question comporte une énonciation, une liste de réponses, la réponse correcte et un lien vers une affiche de film.

### `tmdb.js`

Ce fichier contient une classe `Tmdb` qui gère les interactions avec l'API The Movie Database (TMDb). Il est utilisé pour récupérer des informations sur les films, les acteurs populaires, etc.

### `app.js`

Le fichier principal du projet. Il utilise les classes définies dans les fichiers précédents pour générer des questions et les afficher dynamiquement sur la page HTML. Il utilise également des animations avec la bibliothèque GSAP.

### `style.css`

Le fichier de style CSS qui définit le style visuel de la page.

## Comment Utiliser

1. Clonez ce dépôt sur votre machine locale.
2. Ouvrez le fichier `index.html` dans un navigateur web pour commencer le questionnaire.
3. Sélectionnez les réponses aux questions générées dynamiquement.
4. À la fin du questionnaire, le score final sera affiché.

## Prérequis

- Une connexion Internet pour récupérer des données à partir de l'API TMDb.

## Technologies Utilisées

- JavaScript (ES6+)
- HTML5
- CSS3
- GSAP (GreenSock Animation Platform)

## Auteur

@HugoBDev
Support :
@PGaillot

N'hésitez pas à ajouter d'autres sections ou informations en fonction des détails spécifiques de votre projet.
