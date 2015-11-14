var EMOJIHANDLER = EMOJIHANDLER || new emojiHandler();
// http://apps.timwhitlock.info/emoji/tables/unicode  - refer surrogate
const MINLENGTH = 2;
const MAXLENGTH = 7;

function emojiHandler(){
	var input;
	var os;
	var emojiStore;
	var active = false;
	var fileUrl;
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

emojiHandler.prototype.addFileUrl = function(url){
	this.fileUrl = url;
}

emojiHandler.prototype.init = function(){
	this.detectOS();
	this.initStore();
	this.active = false;
	this.addCheckBox();
}

emojiHandler.prototype.addCheckBox = function(){
	var parentNode = this.input.parentNode;
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
	try{
		
		if(isEmpty(this.input)){
			console.error('Oh! You may miss to set target input.' 
					+ 'Call EMOJIHANDLER.addInputById or' 
					+ ' EMOJIHANDLER.addInputByElem.');
		}
		
		this.init();
		if(this.os.indexOf('Mac') > -1){
			this.loadIOSEmoji();
			this.input.addEventListener('keyup', detectAndReplace, false);	
		}else if(this.os.indexOf('Windows') > -1){
			this.loadIOSEmoji();
			this.input.addEventListener('keyup', detectAndReplace, false);	
			
		}else if(this.os.indexOf('Linux') > -1){
			
		}else if(this.os.indexOf('Unix') > -1){
			
		}else{
			//Unknown OS
		}
	}catch(exception){
		console.error('Can not print emoji. T^T : ' + exception);
	}
}

/* Data Storage */
emojiHandler.prototype.loadIOSEmoji = function(){
	if(isEmpty(this.fileUrl)){
		//Default Emoji
		this.emojiStore.osx = {
				//smile
				':-)' : '\ud83d\ude03'
				, '^^' : '\ud83d\ude03'
				, '^_^' : '\ud83d\ude03'
				, ':)' : "\ud83d\ude03"
				, ':D' : '\ud83d\ude03'
				//frawn
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
	}else{
		this.emojiStore.osx = loadFile(this.fileUrl);
	}
}

/* keyup Event Handler */
function detectAndReplace(){
	if(!EMOJIHANDLER.active) return;
	var value = this.value;
	var emojiList = EMOJIHANDLER.emojiStore.osx;
	
	if(value.length >= MINLENGTH){
		for(var i = MINLENGTH; i < MAXLENGTH; i++){
			value = this.value.substring(this.value.length - i, this.value.length);
			console.log(value);
			for(var key in emojiList){
				var index = -1;
				if(value == key){
					index = value.indexOf(key)
					this.value = 
						this.value.substring(0, this.value.length - (key.length)) + emojiList[key];
					return;
				}
			}
		}
	}
}

function isEmpty(value){
	if(value != null || typeof value != 'undefined') return false;
	else return true;
}

function loadFile(url){
	console.log(1);
	console.log(document.ReadURL.readFile(url));
	console.log(document.ReadURL.fileContent);

	var ret = {};
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                var textByLine = allText.split('\n');
                for(var i = 0; i < textByLine.length; i++){
                	if(textByLine[i].trim().length < 1) continue;
                	var key = textByLine[i].split(',')[0].trim();
                	var value = textByLine[i].split(',')[1].trim();
                	ret[key] = parseUnicode(value);
                }
            }
        }
    };
    rawFile.send(null);
    return ret;
}

function parseUnicode(str){
	var r = /\\u([\d\w]{4})/gi;
	str = str.replace(r, function (match, grp) {
	    return String.fromCharCode(parseInt(grp, 16)); } );
	return str;
}
