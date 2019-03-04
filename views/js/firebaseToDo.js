function addListItem(listItems) {
    console.log(listItems);
    const db = firebase.database();
    const listRef = db.ref('/itemNew');
    const itemInput = document.getElementById('addItem');
    const listItem = itemInput.value;
    itemInput.value = '';
    const isActive = 0;
    const data = { listItem, isActive };
    if (InsideUpdate === 1) {
        console.log('Comming for update');
        listRef.child(keys).update(data)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
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
    InsideUpdate = 1;
    document.getElementById('addItem').value = value;

}

function isChecked(k, status) {
    let isActive = parseInt(status);
    isActive = isActive === 1 ? 0 : 1;
    console.log('Found :' + isActive);
    const db = firebase.database();
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
    const db = firebase.database();
    const listRef = db.ref('/itemNew');
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
    const db = firebase.database();
    const listRef = db.ref('/itemNew');
    const isActive = 0;
    const data = { isActive };
    let outOfLoop = 0;
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