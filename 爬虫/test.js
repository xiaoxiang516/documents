var text = '';
var resultArray = [];
var Ajax = {
	get: function (url, fn) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
				fn.call(this, xhr.responseText);
			}
		};
		xhr.send();
	}
}

function nextPage(syncTag) {
	var url = 'https://i.mi.com/note/full/page/?ts=' + (new Date()).getTime() + '&limit=200';
	if (syncTag) {
		url += '&syncTag=' + syncTag;
	}
	Ajax.get(url,function (r) {
		console.log('潇湘')
		console.log( r)
	});
}


nextPage();