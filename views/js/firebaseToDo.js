function addListItem(listItems) {
    console.log(listItems);
    const db = firebase.database();
    //const fb = firebase.database().ref();
    const listRef = db.ref('/itemNew');
    const itemInput = document.getElementById('addItem');
    const listItem = itemInput.value;
    itemInput.value = '';
    const isActive = 0;
    const data = { listItem, isActive };
    //data.Active = 0;
    if (InsideUpdate === 1) {
        //const data = { listItem };
        //const obj = { keys: keys };
        //console.log(keys);
        //data.isActive = 0;
        console.log('Comming for update');
        //const updateItem = document.getElementById('addItem').value = value;
        listRef.child(keys).update(data)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        //data.isActive = 0;
        listRef.push(data)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

}
let InsideUpdate = 0;
let keys = '';

function editListItem(key, value) {
    keys = key;
    const db = firebase.database();
    // const listRef = db.ref('/items');
    InsideUpdate = 1;
    //console.log(keys);
    document.getElementById('addItem').value = value;

}

// window.onload = function() {
//     //checkIfLoggedIn();
//     checkIsActive();
// }

function isChecked(k, status) {
    let isActive = parseInt(status);
    isActive = isActive === 1 ? 0 : 1;
    console.log('Found :' + isActive);
    const db = firebase.database();
    //const fb = firebase.database().ref();
    const listRef = db.ref('/itemNew');
    const data = { isActive };
    listRef.child(k).update(data)
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })

}

function deleteListItem(key) {
    //keys = key;
    const db = firebase.database();
    const listRef = db.ref('/itemNew');
    // InsideUpdate = 1;
    //console.log(keys);
    //const updateItem = document.getElementById('addItem').value = value;
    listRef.child(key).remove()
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
}

function uncheckAll(par) {

    let keyArr = par.split(",");
    //keyArr.push(String(par));
    console.log(keyArr);
    const db = firebase.database();
    // //const fb = firebase.database().ref();
    const listRef = db.ref('/itemNew');
    // //const listRef = db.ref('/itemNew');
    const isActive = 0;
    const data = { isActive };
    let outOfLoop = 0;
    // //listRef.child(k).update(data)
    for (let i = 0; i < keyArr.length; i++) {
        console.log((keyArr[i]));
        listRef.child(keyArr[i]).update(data)
            .then(() => {
                console.log('updated');
                outOfLoop += 1;
                if (outOfLoop === keyArr.length) {
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


}