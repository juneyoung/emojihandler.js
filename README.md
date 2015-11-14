# EmojiHandler 
by <b>Juneyoung Oh</b><br>
Writen in 12.NOV.15<br>
<a href='README.kr.md'>KOR</a>

~~Currently this project <b>only supports OSX.</b>~~<br>
~~Please, wait for other operating systems.~~<br>
It supports OSX as well as Windows.<br>
I did not test on Linux, Unix and 32 bits system :-)<br>

## How to Use
### Basic
``` javascript
	EMOJIHANDLER.addInputById('textinp');
	EMOJIHANDLER.start();
```
### Advanced : refering dictionary file.
Caution : adding file system can not refer 'file:///', since javascript security policy.<br>
(As you know native js can not access to local file system)
##### Requirements :
- Dictionary file
- A line of code
A dictionary file looks like follow
``` code
:-),\ud83d\ude03
^^,\ud83d\ude03
^_^,\ud83d\ude03
:),\ud83d\ude03
:D,\ud83d\ude03
```
It has a ',' as a separator between key(what users are going to type) and value(unicode emoji surrogates).<br> 
I made a sample for you "<a target='_blank' href= '/data/sample.dictionary'>Sample.dictionary</a>".<br>
And you put a line of code right before `EMOJIHANDLER.start();`. The line is below.
``` javascript
EMOJIHANDLER.addFileUrl('../data/sample.dictionary');
```
EASY!

## References
<a href='http://www.unicode.org/reports/tr51/' target='_blank'>Unicode byte codes and surrogates from unicode.org</a>

## History
<ul>
  <li>12.NOV.15 - Very first distribution by Juneyoung Oh</li>
  <li>14.NOV.15 - Patch replace logic and file refering system, Sample.dictionary by Juneyoung Oh</li>
</ul>
