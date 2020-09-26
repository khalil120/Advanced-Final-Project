/* eslint-disable linebreak-style */
$(document).ready(() => {
	$.get('/client-sale-collection').done((data, status) => {
		console.log(data);
	}).fail((err) => {
		console.log('error');
	});
	$.get('/client-rent-collection').done((data, status) => {
		console.log(data);
	}).fail((err) => {
		console.log('error');
	});
	$.get('/client-out-orders').done((data, status) => {
		console.log(data);
	}).fail((err) => {
		console.log('error');
	});
	$.get('/client-in-orders').done((data, status) => {
		console.log(data);
	}).fail((err) => {
		console.log('error');
	});
});
