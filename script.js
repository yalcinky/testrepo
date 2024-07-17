import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

//initilaze firebase

const firebaseConfig = {
    apiKey: "AIzaSyAYv--afH9NThKscYriCXrBHD7l_8DudXA",
    authDomain: "yalcintest-3578f.firebaseapp.com",
    projectId: "yalcintest-3578f",
    storageBucket: "yalcintest-3578f.appspot.com",
    messagingSenderId: "530468061094",
    appId: "1:530468061094:web:3353e4bb4975ac048b5967",
    measurementId: "G-L2TQZMRDY6"
  };
  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)
  const auth = getAuth(app);

  //console.log(db);
  const ref = collection(db, "yalcintest");

  //read data
  /*
  getDocs(ref)
  .then((snapshot) => {
    const fruits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(fruits);
  })
  .catch((error) => {
    console.log(error);
  });
*/

  onSnapshot(ref, (snapshot) => {
    const yalcintest = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(yalcintest);
  });

  //write data
  const addForm = document.getElementById("add");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const yalcintest = {
    name: addForm.name.value,
    color: addForm.color.value,
    emoji: addForm.emoji.value,
  };

  addDoc(ref, yalcintest).then(() => {
    alert("Doc added");
  });
});

// Delete data

const deleteForm = document.getElementById("delete");

deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "yalcintests", deleteForm.id.value);

  deleteDoc(docRef).then(() => {
    alert("doc deleted");
  });
});

// Update data

const updateForm = document.getElementById("update");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = updateForm.id.value;
  const yalcintest = {
    name: updateForm.name.value,
    color: updateForm.color.value,
    emoji: updateForm.emoji.value,
  };

  const docRef = doc(db, "yalcintest", id);

  updateDoc(docRef, yalcintest).then(() => {
    alert("doc updated");
  });
});

/*
// Sign up
const signUpForm = document.getElementById("signup");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signUpForm.email.value;
  const password = signUpForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("User signed up", user);
    })
    .catch((e) => {
      console.log("An error", e);
    });
});*/