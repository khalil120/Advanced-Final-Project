/* eslint-disable linebreak-style */
/* eslint-disable no-array-constructor */
/* eslint-disable no-underscore-dangle */
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
		console.log('out orders');
		console.log(data);

		data.array.forEach((element) => {
			if (element.action === 'sale') {
				// if the request response is not yet enable the buttons
				const active = (element.response === 'not yet');
				// element._id is equal to the order id and diffrent from carID
				$('#client-request-car-sale').append(`<div class="cars_container id="${element.carID}" >
				<p class="cars_name" >${element.model}</p>
				<p class="order_type" > <b>Order type: Buy </b></p>
				<p class="car_owner" > <b>car owner:  ${element.owner} </b></p>
				<p class="order_status" ><b>Order Status: ${element.response}</b></p>
				<p>
					<button class="resp_btn" style="color:green; id="acc_btn_${element._id}" " >Accept Order</button>
					<button class="resp_btn" style="color:red;" id="rej_btn_${element._id}" >Reject Order</button>
					<script>
						document.getElementById("acc_btn_${element._id}").disabled = active;
						document.getElementById("rej_btn_${element._id}").disabled = active;
					</script>
				</p>
				`);
			} else {
				// element._id is equal to the order id and diffrent from carID
				$('#client-request-car-rent').append(`<div class="cars_container id="${element.carID}" >
				<p class="cars_name" >${element.model}</p>
				<p class="order_type" > <b>Order type: Rent </b></p>
				<p class="car_owner" > <b>car owner:  ${element.owner} </b></p>
				<p class="order_status" ><b>Order Status: ${element.response}</b></p>
				<p>
					<button class="resp_btn" style="color:green;" id="acc_btn_${element._id}">Accept Order</button>
					<button class="resp_btn" style="color:red;" id="rej_btn_${element._id}">Reject Order</button>
					<script>
						document.getElementById("acc_btn_${element._id}").disabled = active;
						document.getElementById("rej_btn_${element._id}").disabled = active;
					</script>
				</p>
				`);
			}
		});
	}).fail((err) => {
		console.log('error', err);
	});
	$.get('/client-in-orders').done((data, status) => {
		// user income orders
		console.log('income orders: ');
		console.log(data);

		data.array.forEach((element) => {
			// if the request response is not yet enable the buttons
			const active = (element.response === 'not yet');
			if (element.action === 'sale') {
				// element._id is equal to the order id and diffrent from carID
				$('#client-receive-sale-request').append(`<div class="cars_container id="${element.carID}" >
						<p class="cars_name" >${element.model}</p>
						<p class="order_type" > <b>Order type: Buy </b></p>
						<p class="car_owner" > <b>Request from:  ${element.username} </b></p>
						<p class="order_status" ><b>Order Status: ${element.response}</b></p>
						<p>
							<button class="resp_btn" id="acc_btn_${element._id}" style="color:green;" >Accept Order</button>
							<button class="resp_btn" id="rej_btn_${element._id}" style="color:red;" >Reject Order</button>
							<script>
								document.getElementById("acc_btn_${element._id}").disabled = active;
								document.getElementById("rej_btn_${element._id}").disabled = active;
							</script>
						</p>
						`);
			} else {
				// element._id is equal to the order id and diffrent from carID
				$('#client-receive-rent-request').append(`<div class="cars_container id="${element.carID}" >
						<p class="cars_name" >${element.model}</p>
						<p class="order_type" > <b>Order type: Rent </b></p>
						<p class="car_owner" > <b>Request from:  ${element.username} </b></p>
						<p class="order_status" ><b>Order Status: ${element.response}</b></p>
						<p>
							<button class="resp_btn" style="color:green;" id="acc_btn_${element._id}">Accept Order</button>
							<button class="resp_btn" style="color:red;" id="rej_btn_${element._id}">Reject Order</button>
							<script>
								document.getElementById("acc_btn_${element._id}").disabled = active;
								document.getElementById("rej_btn_${element._id}").disabled = active;
							</script>
						</p>
						`);
			}
		});
	}).fail((err) => {
		console.log('error');
	});

	$(document).on('click', '.resp_btn', () => {

	});
});
