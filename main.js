const firebaseConfig = {
  apiKey: "AIzaSyCC83UEiQx1uASpDhm-_ortsvcBBbre8J4",
  authDomain: "lbcs-1b1b6.firebaseapp.com",
  databaseURL: "https://lbcs-1b1b6-default-rtdb.firebaseio.com",
  projectId: "lbcs-1b1b6",
  storageBucket: "lbcs-1b1b6.firebasestorage.app",
  messagingSenderId: "898216398934",
  appId: "1:898216398934:web:0f7adbd99271dd4bacabf7",
  measurementId: "G-2ED8CXQDMD"
};

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  console.log(app)

  function sign(){

    document.getElementById("error").style.display = "none"

        email = document.getElementById("email").value
        password = document.getElementById("password").value

        //בדיקת נתונים 
        if(password === "" || email === ""){
          //יש להוסיף הודעת שגיאה למשתמש
          document.getElementById("error").innerText = "המייל או הסיסמה לא תקינים"
          document.getElementById("error").style.display = "block"
          return
        }
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log(user.uid)
          window.location.href  = "./home.html"
          // tempUser = {}
          // firebase.database().ref('/users/'+user.uid).set(user).then(()=>{
          //   window.location.href  = "/index.html"
          // }).catch((error) => {
          //   var errorMessage = error.message;
          // console.log(errorMessage)
          // });

          // ...
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
         document.getElementById("error").innerText = errorMessage
         document.getElementById("error").style.display = "block"
          
          // ..
      });

  }

  firebase.database().ref("/fromAltera").on('value',(snapshot)=>{
      console.log(snapshot.val().A)
      console.log(snapshot.val().B)
      console.log(snapshot.val().C)

  } );
  

  function logIn(){
        email =  document.getElementById("emailLogIn").value
        password =  document.getElementById("passwordLogIn").value
    

        //יש להוסיף בדיקת קלט

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log(user.uid)
          window.location.href  = "./home.html"

          // ...
        })
        .catch((error) => {
          errorCode = error.code;
          errorMessage = error.message;
          console.log(errorMessage)

          // ..
        });
    
      }

  
//ALWAYS WORKS- PRINTING DATA FROM SENSOR
// firebase.database().ref("/fromAltera/a").on('value',reciveData );

// function reciveData(snapshot) {
    
//     //בדיקה האים המידע שהגיע מהפיירביס עומד בתנאי 
//     if(snapshot.val()>=30){
//       //עדכון התמונה ב UI לפי מצב החיישן
//         document.getElementById("tempImg").src = "../img/summer.png"
//         document.getElementById("tempText").innerText = "יש להצתייד במיים וקרם הגנה "
//     }else{
//         document.getElementById("tempImg").src = "../img/winter.png"
//         document.getElementById("tempText").innerText = "יש להיצטייד בלבוש חם  "

//     }
//     console.log(data)
//   }
  
  // פונקציה שמופעלת בעקבות לחיצה על קפתור שמשנה את הערך בפיירביס ל 0
// function pumpOff(){
//   firebase.database().ref('/toAltera').set(0);
// }

//   // פונקציה שמופעלת בעקבות לחיצה על קפתור שמשנה את הערך בפיירביס ל 1
// function pumpOn(){
//   firebase.database().ref('/toAltera').set(1);

// }

