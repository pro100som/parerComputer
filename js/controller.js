'use strict'

let controller = {
	inp: '',
	startClick: function() {
		model.init();
		model.parser(controller.inp.value);
		view.build();
	},
	inputEnter: function(event) {
		event.preventDefault();
		if (event.keyCode == 13) {
			controller.startClick();
		}
	},
	step: function() {
		model.step();
	},
	init: function (target) {
		this.inp = target.getElementsByClassName('processor__input')[0];
		target.getElementsByClassName('processor__button')[0]
			  .addEventListener('click',controller.startClick);
		target.getElementsByClassName('processor__image')[0]
			  .addEventListener('click',controller.step);
		target.getElementsByClassName('processor__input')[0]
			  .addEventListener('keyup', controller.inputEnter);
	},
};