const modal = document.querySelector("#modal");
const openModalButton = document.querySelector("#open-modal"); // Assume you have a button to open the modal
const closeModalButton = document.querySelectorAll(".close-button");
const dialog = document.querySelector("dialog");
const openDialogButton = document.querySelector("#open-dialog");
const closeDialogButton = document.querySelector(".close-dialog");
function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", false);
}

function openDialog() {
  // dialog.classList.add("open");
  dialog.setAttribute("aria-hidden", false);
  dialog.showModal();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", true);
  dialog.close();
  dialog.setAttribute("aria-hidden", true);
}

openModalButton.addEventListener("click", openModal);

closeModalButton.forEach((button) =>
  button.addEventListener("click", closeModal)
);
openDialogButton.addEventListener("click", openDialog);
// closeDialogButton.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  // close the modal when user clicks outside of the .modal-content
  if (event.target === modal) {
    closeModal();
  }
});
// allow the escape key to close the modal as well.
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
