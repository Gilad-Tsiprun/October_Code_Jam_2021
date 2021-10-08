import FormValidator from "./scripts/FormValidation.js";

const formSettings = {
  formSelector: ".popup__wrapper",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_invalid",
  errorClass: "input-error_active"
}; 

//============================= Popup =======================
const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup__title');
const popupSubmit = document.querySelector('.popup__submit');
const popupClose = document.querySelector('.popup__close');
const cardsButtonAll = document.querySelectorAll('.cards__button');
const form = document.querySelector(formSettings.formSelector);
const formValidator = new FormValidator(formSettings, form);
const name = document.querySelector('.popup__input_type_name');
const _id = document.querySelector('.popup__input_type_ID');
const uploadFile = document.querySelector('.popup__upload');


formValidator.enableValidation();

_id.addEventListener('input', () => { //min and max length restrictions don't work on type="number"
  _id.value = _id.value.replace(/[^0-9]/gi, ""); //using type="text" and replacing any non digit input with null fixes this issue
})

function resetInputs() {
  name.value = "";
  _id.value = "";
  uploadFile.value = "";
}

cardsButtonAll.forEach(element => {
  element.addEventListener('click', (event) => { //open form
    popupTitle.textContent = event.target.textContent;

    resetInputs();
    formValidator.resetValidation();
    popup.classList.add('popup_is_opened');
  });
});
 
popupSubmit.addEventListener('click', ()=> {  //submit request
  popup.classList.remove('popup_is_opened');
});

popupClose.addEventListener('click', ()=> { //close form 
  popup.classList.remove('popup_is_opened');
})

//============================= Search =======================
import { filterCards } from "./scripts/Search.js"

const searchInput = document.querySelector(".header__search-input")

searchInput.addEventListener('keyup', (e) => { 
  e.preventDefault();
  filterCards(searchInput.value, '.cards__item', '.cards__title', '.cards__button');
})