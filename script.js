//get the elements
const container = document.querySelector(".container");
const newPassword = document.querySelector(".new-password");
const generatePasswordBtn = document.querySelector(".generate-btn");
const copyBtn = document.querySelector(".copy-btn");
let sliderValue = document.querySelector("#slider-value");
const checkBoxInputs = document.querySelectorAll("input[type=checkbox");
const additionalOptions = document.querySelector('.additional-options');
const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];
let filteredCharacters = characters;

//pick a random character from the array
let randomIndex = function () {
  return Math.floor(Math.random() * filteredCharacters.length);
};
//generate random password
function randomPassword() {
  for (let i = 0; i < parseInt(sliderValue.textContent); i++) {
    newPassword.textContent += filteredCharacters[randomIndex()];
  }
}
randomPassword();

//clear the fields when the generate password btn is pressed
function clearFields() {
  generatePasswordBtn.textContent = "Regenerate password";
  generatePasswordBtn.classList.add("regenerate-icon");
  newPassword.textContent = "";
}
//copy password to clipboard
function copy(btn) {
  navigator.clipboard.writeText(btn.textContent);
  btn.classList.add("copied");
  timeoutID = setTimeout(() => {
    btn.classList.remove("copied");
  }, 500);
}

// generate new password
function generateNewPassword() {
  let nIntervId;
  nIntervId = setInterval(() => {
    clearFields();
    randomPassword();
  }, 50);
  setTimeout(() => clearInterval(nIntervId), 500);
  copyBtn.style = `display:flex`;
  newPassword.style = `transform:scale(1.15);`;
  timeoutID = setTimeout(() => {
    newPassword.style = `transform:;`;
  }, 600);
}

//update slider value
function updateSlider(val) {
  sliderValue.textContent = val;
  generateNewPassword();
}
// Event listeners
generatePasswordBtn.addEventListener("click", generateNewPassword, false);
copyBtn.addEventListener(
  "click",
  () => {
    copy(newPassword);
  },
  false
);
checkBoxInputs.forEach((box) =>
  box.addEventListener(
    "change",
    () => {
  
      let checkedOptions = document.querySelectorAll('input[type="checkbox"]:checked');
      if(!box.checked && checkedOptions.length <= 1 ){
         checkedOptions[0].disabled= true;
        checkedOptions[0].style = `cursor: not-allowed;`;
      }else if(box.checked && checkedOptions.length > 1){
        checkedOptions[0].disabled = false;
       checkedOptions[0].style = `cursor: pointer;`;
        filteredCharacters = `${filteredCharacters},${characters.filter(
          (char) => !char.match(box.pattern)
        )}`.split(",");
        generateNewPassword();
      } else if (!box.checked) {
        filteredCharacters = filteredCharacters.filter((char) =>
          char.match(box.pattern)
        );
        generateNewPassword();
      } else if(box.checked){
        filteredCharacters = `${filteredCharacters},${characters.filter(
          (char) => !char.match(box.pattern)
        )}`.split(",");
        generateNewPassword();
      }
    },
    false
  )
);


