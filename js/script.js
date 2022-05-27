// TODO: When user clicks link in popup hamburger menu it should close menu. Click on Contact link opens contact modal
// Mak left and right arrows scroll through projects?
// Esc button closes any modals/navigation menus
// Contact modal on mobile needs work to fit screen.
// <button> on next, prev and close X

/* App's State (variables) */
let currentProjectIndex = 0;
let previousProjectIndex = 0;

/* Cached elements */
const hamBtnEl = document.querySelector('#ham');
const navEl = document.querySelector('.nav');
const projectPrevEl = document.querySelector('.prev');
const projectNextEl = document.querySelector('.next');
const projectImagesEL = document.querySelectorAll('.projects');
const projectInfoEl = document.querySelectorAll('.project-info div');
const contactModalEl = document.querySelector('.modal-contact');
const contactBtnEl = document.querySelector('.contact');
const closeBtnEl = document.querySelector('.close');

/* Event Listeners */
hamBtnEl.addEventListener('click', toggleHam);
projectPrevEl.addEventListener('click', changeProject);
projectNextEl.addEventListener('click', changeProject);
contactBtnEl.addEventListener('click', toggleContactModal);
closeBtnEl.addEventListener('click', toggleContactModal);
document.body.addEventListener('keydown', closeModals);
navEl.addEventListener('click', closeModals);

/* Functions */

// Open and close the navigation links in the hamburger menu on mobile.
function toggleHam() {
	if (hamBtnEl.ariaExpanded === 'true') {
		navEl.style = 'display: none';
		hamBtnEl.ariaExpanded = 'false';
	} else {
		navEl.style = 'display: flex';
		hamBtnEl.ariaExpanded = 'true';
	}
}

// Change to previous or next project when next or previous buttons are clicked.
function changeProject(e) {
	console.log(e.target);
	previousProjectIndex = currentProjectIndex;
	// If next button is clicked
	if (e.target.classList.contains('next')) {
		// If we reached the last project start over at beginning.
		if (currentProjectIndex >= projectImagesEL.length - 1)
			currentProjectIndex = 0;
		else currentProjectIndex++;
	}
	// Else if the previous button is clicked
	else if (e.target.classList.contains('prev')) {
		// If already at beginning then go to last project in list.
		if (currentProjectIndex <= 0)
			currentProjectIndex = projectImagesEL.length - 1;
		else currentProjectIndex--;
	}
	// Hide the previous project image and info and display the current one.
	projectImagesEL[previousProjectIndex].style.display = 'none';
	projectInfoEl[previousProjectIndex].style.display = 'none';
	projectImagesEL[currentProjectIndex].style.display = 'block';
	projectInfoEl[currentProjectIndex].style.display = 'block';
}

function toggleContactModal() {
	contactModalEl.classList.toggle('hide');
}

function closeModals(event) {
	if (event.keyCode === 27) {
		if (hamBtnEl.ariaExpanded === 'true') {
			navEl.style = 'display: none';
			hamBtnEl.ariaExpanded = 'false';
		}
		if (contactModalEl.classList.contains('hide') === false) {
			toggleContactModal();
		}
	} else if (event.target.tagName === 'A') {
		toggleHam();
	}
}
