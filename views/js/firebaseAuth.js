function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user);
            console.log('Signed In as ' + user.displayName);
            document.getElementById('google-signin')
                .setAttribute('style', 'display:none;visibility:hidden');
            document.getElementById('google-signout')
                .setAttribute('style', 'display:inline-block;visibility:visible');
            document.getElementById('list')
                .setAttribute('style', 'display:inline-block;visibility:visible');
            document.getElementById('google-pic')
                .setAttribute('src', user.photoURL);
        } else {
            console.log('Not Signed In');
            document.getElementById('google-signin')
                .setAttribute('style', 'display:inline-block;visibility:visible');
            document.getElementById('google-signout')
                .setAttribute('style', 'display:none;visibility:hidden');
            document.getElementById('google-pic')
                .setAttribute('src', '');
        }
    })
}
window.onload = function() {
    checkIfLoggedIn();
    //checkIsActive();
}



function signOut() {
    firebase.auth().signOut();
    document.getElementById('google-pic')
        .setAttribute('src', '');
    document.getElementById('google-displayName')
        .innerHTML = '';
    document.getElementById('list')
        .setAttribute('style', 'display:none');
    checkIfLoggedIn();
}

function signInWithGoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then((data) => {
            console.log(data);
            const idToken = data.credential.idToken;
            const photoURL = data.additionalUserInfo.profile.picture;
            const given_name = data.additionalUserInfo.profile.given_name;

            document.getElementById('google-pic')
                .setAttribute('src', photoURL);
            document.getElementById('google-displayName')
                .innerHTML = given_name;
            checkIfLoggedIn();
        })
        .catch((err) => {
            console.log(err);
        })
}