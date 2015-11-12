var EMOJIHANDLER = EMOJIHANDLER || new emojiHandler();
// http://apps.timwhitlock.info/emoji/tables/unicode  - refer surrogate

function emojiHandler(){
	var input;
	var os;
	var emojiStore;
	var active = false;
}


emojiHandler.prototype.addInputById = function(id){
	this.input = document.getElementById(id);
}

emojiHandler.prototype.addInputByElem = function(elem){
	if(elem instanceof $){
		elem = elem[0];
	}
	this.input = elem;
}

emojiHandler.prototype.detectOS = function(){
	this.os = navigator.appVersion;
}

emojiHandler.prototype.initStore = function(){
	this.emojiStore = {};
}

emojiHandler.prototype.init = function(){
	this.detectOS();
	this.initStore();
	this.active = false;
	this.addCheckBox();
}

emojiHandler.prototype.addCheckBox = function(){
	var parentNode = this.input.parentNode;
	console.log(parentNode);
	var span = document.createElement('span');
	var checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.id = 'use_emoji';
	checkbox.addEventListener('click', function(){
		EMOJIHANDLER.active = this.checked;
	}, false);
	
	span.innerText = 'Use Emoji?';
	span.appendChild(checkbox);
	
	parentNode.appendChild(span);
}

emojiHandler.prototype.start = function(){
	if(isEmpty(this.input)){
		console.error('Oh! You may miss to set target input.' 
				+ 'Call EMOJIHANDLER.addInputById or' 
				+ ' EMOJIHANDLER.addInputByElem.');
	}
	
	this.init();
	if(this.os.indexOf('Mac')){
		this.loadIOSEmoji();
		this.input.addEventListener('keyup', detectAndReplace, false);	
	}else if(this.os.indexOf('Windows')){

	}else if(this.os.indexOf('Linux')){

	}else if(this.os.indexOf('Unix')){

	}else{
		//Unknown OS
	}
}

/* Data Storage */
emojiHandler.prototype.loadIOSEmoji = function(){
	this.emojiStore.osx = {
			//smile
			':-)' : '\ud83d\ude03'
			, '^^' : '\ud83d\ude03'
			, '^_^' : '\ud83d\ude03'
			, ':)' : '\ud83d\ude03'
			, ':D' : '\ud83d\ude03'
			//frawn
//			, ':\' : '\ud83d\ude1e'
			, ':(' : '\ud83d\ude1e'
			//crying
			, 'T^T' : '\ud83d\ude22'
			, 'T_T' : '\ud83d\ude22'
			, 'ㅜㅜ' : '\ud83d\ude22'
			, 'ㅠㅠ' : '\ud83d\ude22'
			//poo 
			, 'shit' : '\ud83d\udca9'
			, '똥' : '\ud83d\udca9'
	};
}

/* keyup Event Handler */
function detectAndReplace(){
	if(!EMOJIHANDLER.active) return;
	var value = this.value;
	value = value.substring(value.length - 5, value.length);
	var emojiList = EMOJIHANDLER.emojiStore.osx;
	console.log(emojiList);
	for(var key in emojiList){
		var index = -1;
		if((index = value.indexOf(key)) > -1){
			console.log(value);
			this.value = 
				this.value.substring(0, this.value.length - (key.length)) + emojiList[key];
		}
	}
}

function isEmpty(value){
	if(value != null || typeof value != 'undefined') return false;
	else return true;
}


function getUTF8Length (string) {
    var utf8length = 0;
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utf8length++;
        }
        else if((c > 127) && (c < 2048)) {
            utf8length = utf8length+2;
        }
        else {
            utf8length = utf8length+3;
        }
    }
    return utf8length;
 }

