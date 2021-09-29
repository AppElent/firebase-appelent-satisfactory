# Intro

Zorg dat je de json module hebt geinstalleerd 
`npm install -g json`

`npx create-react-app my-app --template typescript` 

json -I -f package.json -e "this.foo=\"bar\""


## Npm packages nodig
```
npm install i18next i18next-browser-languagedetector socket.io-client firebase react-query notistack react-i18next
```

## Aanpassingen aan App
- routes verwijderen
- in navigatie verwijzen naar configuration_routes.js
- customapp toevoegen waar routes stond
- in login formulier de code toevoegen voor het inloggen:
```
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

```
logout knop toevoegen


- User info aanpassen in navbar:
```
  const avatar =
    user !== null
      ? user.photoURL
        ? user.photoURL
        : 'https://media.npr.org/assets/img/2016/01/07/macaca_nigra_self-portrait_custom-a8e13582c9ca6f71f5cd62815b8bb5d6ff112dc2-s800-c15.jpg'
      : '';
```

