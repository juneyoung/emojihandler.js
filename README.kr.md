# EmojiHandler 
by <b>Juneyoung Oh</b><br>
Writen in 12.NOV.15<br>
<a href='README.md'>EN</a>

[![DEMO VIDEO](/sample/demo.png)](/sample/demo.mp4 "DEMO VIDEO")

이 프로젝트는 OSX 와 Windows 64bit 를 지원합니다.<br>
Linux, Unix 와 32 bit 시스템에서는 아직 테스트 못해봤습니다 :-)<br>

## 사용법 
### 기본
``` javascript
	EMOJIHANDLER.addInputById('textinp');
	EMOJIHANDLER.start();
```
### 응용 : dictionary 파일 참조하기.
주의 : 파일 참조는 서버에서 경로로 참조할 때만 가능합니다.<br>
(아시다시피 js 는 보안 상의 이슈로 로컬 파일 시스템을 참조할 수 없기에...)
##### 준비물 :
- Dictionary 파일
- 코드 한 줄 추가하기
dictionary 파일은 아래와 같은 형식을 가지고 있습니다.
``` code
:-),\ud83d\ude03
^^,\ud83d\ude03
^_^,\ud83d\ude03
:),\ud83d\ude03
:D,\ud83d\ude03
```
dictionary 파일은 구분자로 ',' 키(실제 서비스 이용자가 타이핑할 내용)와 값(유니코드 이모티콘 서로게이트)을 구분합니다.<br> 
샘플은 "<a target='_blank' href= '/data/sample.dictionary'>Sample.dictionary</a>" 를 참고하시면 됩니다.<br>
dictionary 파일을 추가했다면, js 에 한줄 만 더 추가하시면 됩니다. `EMOJIHANDLER.start();` 아래에 추가해주세요.
``` javascript
EMOJIHANDLER.addFileUrl('../data/sample.dictionary');
```
존나 쉽군!!!

## 참고자료
<a href='http://www.unicode.org/reports/tr51/' target='_blank'>유니코드 바이트 코드와 서로게이트 스펙 from unicode.org</a>

## 이력
<ul>
  <li>12.NOV.15 - 첫 배포 by Juneyoung Oh</li>
  <li>14.NOV.15 - 문자열 배포 시스템을 개정, Sample.dictionary 와 파일 참조 코드 추가 by Juneyoung Oh</li>
</ul>
