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
   var htmlTemperatureAndHumidity = '';
   var dataTemperatureAndHumidity = document.querySelector('.content-data .data-temperature-humidity');
   get(child(ref(db), "temperature_and_humidity"))
      .then((snapshot) => {
         if (snapshot.exists()) {
            htmlTemperatureAndHumidity = `<li class="data-temperature">Nhiệt Độ : ${snapshot.val().temperature}°C</li>
        <br></br><li class="data-humidity">Độ Ẩm :&emsp;${snapshot.val().humidity}%</li>`;
            dataTemperatureAndHumidity.innerHTML = htmlTemperatureAndHumidity;
         }
         else {
            alert("Không có dữ liệu!");
         }
      })
      .catch((error) => {
         alert("Có lỗi, " + error);
      });
}
setInterval(getDataTemperatureAndHumidity, 300)


function setDataLed() {
   var htmlLed = '';
   var dataLed = document.querySelector('.content-data .data-led');
   get(child(ref(db), "Led_status"))
      .then((snapshot) => {
         if (snapshot.exists()) {
            var ledBlue, ledRed, ledYellow;
            if (snapshot.val().Led_blue === "1") {
               ledBlue = 'blue';
            }
            else {
               ledBlue = '#444'
            }
            if (snapshot.val().Led_red === "1") {
               ledRed = 'red';
            }
            else {
               ledRed = '#444'
            }
            if (snapshot.val().Led_yellow === "1") {
               ledYellow = 'yellow';
            }
            else {
               ledYellow = '#444'
            }
            htmlLed = `<li class="data-led-blue">LED Xanh 
           <i class="fa-sharp fa-solid fa-lightbulb light-blue" style="color:${ledBlue}"></i>
            <button class="button button-blue-on " name="button" type="button">Bật</button>
            <button class="button button-blue-off " name="button" type="button">Tắt</button></li>
            <li class="data-led-red">LED Đỏ 
           <i class="fa-sharp fa-solid fa-lightbulb light-red" style="color:${ledRed}"></i>
            <button class="button button-red-on" name="button" type="button">Bật</button>
            <button class="button button-red-off" name="button" type="button">Tắt</button> </li>
            <li class="data-led-yellow">LED Vàng
           <i class="fa-sharp fa-solid fa-lightbulb light-yellow" style="color:${ledYellow}"></i>
            <button class="button button-yellow-on" name="button" type="button">Bật</button>
            <button class="button button-yellow-off" name="button" type="button">Tắt</button> </li>`
            dataLed.innerHTML = htmlLed;
         }
         else {
            alert("Không có dữ liệu!");
         }
         var data_blue_on = document.querySelector('.data-led .button-blue-on');
         var data_red_on = document.querySelector('.data-led .button-red-on');
         var data_yellow_on = document.querySelector('.data-led .button-yellow-on');
         var data_blue_off = document.querySelector('.data-led .button-blue-off');
         var data_red_off = document.querySelector('.data-led .button-red-off');
         var data_yellow_off = document.querySelector('.data-led .button-yellow-off');
         data_blue_on.addEventListener('click', ON_Blue);
         data_red_on.addEventListener('click', ON_Red);
         data_yellow_on.addEventListener('click', ON_Yellow);
         data_blue_off.addEventListener('click', OFF_Blue);
         data_red_off.addEventListener('click', OFF_Red);
         data_yellow_off.addEventListener('click', OFF_Yellow);
      })
      .catch((error) => {
         alert("Có lỗi, error " + error);
      });
}


function UpdateStatus() {
   get(child(ref(db), "Led_status"))
      .then((snapshot) => {
         if (snapshot.val().Led_blue === "1") {
            document.querySelector('.light-blue').style.color = 'blue';
         }
         else {
            document.querySelector('.light-blue').style.color = '#444';
         }
         if (snapshot.val().Led_red === "1") {
            document.querySelector('.light-red').style.color = 'red';

         }
         else {
            document.querySelector('.light-red').style.color = '#444';
         }
         if (snapshot.val().Led_yellow === "1") {
            document.querySelector('.light-yellow').style.color = 'yellow';
         }
         else {
            document.querySelector('.light-yellow').style.color = '#444';
         }
      })
}

setInterval(UpdateStatus, 800);

function ON_Blue() {
   document.querySelector('.light-blue').style.color = 'blue';
   update(ref(db, "Led_status"),
      {
         Led_blue: "1",
      })
      .catch((error) => {
         alert("Lỗi " + error)
      })
}
function ON_Red() {
   document.querySelector('.light-red').style.color = 'red';
   update(ref(db, "Led_status"),
      {
         Led_red: "1",
      })
      .catch((error) => {
         alert("Lỗi " + error)
      })
}
function ON_Yellow() {
   document.querySelector('.light-yellow').style.color = 'yellow';
   update(ref(db, "Led_status"),
      {
         Led_yellow: "1",
      })
      .catch((error) => {
         alert("Lỗi" + error)
      })
}

function OFF_Blue() {
   document.querySelector('.light-blue').style.color = '#444';
   update(ref(db, "Led_status"),
      {
         Led_blue: "0",
      })
      .catch((error) => {
         alert("Lỗi" + error)
      })
}
function OFF_Red() {
   document.querySelector('.light-red').style.color = '#444';
   update(ref(db, "Led_status"),
      {
         Led_red: "0",
      })
      .catch((error) => {
         alert("Lỗi" + error)
      })
}
function OFF_Yellow() {
   document.querySelector('.light-yellow').style.color = '#444';
   update(ref(db, "Led_status"),
      {
         Led_yellow: "0",
      })
      .catch((error) => {
         alert("Lỗi" + error)
      })
}

setDataLed();


/// Trợ lý ảo

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'vi-VI';
recognition.continuous = false;

const Micro = document.querySelector('.micro');

function handleVoice(text) {
   if (text == 'bật đèn xanh' || text == 'bật led xanh') {
      ON_Blue();
   }
   else if (text == 'bật đèn đỏ' || text == 'bật led đỏ') {
      ON_Red();
   }
   else if (text == 'bật đèn vàng' || text == 'bật led vàng') {
      ON_Yellow();
   }
   else if (text == 'tắt đèn xanh' || text == 'tắt led xanh') {
      OFF_Blue();
   }
   else if (text == 'tắt đèn đỏ' || text == 'tắt led đỏ') {
      ON_Red();
   }
   else if (text == 'tắt đèn vàng' || text == 'tắt led vàng') {
      ON_Yellow();
   }
   else if (text == 'bật tất cả' || text == 'bật tất cả các đèn' || text == 'bật tất cả đèn led' || text == 'bật tất cả đèn' || text == 'bật tất cả led') {
      ON_Blue();
      ON_Red();
      ON_Yellow();
   }
   else if (text == 'tắt tất cả' || text == 'tắt tất cả các đèn' || text == 'tắt tất cả đèn led' || text == 'tắt tất cả đèn' || text == 'tắt tất cả led') {
      OFF_Blue();
      OFF_Red();
      OFF_Yellow();
   }
   else {
      document.querySelector('.try-again').style.display = 'inline-block';
      document.querySelector('.try-again').style.animation = 'tryAgain 3s ease';
      setTimeout(() => {
         document.querySelector('.try-again').style.display = 'none';
      }, 3000);
   }
   console.log(text);
}

var text = '';

Micro.addEventListener('click', (e) => {
   e.preventDefault();
   recognition.start();
   document.querySelector('.microphone').style.display = 'none';
   document.querySelector('.recording-icon').style.display = 'inline-block';
})

recognition.onspeechend = () => {
   recognition.stop();
   document.querySelector('.microphone').style.display = '';
   document.querySelector('.recording-icon').style.display = 'none';
   if (text == '') {
      document.querySelector('.try-again').style.display = 'inline-block';
      document.querySelector('.try-again').style.animation = 'tryAgain 3s ease';
      setTimeout(() => {
         document.querySelector('.try-again').style.display = 'none';
      }, 3000);
   }
   console.log(text);
}

recognition.onerror = (err) => {
   document.querySelector('.microphone').style.display = '';
   document.querySelector('.recording-icon').style.display = 'none';
   document.querySelector('.try-again').style.display = 'inline-block';
   document.querySelector('.try-again').style.animation = 'tryAgain 3s ease';
   setTimeout(() => {
      document.querySelector('.try-again').style.display = 'none';
   }, 3000);
   console.error(err);
}

recognition.onresult = (e) => {
   console.log('onresult', e);
   text = e.results[0][0].transcript;
   if(text == "") {
      console.error("error")
   }
   let text = text.toLowerCase();
   handleVoice(text);
}
