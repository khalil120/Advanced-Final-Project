/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
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
				$.each(res, (index, item) => {
					$(divName).append(`<div class="cars_container" id="${item.filename}">
					<img class="cars_image" src="../img/${item.filename}" height="150" width="100%"/>
			   		<p class="cars_name" >${item.carModel}</p>
                	<p class="cars_desc" >${item.seats} Adults, ${item.airBags} bags</p>
			   		<p class="available" >Available!</p>
			   		<p class="cars_price" ><b>price:</b>${item.price}</p>
                	<button class="cars_order" id = "${item._id}" onclick="orderNow(${item}, ${url})">Order now</button>
                	</div>`);
					$('#Price-div').append(item.price);
					$('#Model-div').append(item.carModel);
					$('#Year-div').append(item.roadEntry);
					$('#Gearbox-div').append(item.gearBox);
					$('#Color-div').append(item.carColor);
					$('#Seats-div').append(item.seats);
					$('#Bags-div').append(item.airBags);
					$('#Available-div').append('Yes');
				});
			}).fail((res) => {
				alert('error!');
			});
		} else { // url = /show-rent
			divName = '#lease_cars_div';
			$.post(url, {
				startDate, endDate, minPrice, maxPrice,
			}, 'json').done((res, status) => {
				console.log(`the response is: ${res}`);
				$.each(res, (index, item) => {
					console.log(item._id);
					$(divName).append(`<div class="cars_container" id = "${item.filename}">
					<img class="cars_image" src="../img/${item.filename}" height="150" width="100%"/>
					<p class="cars_name" >${item.carModel}</p>
					<p class="cars_desc" >${item.seats} Adults, ${item.airBags} bags</p>
					<p class="cars_leas_date">From Date: ${item.fromDate} to Date: ${item.toDate}</p>
					<p class="available" >Available!</p>
					<p class="cars_price" ><b>Price per Day:</b>${item.priceDay}</p>
				 	<button class="cars_order" id = "${item._id}" onclick="orderNow(${item}, ${url})">Order now</button>
					</div>`);
					$('#Price-div').append(item.priceDay);
					$('#Model-div').append(item.carModel);
					$('#Year-div').append(item.roadEntry);
					$('#Gearbox-div').append(item.gearBox);
					$('#Color-div').append(item.carColor);
					$('#Seats-div').append(item.seats);
					$('#Bags-div').append(item.airBags);
					$('#Available-div').append('Yes');
				});
			}).fail((res) => {
				alert('error!');
			});
		}
	});
});

function show() {
	if (flag == 0) {
		flag = 1;
		$('#lease_cars_div').append($('<div class="cars_container">\n'
            + '                <img class="cars_image" src="public/images/test1.png" height="150" width="100%"/>\n'
            + '                <p class="cars_price" >189₪ per day </p>\n'
            + '                <p class="cars_name" >Hyundai IONIQ Electric</p>\n'
            + '                <p class="cars_desc" >5 Adults, 3 bags</p>\n'
            + '                <p class="available" id="available_car">Available!</p>\n'
            + '                <p class="cars_desc" id="year_car" style="display:none;">Year : 2017</p>\n'
            + '                <p class="cars_desc" id="gearbox_car" style="display:none;">Gearbox : automatic</p>\n'
            + '                <p class="cars_desc" id="color_car" style="display:none;">Color : black</p>\n'
            + '                <button class="cars_order" id="showDeal" data-toggle="modal" data-target="#DealModal" onclick="showDeal()" >Show deal</button>\n'
            + '            </div>'
            + '                <div class="cars_container">\n'
            + '                <img class="cars_image" src="public/images/test1.png" height="150" width="100%"/>\n'
            + '                <p class="cars_price" >189₪ per day </p>\n'
            + '                <p class="cars_name" >Hyundai IONIQ Electric</p>\n'
            + '                <p class="cars_desc" >5 Adults, 3 bags</p>\n'
            + '                <p class="available" id="available_car">Available!</p>\n'
            + '                <p class="cars_desc" id="year_car" style="display:none;">Year : 2017</p>\n'
            + '                <p class="cars_desc" id="gearbox_car" style="display:none;">Gearbox : automatic</p>\n'
            + '                <p class="cars_desc" id="color_car" style="display:none;">Color : black</p>\n'
            + '                <button class="cars_order" id="showDeal" data-toggle="modal" data-target="#DealModal" onclick="showDeal()" >Show deal</button>\n'
            + '            </div>'));
		$('#Price-div').append('189₪');
		$('#Model-div').append('Hyundai IONIQ Electric');
		$('#Year-div').append('2019');
		$('#Gearbox-div').append('Automatic');
		$('#Color-div').append('White');
		$('#Seats-div').append('5 Adults');
		$('#Bags-div').append('3 Bags');
		$('#Available-div').append('Yees');
	}
}

function orderNow(item, dealType) {
	// item is equal to the selcted car
	// dealType to be buy or rent
	let action;
	let priceMsg;
	const orderData = new FormData();
	if (dealType === '/show-buy') {
		action = 'buy';
		priceMsg = `${item.price}NIS`;
	} else {
		action = 'rent';
		priceMsg = `${item.priceDay}NIS per day`;
	}
	const conf = window.confirm(`please confirm to ${action} ${item.carModel} ${priceMsg}`);
	if (conf) {
		orderData.append('car_id', item._id);
		orderData.append('action', action);
		orderData.append('response', 'not yet');
		orderData.append('owner', item.username);
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
		window.alert('your Order not completed...');
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
