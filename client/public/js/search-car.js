$(document).ready(() => {
	$(document).on('click', '.inner-div-button', () => {
		const carType = $('#csearch').val();
		const searchType = $('.car-list option:selected').val();
		let url;
		if (searchType === 'Buy') url = '/show-buy';
		else url = '/show-rent';
		$('#lease_cars_div').html('');
		$('#sale_cars_div').html('');
		$.post(url, { carType }, 'json').done((res, status) => {
			if (url === '/show-buy') divName = '#sale_cars_div';
			else divName = '#lease_cars_div';
			console.log(res);

			$.each(res, (index, item) => {
				$(divName).append(`<div class="cars_container" id="${item.filename}">
               <img class="cars_image" src="public/img/${item.filename}" height="150" width="100%"/>
                <p class="cars_price" >${item.price}</p>
               <p class="cars_name" >${item.model}</p>
                <p class="cars_desc" >${item.seats} Adults, ${item.bags} bags</p>
               <p class="available" >Available!</p>
                <button class="cars_order" >Show deal</button>
                </div>`);
			});
		}).fail((res) => {
			alert('error!');
		});
	});
});

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
