'use strict'

let data = {
	inLine: [],
	inCurr: 0,
	memLine: [],
	memCurr: 0,
	outLine: [],
	outCurr: 0,
	A: '',
	T: '',
};
document.addEventListener("DOMContentLoaded", function(){
	view.init(document.body);
	model.init();
	view.build();
	controller.init(document.body);
});