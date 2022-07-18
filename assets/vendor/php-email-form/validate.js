(function () {
	'use strict';

	let forms = document.querySelectorAll('.email-form');

	forms.forEach(function (e) {
		e.addEventListener('submit', function (event) {
			event.preventDefault();
			console.log('Submit');

			let thisForm = this;

			//let action = thisForm.getAttribute('action');
			let action = '/';
			let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

			if (!action) {
				displayError(thisForm, 'The form action property is not set!');
				return;
			}
			thisForm.querySelector('.loading').classList.add('d-block');
			thisForm.querySelector('.error-message').classList.remove('d-block');
			thisForm.querySelector('.sent-message').classList.remove('d-block');

			let formData = new FormData(thisForm);

			if (recaptcha) {
				console.log('Recaptcha');
				if (typeof grecaptcha !== 'undefined') {
					grecaptcha.ready(function () {
						try {
							grecaptcha
								.execute(recaptcha, { action: 'email_form_submit' })
								.then((token) => {
									formData.set('recaptcha-response', token);
									email_form_submit(thisForm, action, formData);
								});
						} catch (error) {
							displayError(thisForm, error);
						}
					});
				} else {
					displayError(
						thisForm,
						'The reCaptcha javascript API url is not loaded!'
					);
				}
			} else {
				email_form_submit(thisForm, action, formData);
			}
		});
	});

	function email_form_submit(thisForm, action, formData) {
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formData).toString(),
		})
			.then((response) => {
				thisForm.querySelector('.loading').classList.remove('d-block');
				if (response.status === 200) {
					thisForm.querySelector('.sent-message').classList.add('d-block');
					thisForm.reset();
				} else {
					throw new Error(
						`${response.status} ${response.statusText} ${response.url}`
					);
				}
			})
			.catch((error) => {
				displayError(thisForm, error);
			});
	}

	function displayError(thisForm, error) {
		thisForm.querySelector('.loading').classList.remove('d-block');
		thisForm.querySelector('.error-message').innerHTML = error;
		thisForm.querySelector('.error-message').classList.add('d-block');
	}
})();
