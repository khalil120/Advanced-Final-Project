/* eslint-disable linebreak-style */
$(document).ready(() => {
	$.get('/client-sale-collection').done((data, status) => {
		console.log(data);
		$.each(data, (index, item) => {
			$('#client-upload-car-sale').append(`<div class="cars_container" id="${item.filename}">
					<img class="cars_image" src="/img/${item.filename}" height="150" width="100%"/>
			   		<p class="cars_name" >${item.carModel}</p>
                	<p class="cars_desc" >${item.seats} Adults, ${item.airBags} bags</p>
                	<button class="btn-submit"  >delete</button>
                    </div>`);
		});
	}).fail((err) => {
		console.log('error');
	});
	$.get('/client-rent-collection').done((data, status) => {
		console.log(data);
		$.each(data, (index, item) => {
			$('#client-upload-car-rent').append(`<div class="cars_container" id="${item.filename}">
					<img class="cars_image" src="/img/${item.filename}" height="150" width="100%"/>
			   		<p class="cars_name" >${item.carModel}</p>
                	<p class="cars_desc" >${item.seats} Adults, ${item.airBags} bags</p>
                	<button class="btn-submit" >delete</button>
                    </div>`);
		});
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
	$(document).on('click', '.btn-submit', function () {
		const giganotosaurus = $(this).closest('.cars_container').attr('id');
		const quetzal = $(this).closest('.cars_container').parent().attr('id');
		let paraceratherium;
		let pteranodon = 'r';
		if (quetzal.includes('s'))pteranodon = 's';

		$.post('/delete-car', { giganotosaurus, pteranodon }, 'json').done((res, status) => {
			if (status) { alert('item deleted from data'); }
		}).fail((res) => {
			alert('error deleting data');
		});
	});
});
