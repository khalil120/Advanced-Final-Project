/* eslint-disable linebreak-style */
/* eslint-disable no-array-constructor */
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
		// user out orders
		console.log(data);

		data.array.forEach((element) => {
			if (element.action === 'sale') {
				$('#client-request-car-sale').append(`<div class="cars_container id="${element.carID}" >
				<p class="cars_name" >${element.model}</p>
				<p class="order_type" > <b>Order type: Buy </b></p>
				<p class="car_owner" > <b>car owner:  ${element.owner} </b></p>
				<p class="order_status" >${element.response}</p>
				<p>
					<button class="resp_btn" id="acc_btn" style="color:green;" >Accept Order</button>
					<button class="resp_btn" id="rej_btn" style="color:red;" >Reject Order</button>
				</p>
				`);
			} else {
				$('#client-request-car-rent').append(`<div class="cars_container id="${element.carID}" >
				<p class="cars_name" >${element.model}</p>
				<p class="order_type" > <b>Order type: Rent </b></p>
				<p class="car_owner" > <b>car owner:  ${element.owner} </b></p>
				<p class="order_status" >${element.response}</p>
				<p>
					<button class="resp_btn" style="color:green;" id="acc_btn">Accept Order</button>
					<button class="resp_btn" style="color:red;" id="rej_btn">Reject Order</button>
				</p>
				`);
			}
		});
	}).fail((err) => {
		console.log('error');
	});
	$.get('/client-in-orders').done((data, status) => {
		console.log(data);
	}).fail((err) => {
		console.log('error');
	});
});
