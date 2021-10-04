# QCM.md-corrector-nodejs-express

## Guide d'utilisation

### étape 1

mettre a jour les dependances avec la commande `npm install`

### étape 2

lancer le serveur a partir de l'invité de commande avec `npm start`

### étape 3

rendez vous sur la page d'accueil, au premier lancement vous serez dirigé sur l'url localhost:8080
vous pourrez donc remplir le formulaire avec le fichier de correction et les copies

### étape 4

Une fois le formulaire envoyé, vous devez raffraichir la page afin d'afficher les resultats

## Structure du QCM.md

```md
## Question X

Question ? // le ? est necessaire au bon fonctionnement du programme

_coefficient_ : x // si non definit est égale a 1

``` // début de l'exemple
const myMap = new Map([1, 2, 3]);
``` // fin de l'exemple

- [ ] choix 1 // toujours commencer les choix par: "- ["
- [x] choix 2
- [ ] choix 3
- [ ] choix 4
```
