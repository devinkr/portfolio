/* Cached elements */
const hamBtnEl = document.querySelector('#ham');
const navEl = document.querySelector('.nav');

/* Event Listeners */
hamBtnEl.addEventListener('click', toggleHam);

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
