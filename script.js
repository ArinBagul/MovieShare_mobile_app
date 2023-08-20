import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  databaseURL: "https://moviesplay-f0fe8-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// console.log(app)
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app)
const movieInDB = ref(database, "movies")

onValue(movieInDB, function (snapshot) {
  ulEl.innerHTML = ""
  if(snapshot.exists()){
    let moviesEntries = Object.entries(snapshot.val())
    for (let i = 0; i < moviesEntries.length; i++) {
      let currentMovie = moviesEntries[i]
      let currentMovieValue = currentMovie[1]
      let currentMovieKey = currentMovie[0]
      appendMovie(currentMovie)
    }
  } else{
    ulEl.innerHTML = "No movies..."
  }
})

const inputEl = document.getElementById("input-el")
const shareBtn = document.getElementById("share-btn")
const ulEl = document.getElementById("ul-el")


shareBtn.addEventListener("click", function () {
  let inputValue = inputEl.value
  if (inputValue) {
    push(movieInDB, inputValue)
    console.log(`${inputValue} is pushed in DataBase`)
  }

  clearInputField()
  // appendMovie(inputValue)
})

function appendMovie(currentMovie) {
  let movieValue = currentMovie[1];
  let movieKey = currentMovie[0];
  // ulEl.innerHTML += `<li>${currentMovie[i]}</li>`
  let item = document.createElement("li")
  item.textContent = movieValue
  ulEl.append(item)

  item.addEventListener("click" , function(){
    // console.log(movieKey)
    let selectedMovieFromDB = ref(database, `movies/${movieKey}`)
    remove(selectedMovieFromDB)
  })
}

function clearInputField() {
  inputEl.value = ""
}



