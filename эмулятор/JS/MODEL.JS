'use strict'

let model = {
	init: function() {
		data.inLine = [''];
		data.inCurr = 0;
		data.memLine = [];
		for (let i = 0; i < 100; i++) {
			data.memLine[i] = '';
		};
		data.memCurr = 0;
		data.outLine = [];
		for (let i = 0; i < 100; i++) {
			data.outLine[i] = '';
		};
		data.outCurr = 0;
		data.T = '';
		data.A = '';
	},
	parser: function(str) {
		data.inLine = [];
		while (str) {
			while (str[0] == ' ') {
				str = str.substr(1, str.length);
			}
			let pos = str.indexOf(" ");
			if (pos < 0) pos = str.length;
			data.inLine.push(str.substr(0, pos).toUpperCase());
			str = str.substr(pos + 1, str.length);
		}
		data.inLine.push('');
	},
	step: function () {
		let t = data.inLine[data.inCurr];
		if (t !== '') {
			if ((t.substr(0,2) == '?N' && data.A < 0) ||
				(t.substr(0,2) == '?Z' && data.A == 0) ||
				(t.substr(0,2) == '?P' && data.A > 0)) {
					t = t.substr(2, t.length);
			}
			if (t == +t) {
				data.T = +t;
			} else if (t == 'AT') {
				data.T = data.A;
			} else if (t == 'MT') {
				data.T = data.memLine[data.memCurr];
			} else if (t == 'TA') {
				data.A = data.T;
			} else if (t == 'TM') {
				data.memLine[data.memCurr] = data.T;
			} else if (t == 'TO') {
				data.outLine[data.outCurr] = data.T;
			} else if (t == 'SUB') {
				data.A -= data.T;
			} else if (t == 'ADD') {
				data.A += data.T;
			} else if (t == 'MUL') {
				data.A *= data.T;
			} else if (t == 'DIV') {
				data.A = data.A / data.T >> 0;
			}
			view.change();
			if (t == 'JI') {
				data.inCurr += data.T;
			} else {
				data.inCurr++;
			}
			if (t == 'JM') {
				data.memCurr += data.T;
			}
			if (t == 'TO') {
				data.outCurr++;
			}
			view.move();
		}
	}
};