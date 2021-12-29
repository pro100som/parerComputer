'use strict'

let WIDTH = 100,
	HEIGHT = 100,
	MEMSTART = 400,
	INSTART = 167,
	TIME = 500,
	FRAMES = 50;

let view = {
	timerID: '',
	lines: {
		IN: '',
		MEM: '',
		OUT: '',
		T: '',
		A: '',
	},
	createElement: function (eTag, eParent, eClass, eHtml){
		eTag = eTag || 'div';
		eParent = eParent || document.body;
		let el = document.createElement(eTag);
		eParent.appendChild(el);
		if (eClass)
			if (typeof eClass == 'string') el.classList.add(eClass);
			else
				for (let i=0; i < eClass.length; i++) el.classList.add(eClass[i]);
		if (eHtml) el.innerHTML = eHtml;
		return el;
	},
	init: function (target) {
		this.lines.IN = target.getElementsByClassName('processor__strip--inp')[0];
		this.lines.MEM = target.getElementsByClassName('processor__strip--mem')[0];
		this.lines.OUT = target.getElementsByClassName('processor__strip--out')[0];
		this.lines.T = target.getElementsByClassName('processor__strip--T')[0];
		this.lines.A = target.getElementsByClassName('processor__strip--A')[0];
	},
	clear: function () {
		this.lines.IN.innerHTML = '';
		this.lines.MEM.innerHTML = '';
		this.lines.OUT.innerHTML = '';
		this.lines.T.innerHTML = '';
		this.lines.A.innerHTML = '';
	},
	build: function () {
		this.clear();
		this.lines.IN.style.top = INSTART + 'px';
		this.lines.MEM.style.left = MEMSTART + 'px';
		this.lines.OUT.style.top = INSTART + 'px';
		this.lines.T.innerHTML = data.T;
		this.lines.A.innerHTML = data.A;
		for (let i = 0; i < data.inLine.length; i++) {
			let el = this.createElement('div',
						  this.lines.IN,
						  ["processor__strip", "processor__strip--inp"]);
			el.style.top = - i * HEIGHT + "px";
			this.createElement ('div',
						   el,
						   ["processor__num", "processor__num--inp"],
						   '' + i);
			this.createElement ('div',
						   el,
						   ["processor__data", "processor__data--inp"],
						   data.inLine[i]);
		};
		for (let i = 0; i < data.memLine.length; i++) {
			let el = this.createElement('div',
						  this.lines.MEM,
						  ["processor__strip", "processor__strip--mem"]);
			el.style.left = i * WIDTH + "px";
			this.createElement ('div',
						   el,
						   ["processor__num", "processor__num--mem"],
						   '' + i);
			this.createElement ('div',
						   el,
						   ["processor__data", "processor__data--mem"],
						   data.memLine[i]);
		};
		for (let i = 0; i < data.outLine.length; i++) {
			let el = this.createElement('div',
						  this.lines.OUT,
						  ["processor__strip", "processor__strip--out"]);
			el.style.top = - i * HEIGHT + "px";
			this.createElement ('div',
						   el,
						   ["processor__num", "processor__num--out"],
						   '' + i);
			this.createElement ('div',
						   el,
						   ["processor__data", "processor__data--out"],
						   data.outLine[i]);
		};
	},
	move: function () {
		clearInterval(this.timerID);
		let startTime = Date.now();
		let inStart = +this.lines.IN.style.top.slice(0, -2);
		let inEnd = INSTART + data.inCurr * HEIGHT;
		let inStep = (inEnd - inStart) / FRAMES;
		let memStart = +this.lines.MEM.style.left.slice(0, -2);
		let memEnd = MEMSTART - data.memCurr * WIDTH;
		let memStep = (memEnd - memStart) / FRAMES;
		let outStart = +this.lines.OUT.style.top.slice(0, -2);
		let outEnd = INSTART + data.outCurr * HEIGHT;
		let outStep = (outEnd - outStart) / FRAMES;
		this.timerID = setInterval(function() {
			if (startTime + TIME < Date.now()) {
				clearInterval(view.timerID);
				view.lines.IN.style.top = inEnd + 'px';
				view.lines.MEM.style.left = memEnd + 'px';
				view.lines.OUT.style.top = outEnd + 'px';
			} else {
				inStart += inStep;
				memStart += memStep;
				outStart += outStep;
				view.lines.IN.style.top = inStart + 'px';
				view.lines.MEM.style.left = memStart + 'px';
				view.lines.OUT.style.top = outStart + 'px';
			};
		}, TIME / FRAMES)
	},
	change: function () {
		this.lines.MEM.getElementsByClassName('processor__data')[data.memCurr].innerHTML = data.memLine[data.memCurr];
		this.lines.OUT.getElementsByClassName('processor__data')[data.outCurr].innerHTML = data.outLine[data.outCurr];
		this.lines.T.innerHTML = data.T;
		this.lines.A.innerHTML = data.A;
	},
};