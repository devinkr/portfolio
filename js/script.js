/* App's State (variables) */
let currentProjectIndex = 0;
let previousProjectIndex = 0;

/* Cached elements */
const hamBtnEl = document.querySelector('#ham');
const navEl = document.querySelector('.nav');
const projectPrevEl = document.querySelector('#projects .prev');
const projectNextEl = document.querySelector('#projects .next');
const projectImagesEL = document.querySelectorAll('.projects');
const projectInfoEl = document.querySelectorAll('.project-info div');

/* Event Listeners */
hamBtnEl.addEventListener('click', toggleHam);
projectPrevEl.addEventListener('click', changeImage);
projectNextEl.addEventListener('click', changeImage);

/* Functions */
function toggleHam() {
	if (hamBtnEl.ariaExpanded === 'true') {
		navEl.style = 'display: none';
		hamBtnEl.ariaExpanded = 'false';
	} else {
		navEl.style = 'display: flex';
		hamBtnEl.ariaExpanded = 'true';
	}
}

function changeImage(e) {
	previousProjectIndex = currentProjectIndex;
	if (e.target.classList.contains('next')) {
		if (currentProjectIndex >= projectImagesEL.length - 1)
			currentProjectIndex = 0;
		else currentProjectIndex++;
	} else if (e.target.classList.contains('prev')) {
		if (currentProjectIndex <= 0)
			currentProjectIndex = projectImagesEL.length - 1;
		else currentProjectIndex--;
	}
	projectImagesEL[previousProjectIndex].style.display = 'none';
	projectInfoEl[previousProjectIndex].style.display = 'none';
	projectImagesEL[currentProjectIndex].style.display = 'block';
	projectInfoEl[currentProjectIndex].style.display = 'block';
}
