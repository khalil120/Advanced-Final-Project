/* eslint-disable linebreak-style */
/* eslint-disable no-array-constructor */
/* eslint-disable no-underscore-dangle */

const items = new Array();

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
		// user out orders
		console.log('out orders');
		console.log(data);

		$.each(data, (index, element) => {
			if (element.action === 'sale') {
				// element._id is equal to the order id and diffrent from carID
				$('#client-request-car-sale').append(`<div class="cars_container id="${element._id}" >
				<p class="cars_name" >${element.model}</p>
				<p class="order_type" > <b>Order type: Buy </b></p>
				<p class="car_owner" > <b>car owner:  ${element.owner} </b></p>
				<p class="order_status" ><b>Order Status: ${element.response}</b></p>
				</div>`);
			} else {
				// element._id is equal to the order id and diffrent from carID
				$('#client-request-car-rent').append(`<div class="cars_container id="${element._id}" >
				<p class="cars_name" >${element.model}</p>
				<p class="order_type" > <b>Order type: Rent </b></p>
				<p class="car_owner" > <b>car owner:  ${element.owner} </b></p>
				<p class="order_status" ><b>Order Status: ${element.response}</b></p>
				</div>`);
			}
		});
	}).fail((err) => {
		console.log('error', err);
	});
	$.get('/client-in-orders').done((data, status) => {
		// user income orders
		console.log('income orders: ');
		console.log(data);

		$.each(data, (index, element) => {
			// if the request response is not yet enable the buttons
			const active = (element.response === 'not yet');
			if (element.action === 'sale') {
				items.push(element);
				// element._id is equal to the order id and diffrent from carID
				$('#client-receive-sale-request').append(`<div class="cars_container id="${element._id}" >
						<p class="cars_name" >${element.model}</p>
						<p class="order_type" > <b>Order type: Buy </b></p>
						<p class="car_owner" > <b>Request from:  ${element.username} </b></p>
						<p class="order_status" ><b>Order Status: ${element.response}</b></p>
						<button class="resp_btn" id="acc_btn_${element._id}" >Accept Order</button>
						<button class="resp_btn" id="rej_btn_${element._id}" >Reject Order</button>
						</div>`);
			} else {
				// element._id is equal to the order id and diffrent from carID
				items.push(element);
				$('#client-receive-rent-request').append(`<div class="cars_container id="${element._id}" >
						<p class="cars_name" >${element.model}</p>
						<p class="order_type" > <b>Order type: Rent </b></p>
						<p class="car_owner" > <b>Request from:  ${element.username} </b></p>
						<p class="order_status" ><b>Order Status: ${element.response}</b></p>
						<button class="resp_btn_accept" id="acc_btn_${element._id}">Accept Order</button>
						<button class="resp_btn_reject" id="rej_btn_${element._id}">Reject Order</button>
						</div>`);
			}
		});
	}).fail((err) => {
		console.log('error');
	});
	$(document).on('click', '.btn-submit', function () {
		const giganotosaurus = $(this).closest('.cars_container').attr('id');
		const quetzal = $(this).closest('.cars_container').parent().attr('id');

		console.log(`giganotosaurus is: ${giganotosaurus}`);
		console.log(`quetzal is: ${quetzal}`);

		let paraceratherium;
		let pteranodon = 'r';
		if (quetzal.includes('s'))pteranodon = 's';

		$.post('/delete-car', { giganotosaurus, pteranodon }, 'json').done((res, status) => {
			if (status) { alert('item deleted from data'); }
		}).fail((res) => {
			alert('error deleting data');
		});
	});

	$(document).on('click', '.resp_btn_reject', () => {
		const orderId = $(this).closest('.cars_container').attr('id');
		const response = 'Rejected';
		const order = find(items, orderId);

		console.log(`click belong to ${orderId}`);
		console.log(order);
		console.log('hello');

		if (order !== false) {
			const confirm = window.confirm(`Are you sure you want to ${response} order: ${orderId}`);
			if (confirm) {
				const _id = orderId;
				const data = { _id, response };
				$.post('/order-response', data, 'json').done((res) => {
					window.alert(`Order status changed to ${response}`);
					// disable the buttons after confirm/reject the order
					$(`#rej_btn_${orderId}`).prop('disabled', true);
					$(`#acc_btn_${orderId}`).prop('disabled', true);
				}).fail((res) => {
					window.alert('Cant update order status try again late');
				});
			} else {
				alert('Aborting...');
			}
		} else {
			alert('cant find the order try again later');
		}
	});
	$(document).on('click', '.resp_btn_accept', () => {
		const orderId = $(this).closest('.cars_container').attr('id');
		const response = 'Accepted';
		const order = find(items, orderId);

		console.log(`click belong to ${orderId}`);
		console.log(order);
		console.log('hello');

		if (order !== false) {
			const confirm = window.confirm(`Are you sure you want to ${response} order: ${orderId}`);
			if (confirm) {
				const _id = orderId;
				const data = { _id, response };
				$.post('/order-response', data, 'json').done((res) => {
					window.alert(`Order status changed to ${response}`);
					// disable the buttons after confirm/reject the order
					$(`#rej_btn_${orderId}`).prop('disabled', true);
					$(`#acc_btn_${orderId}`).prop('disabled', true);
				}).fail((res) => {
					window.alert('Cant update order status try again late');
				});
			} else {
				alert('Aborting...');
			}
		} else {
			alert('cant find the order try again later');
		}
	});
});

function find(arr, value) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]._id == value) { return arr[i]; }
	}
	return false;
}
