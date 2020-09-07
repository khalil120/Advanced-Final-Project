function show() {
	$('#lease_cars_div').append($('<div class="cars_container">\n'
    + '                <img class="cars_image" src="public/images/test1.png" height="150" width="100%"/>\n'
    + '                <p class="cars_price" >189₪ per day </p>\n'
    + '                <p class="cars_name" >Hyundai IONIQ Electric</p>\n'
    + '                <p class="cars_desc" >5 Adults, 3 bags</p>\n'
    + '                <p class="available" >Available!</p>\n'
    + '                <button class="cars_order" data-toggle="modal" data-target="#DealModal"  onclick="showDeal()" >Show deal</button>\n'
    + '            </div>'));
	$('#Price-div').append('300');
	const carType = $('#csearch').val();
	const searchType = $('.car-list option:selected').val();
	let url;
	if (searchType === 'Buy') url = '/show-buy';
	else url = '/show-rent';
	// $('#lease_cars_div').html('');
	$('#sale_cars_div').html('');
	$.post(url, { carType }, 'json').done((res, status) => {
		if (url === '/show-buy') divName = '#sale_cars_div';
		else divName = '#lease_cars_div';
		console.log(res);
		console.log(res.file);
		$.each(res, (index, item) => {
			$(divName).append(`<div class="cars_container" id="${item.filename}">
               <img class="cars_image" src="public/img/${item.filename}" height="150" width="100%"/>
                <p class="cars_price" >${item.price}</p>
               <p class="cars_name" >${item.model}</p>
                <p class="cars_desc" >${item.seats} Adults, ${item.bags} bags</p>
               <p class="available" >Available!</p>
                <button class="cars_order">Show deal</button>
                </div>`);
		});
	}).fail((res) => {
		alert('error!');
	});
}
function showDeal() {

}
function getSelect() {
	const container = document.getElementById('infoC');
	container.style.height = '400px';
	container.style.background = '#0a5b79';
	const selected = document.getElementById('cars');

	if (selected.options[selected.selectedIndex].value == 'Buy') {
		document.getElementById('inner-lease').style.display = 'contents';
		document.getElementById('carModel').style.display = 'inline-block';
	} else if (selected.options[selected.selectedIndex].value == 'Lease') {
		document.getElementById('inner-lease').style.display = 'contents';
		document.getElementById('carModel').style.display = 'none';
	}
}
