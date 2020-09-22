/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-array-constructor */
/* eslint-disable radix */

const items = new Array(); /// this array contain items list

$(document).ready(() => {
	$(document).on('click', '.inner-div-button', () => {
		const carType = $('#csearch').val();
		const searchType = $('.car-list option:selected').val();
		const startDate = $('#fromDate').val();
		const endDate = $('#toDate').val();
		const minPrice = $('#fromPrice').val();
		const maxPrice = $('#toPrice').val();
		let url;
		if (searchType === 'Buy') url = '/show-buy';
		else url = '/show-rent';
		$('#lease_cars_div').html('');
		$('#sale_cars_div').html('');
		if (url === '/show-buy') {
			$.post(url, { carType }, 'json').done((res, status) => {
				divName = '#sale_cars_div';
				let i = 0;
				$.each(res, (index, item) => {
					items.push(item);
					console.log(item);
					$(divName).append(`<div class="cars_container" id="${item.filename}">
					<img class="cars_image" src="../img/${item.filename}" height="150" width="100%"/>
			   		<p class="cars_name" >${item.carModel}</p>
                	<p class="cars_desc" >${item.seats} Adults, ${item.airBags} bags</p>
			   		<p class="available" >Available!</p>
			   		<p class="cars_price" ><b>price:</b>${item.price}</p>
                	<button class="cars_order" id = "${i}" >Order now</button>
                	</div>`);
					$('#Price-div').append(item.price);
					$('#Model-div').append(item.carModel);
					$('#Year-div').append(item.roadEntry);
					$('#Gearbox-div').append(item.gearBox);
					$('#Color-div').append(item.carColor);
					$('#Seats-div').append(item.seats);
					$('#Bags-div').append(item.airBags);
					$('#Available-div').append('Yes');
					i++;
				});
				$('button').click(function () {
					console.log(this.id);
					if (this.id != 'show-btn') {
						orderNow(this.id);
					}
				});
			}).fail((res) => {
				alert('error!');
			});
		} else { // url = /show-rent
			divName = '#lease_cars_div';
			$.post(url, {
				startDate, endDate, minPrice, maxPrice,
			}, 'json').done((res, status) => {
				let i = 0;
				$.each(res, (index, item) => {
					items.push(item);
					console.log(item);
					$(divName).append(`<div class="cars_container" id = "${item.filename}">
					<img class="cars_image" src="../img/${item.filename}" height="150" width="100%"/>
					<p class="cars_name" >${item.carModel}</p>
					<p class="cars_desc" >${item.seats} Adults, ${item.airBags} bags</p>
					<p class="cars_leas_date">From Date: ${item.fromDate} to Date: ${item.toDate}</p>
					<p class="available" >Available!</p>
					<p class="cars_price" ><b>Price per Day:</b>${item.priceDay}</p>
				 	<button class="cars_order" id = "${i}" >Order now</button>
					</div>`);
					$('#Price-div').append(item.priceDay);
					$('#Model-div').append(item.carModel);
					$('#Year-div').append(item.roadEntry);
					$('#Gearbox-div').append(item.gearBox);
					$('#Color-div').append(item.carColor);
					$('#Seats-div').append(item.seats);
					$('#Bags-div').append(item.airBags);
					$('#Available-div').append('Yes');
					i++;
				});
				$('button').click(function () {
					console.log(this.id);
					if (this.id != 'show-btn') {
						orderNow(this.id);
					}
				});
			}).fail((res) => {
				alert('error!');
			});
		}
	});
});

function orderNow(index) {
	// index is equal the the index of the car in the array
	const order = items[parseInt(index)];

	console.log('selected car details: ');
	console.log(order);

	let action;
	let priceMsg;

	if (order.action === 'sale') {
		action = 'buy';
		priceMsg = `${order.price.toString()} NIS`;
	} else {
		action = 'rent';
		actionMsg = ` ${order.priceDay.toString()} NIS per day`;
	}

	const orderData = new FormData();

	const conf = window.confirm(`please confirm to ${action} ${order.carModel} ${priceMsg}`);

	// const conf = window.confirm(`please confirm to ${action}  ${priceMsg}`);

	if (conf) {
		const carID = order._id;
		const owner = order.username;
		const resp = 'not yet';
		orderData.append('car_id', carID);
		orderData.append('action', action);
		orderData.append('response', resp);
		orderData.append('owner', owner);
		$.ajax({
			type: 'POST',
			url: '/insert-order',
			data: orderData,
			processData: false,
			contentType: false,
		}).done((res) => {
			window.alert('your Order sent to the car owner');
		}).fail((res) => {
			alert('an error accured try again later...');
		});
	} else {
		window.alert('your Order Canceld...');
	}
}

function showDeal() {
	/* document.getElementById('available_car').style.display = 'none';
	document.getElementById('year_car').style.display = 'contents';
	document.getElementById('gearbox_car').style.display = 'contents';
	document.getElementById('color_car').style.display = 'contents';
    document.getElementById('showDeal').textContent = 'Order'; */
	document.getElementById('showDeal').style.backgroundColor = 'gray';
}

function doneDeal() {
	document.getElementById('showDeal').style.backgroundColor = 'red';
}

function order() {
	document.getElementById('order-msg').textContent = 'Your order is completed!';
	document.getElementById('order-msg').style.color = 'green';
}

function getSelect() {
	const container = document.getElementById('infoC');
	container.style.height = '400px';
	container.style.background = '#0a5b79';
	const selected = document.getElementById('cars');

	if (selected.options[selected.selectedIndex].value == 'Buy') {
		document.getElementById('inner-lease').style.display = 'contents';
		document.getElementById('csearch').style.display = 'inline';
		document.getElementById('csearch-label').style.display = 'inherit';
	} else if (selected.options[selected.selectedIndex].value == 'Lease') {
		document.getElementById('inner-lease').style.display = 'contents';
		document.getElementById('csearch').style.display = 'none';
		document.getElementById('csearch-label').style.display = 'none';
	}
}
