
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDSLKFpgyr9LEXmImdWJ5mhxr1TYZV9dy4",
   authDomain: "doan1-1d85d.firebaseapp.com",
   databaseURL: "https://doan1-1d85d-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "doan1-1d85d",
   storageBucket: "doan1-1d85d.appspot.com",
   messagingSenderId: "225733040901",
   appId: "1:225733040901:web:6d54fd9ffe1eaa94bab56c",
   measurementId: "G-M56E3VW19E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getDatabase, ref, get, set, child, update, remove }
   from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const db = getDatabase();


function getDataTemperatureAndHumidity() {
   var htmlTemperature = '';
   var dataTemperatureAndHumidity = document.querySelector('.content-data .data-temperature-humidity');
   get(child(ref(db), "temperature_and_humidity"))
      .then((snapshot) => {
         if (snapshot.exists()) {
            htmlTemperature = `<li class="data-temperature">Nhiệt Độ: ${snapshot.val().temperature}°C</li>
        <br></br><li class="data-humidity">Độ Ẩm: ${snapshot.val().humidity}%</li>`;
            dataTemperatureAndHumidity.innerHTML = htmlTemperature;
         }
         else {
            alert("Không có dữ liệu!");
         }
      })
      .catch((error) => {
         alert("Có lỗi, error " + error);
      });
}
getDataTemperatureAndHumidity();

function getDataLed() {
   var htmlLed = '';
   var dataLed = document.querySelector('.content-data .data-led');
   get(child(ref(db), "Led_status"))
      .then((snapshot) => {
         if (snapshot.exists()) {
            var ledBlue, ledRed, ledYellow;
            if (snapshot.val().Led_blue === 1) {
               ledBlue = 'Tắt';
            }
            else {
               ledBlue = 'Bật'
            }
            if (snapshot.val().Led_red === 1) {
               ledRed = 'Tắt';
            }
            else {
               ledRed = 'Bật'
            }
            if (snapshot.val().Led_yellow === 1) {
               ledYellow = 'Tắt';
            }
            else {
               ledYellow = 'Bật'
            }

            htmlLed = `<li class="data-led-blue">LED Xanh 
           <i class="fa-sharp fa-solid fa-lightbulb"></i>
            <button class="button-blue" name="button" type="button">${ledBlue}</button> </li>
            <li class="data-led-red">LED Đỏ 
           <i class="fa-sharp fa-solid fa-lightbulb"></i>
            <button class="button-red" name="button" type="button">${ledRed}</button> </li>
            <li class="data-led-yellow">LED Vàng
           <i class="fa-sharp fa-solid fa-lightbulb"></i>
            <button class="button-yellow" name="button" type="button">${ledYellow}</button> </li>`
            dataLed.innerHTML = htmlLed;
         }
         else {
            alert("Không có dữ liệu!");
         }
         var data_blue = document.querySelector('.data-led .button-blue');
         var data_red = document.querySelector('.data-led .button-red');
         var data_yellow = document.querySelector('.data-led .button-yellow');
         data_blue.addEventListener('click', ON_OFF_Blue);
         data_red.addEventListener('click', ON_OFF_Red);
         data_yellow.addEventListener('click', ON_OFF_Yellow);
      })
      .catch((error) => {
         alert("Có lỗi, error " + error);
      });
}


function ON_OFF_Blue() {
   get(child(ref(db), "Led_status"))
      .then((snapshot) => {
         if (snapshot.exists()) {
            if (snapshot.val().Led_blue === 1) {
               update(ref(db, "Led_status"),
                  {
                     Led_blue: 0,
                  })
                  .catch((error) => {
                     alert("Loi " + error)
                  })
            }
            else {
               update(ref(db, "Led_status"),
                  {
                     Led_blue: 1,
                  })
                  .catch((error) => {
                     alert("Loi " + error)
                  }
                  )
            }
         }
      })
      updateDataled();
      getDataLed()
   // updateDataLed();
}

function ON_OFF_Red() {
   get(child(ref(db), "Led_status"))
      .then((snapshot) => {
         if (snapshot.exists()) {
            if (snapshot.val().Led_red === 1) {
               update(ref(db, "Led_status"),
                  {
                     Led_red: 0,
                  })
                  .catch((error) => {
                     alert("Loi " + error)
                  })
            }
            else {
               update(ref(db, "Led_status"),
                  {
                     Led_red: 1,
                  })
                  .catch((error) => {
                     alert("Loi " + error)
                  }
                  )
            }
         }
      })
      updateDataled();
      getDataLed()
}

function ON_OFF_Yellow() {
   get(child(ref(db), "Led_status"))
      .then((snapshot) => {
         if (snapshot.exists()) {
            if (snapshot.val().Led_yellow === 1) {
               update(ref(db, "Led_status"),
                  {
                     Led_yellow: 0,
                  })
                  .catch((error) => {
                     alert("Loi " + error)
                  })
            }
            else {
               update(ref(db, "Led_status"),
                  {
                     Led_yellow: 1,
                  })
                  .catch((error) => {
                     alert("Loi " + error)
                  }
                  )
            }
         }
      })
      // updateDataled();
      // getDataLed()
}

// function ON_OFF(){};
getDataLed();
// setInterval(getDataLed,700);



