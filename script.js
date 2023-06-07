let fields = ['Parasha', 'HadlakatNerotNextShabbat', 'MotzeyShabatNextShabbat'];
let hebFields = ['', 'הדלקת נרות', 'צאת שבת'];

let mainDiv = document.querySelector('.main-div');
let data = [];
let timeToNextDate = 0;

let firstDateInFile = new Date('09/26/2022');
let index = getCurrDateAsIndex(firstDateInFile);
fetchData(index);
changeDataDaily();

function fetchData(index) {
	fetch('./excel-to-json.json')
		.then(response => {
			return response.json();
		})
		.then(res => {
			data = res[index];
			createPage();
		});
}

function getCurrDateAsIndex(date1) {
	const date2 = new Date();
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays - 1;
}

function calcTimeToNextDate() {
	var today = new Date();
	var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
	tomorrow.setHours(0);
	tomorrow.setMinutes(0);
	tomorrow.setSeconds(0);
	tomorrow.setMilliseconds(0);
	var diff = tomorrow.getTime() - today.getTime();
	return diff;
}

function changeDataDaily() {
	setTimeout(() => {
		let firstDateInFile = new Date('09/26/2022');
		let index = getCurrDateAsIndex(firstDateInFile);
		fetchData(index);
		setInterval(() => {
			let firstDateInFile = new Date('09/26/2022');
			let index = getCurrDateAsIndex(firstDateInFile);
			fetchData(index);
		}, 24 * 60 * 60 * 1000);
	}, calcTimeToNextDate());
}

function createPage() {
	for (let i = 0; i < fields.length; i++) {
		let div = document.createElement('div');
		div.className = 'data-container ' + fields[i];
		// let name = document.createElement('div');
		// name.innerText = hebFields[i];
		let value = document.createElement('div');
		let temp = data[fields[i]];
		if (temp.match('^([0-9]{2}/){2}[0-9]{4}')) temp = temp.slice(10);
		value.innerText = temp;
		// div.appendChild(name);
		div.appendChild(value);
		mainDiv.appendChild(div);
	}
}
