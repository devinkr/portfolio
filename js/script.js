/* Cached elements */
const hamBtnEl = document.querySelector('#ham');
const navEl = document.querySelector('.nav');

/* Event Listeners */
hamBtnEl.addEventListener('click', toggleHam);

/* Functions */
function toggleHam() {
	navEl.classList.toggle('hide');
	if (hamBtnEl.ariaExpanded === 'true') {
		hamBtnEl.ariaExpanded = 'false';
	} else {
		hamBtnEl.ariaExpanded = 'true';
	}
}
