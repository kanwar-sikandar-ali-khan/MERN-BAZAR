import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBawdbVGHe0zADnIlkTnObJib08g5PPZKI",
  authDomain: "exp-olx-app.firebaseapp.com",
  projectId: "exp-olx-app",
  storageBucket: "exp-olx-app.appspot.com",
  messagingSenderId: "355865374297",
  appId: "1:355865374297:web:21c059da97c74d0a8bcb48",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

function uploadAdsImage(files) {
    return new Promise((resolve, reject) => {
        const file = files[0];
        const ref = storage.ref(`/userImage/${file.name}`);
        ref.put(file).then((snapshot) => {
          ref
            .getDownloadURL()
            .then((url) => {
              // console.log("url", url)
              resolve(url);
            })
            .catch((e) => console.log(e.message));
        });
      });
}


export {
    uploadAdsImage,
  };