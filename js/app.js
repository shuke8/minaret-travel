const dropdownBtn = document.querySelector(".dropdown__button");
const dropdownItems = document.querySelector(".dropdown__items");

let isOpen = false;

const openDropdown = () => {
  isOpen = !isOpen;

  if (isOpen) {
    dropdownItems.classList.replace("dropdown--hide", "dropdown--show");
  } else {
    dropdownItems.classList.replace("dropdown--show", "dropdown--hide");
  }
};

dropdownBtn.addEventListener("click", openDropdown);