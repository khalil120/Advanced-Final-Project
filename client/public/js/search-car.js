function show() {
	$('#lease_cars_div').append($('<div class="cars_container">\n'
    + '                <img class="cars_image" src="public/images/test1.png" height="150" width="100%"/>\n'
    + '                <p class="cars_price" >189₪ per day </p>\n'
    + '                <p class="cars_name" >Hyundai IONIQ Electric</p>\n'
    + '                <p class="cars_desc" >5 Adults, 3 bags</p>\n'
    + '                <p class="available" >Available!</p>\n'
    + '                <button class="cars_order" >Show deal</button>\n'
    + '            </div>'
    + '                <div class="cars_container">\n'
    + '                <img class="cars_image" src="public/images/test1.png" height="150" width="100%"/>\n'
    + '                <p class="cars_price" >189₪ per day </p>\n'
    + '                <p class="cars_name" >Hyundai IONIQ Electric</p>\n'
    + '                <p class="cars_desc" >5 Adults, 3 bags</p>\n'
    + '                <p class="available" >Available!</p>\n'
    + '                <button class="cars_order" >Show deal</button>\n'
    + '            </div>'
    + '                 <div class="cars_container">\n'
    + '                <img class="cars_image" src="public/images/test1.png" height="150" width="100%"/>\n'
    + '                <p class="cars_price" >189₪ per day </p>\n'
    + '                <p class="cars_name" >Hyundai IONIQ Electric</p>\n'
    + '                <p class="cars_desc" >5 Adults, 3 bags</p>\n'
    + '                <p class="available" >Available!</p>\n'
    + '                <button class="cars_order" >Show deal</button>\n'
    + '            </div>'
    + '                 <div class="cars_container">\n'
    + '                <img class="cars_image" src="public/images/test1.png" height="150" width="100%"/>\n'
    + '                <p class="cars_price" >189₪ per day </p>\n'
    + '                <p class="cars_name" >Hyundai IONIQ Electric</p>\n'
    + '                <p class="cars_desc" >5 Adults, 3 bags</p>\n'
    + '                <p class="available" >Available!</p>\n'
    + '                <button class="cars_order" >Show deal</button>\n'
    + '            </div>'
    + '                 <div class="cars_container">\n'
    + '                <img class="cars_image" src="public/images/test1.png" height="150" width="100%"/>\n'
    + '                <p class="cars_price" >189₪ per day </p>\n'
    + '                <p class="cars_name" >Hyundai IONIQ Electric</p>\n'
    + '                <p class="cars_desc" >5 Adults, 3 bags</p>\n'
    + '                <p class="available" >Available!</p>\n'
    + '                <button class="cars_order" >Show deal</button>\n'
    + '            </div>'));
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
