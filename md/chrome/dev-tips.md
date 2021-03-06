[TOC]


# 크롬 개발자 도구 팁 정리

https://umaar.com/dev-tips/ 를 보면서 내가 다시 쓸만한 기능들 정리. (카나리에만 있는건 제외하고, 스테이블에 적용된 것 위주)


## DOM 트리 모두 펼치기

요약 :
`option + 화살표 클릭`

source: https://umaar.com/dev-tips/181-expand-nodes/


## 단축키로 페이지 일시 정지 시키기

요약 :

개발자도구 열어놓고 웹페이지에서 `cmd+\` 입력

source:

- https://umaar.com/dev-tips/178-quick-pause-script-execution/
- https://twitter.com/pocketjoso/status/1022582753169158144

비고 : 스크립트 실행을 멈춘다는 제목으로 올라왔지만 멈춰서 이동하는 코드 위치가 너무 제각각이어서 다소 불편하고, 원래 팁을 제공한 트위터 유저 의견대로, 상태가 바뀌거나 화면에서 사라지는 요소를 검사할때 유용할 듯.

## 특정 요소만 스크린샷 뜨기

요약 :

1. 캡처하려는 항목에 대해 요소 검사
2. `cmd+shift+p` 로 커맨드 메뉴 띄운 다음에 `screenshot` 으로 검색하면 `Capture node screenshot` 항목이 있고, 선택하면 선택한 요소의 이미지가 파일로 받아짐.

source : https://umaar.com/dev-tips/156-element-screenshot/

비고 : 단축키도 외워야하고 과정이 번거롭다. api가 있으면 좋을텐데.

## js 디버깅하면서 코드 다른 부분으로 점프

요약 :

디버거에서 breakpoint 걸어서 멈춰있는 상태에서 `cmd` 누르고 있으면 점프할 수 있는 위치가 강조되어서 표시된다.

source : https://umaar.com/dev-tips/145-js-jump-to-destination/

## 코드스니펫 (비교적) 빠르게 접근해서 실행하기

요약 : 커맨드메뉴에서 스니펫을 검색해서 빠르게 실행할 수 있음.

- `cmd+shift+p`로 커맨드 메뉴를 띄우고, `>` 을 지우고 `!` 을 입력하면 스니펫을 바로 실행할 수 있음. `?` 을 입력하면 다른 단축 문자를 보여줌.
- 스니펫은 `Sources - Snippets` 에서 사전에 저장해놓아야함.

source : https://umaar.com/dev-tips/141-quick-open-menu-snippets/

비고 : 미리 저장해놓으면 좋을만한 스니펫은 다음에 찾아보자. see also https://bgrins.github.io/devtools-snippets/

## 커맨드 메뉴

요약 : `cmd+shift+p` 로 커맨드 메뉴를 띄워서 많은 커맨드를 키보드로 실행할 수 있다.

source : https://umaar.com/dev-tips/98-command-menu/

비고 : 프론트엔드 개발을 헤비하기 할때 마우스 사용하지 않고 단축키 위주로 많은 것을 실행할 수 있는 것 같은데.. 그정도까지 헤비하게 해본적은 없는 것 같다. 라이브코딩 같은거 할때 동선 짜놓기에는 좋을지도 모르겠다.

## 디버깅할때 블랙박스로 취급해서 무시할 파일 설정하기

요약 :  `Sources` 탭에서 블랙박스 처리할 파일 연 다음에 코드영역에서 우클릭하고 `Blackbox script` 메뉴 클릭.

source :

- https://umaar.com/dev-tips/128-blackboxing/
- https://plus.google.com/+UmarHansa/posts/2m8yF7aFonn

비고 : 디버깅할때 step in, step out 같은거 하다가 jquery 같은거 소스로 들어가면 피곤한데, 블랙박스 처리하면 그걸 막아줌.

## 개발자도구 독 위치 전환 단축키

요약 : `cmd+shift+D` 최근 2개 상태를 토글한다.

source : https://umaar.com/dev-tips/19-dock-undock-shortcut/

비고 : 예전에 자주 쓰다가 요샌 까먹었는데 다시 리마인드.


## 현재 선택한 단어의 다음 탐색

요약 : 커서가 위치해있거나 선택된 단어로 다음에 나타나는 위치 검색

source : https://twitter.com/umaar/status/483787965903413248

비고 : 서브라임텍스트에서의 단축키처럼.

## 요소 패널에서 DOM 노드 드래그해서 에디터로 밀어넣기

요약 : 요소 패널에서 에디터 영역(브라우저 폼도 가능)으로 노드 드래그해서 넣으면 html 태그가 그대로 들어감.

source : https://twitter.com/umaar/status/495268374642192384

비고 : 아... 이걸 `edit as html`이나 `copy element` 같은걸 해서 클립보드로 넣은 다음에 붙여넣곤 했는데.. 이런 방법이.

## 요소 패널의 스타일 영역에서 쓸만한 키보드 기능

요약 : 프로퍼티나 값 자리에서 `백스페이스 엔터` - 해당 속선 선언 자체를 지워버림.

source : https://umaar.com/dev-tips/61-styles-pane-keyboard-tricks/

비고 : 체크박스 눌러서 토글하는거랑은 무슨 차이가 있으려나..


## 네트웍 오버라이드로 프로덕션 사이트 수정하여 프로토타이핑 해보기

요약 : 프로덕션 사이트의 소스를 배포하지 않고 프로토타이핑 적용해볼 수 있다. 다음 단계를 거치면 됨.

- 소스 패널에서 `Overrides` 영역에서 `Select folder for Overrides` 를 선택하여 오버라이드할 파일이 저장될 경로를 지정.
- 네트웍 패널에서 오버라이드하려는 리소스에서 우클릭하여 `Save for overrides` 하면 로컬에 소스가 저장되 수정할 수 있다.
- 페이지를 리로드 해도 리모트 리소스가 아닌 로컬 리소스를 이용해서 로딩된다.

source : https://umaar.com/dev-tips/162-network-overrides/

비고 : 요소 탭에서 조금씩 조정하는건 페이지 로딩이 된 상태에서 적용되는 것이기도 하고 리로드 하면 리셋되는 단점을 보완할 수 있는 방법인듯.

## 모든 네트웍 헤더와 컨텐트에서 검색하기

요약 : 네트웍 패널에서 바로 보이는 검색창에서 검색하는 게 아니라 `cmd+f` 누르면 나오는 서치 영역에서 검색하면 헤더와 바디 모두에서 검색이 이루어짐.

source : https://umaar.com/dev-tips/170-network-search/


## 네트웍 패널의 필터 검색에서 부정형 사용하기

요약 : `-is:from-cache` 와 같이 `-` 을 붙이면 not 의 의미.

유사 케이스

- `-domain:tip.admintool.daum.net`
- `-has-response-header:cache-control`

source : https://twitter.com/umaar/status/804703313430278145

비고 : 지원하는 필터 목록을 한번 찾아봐야겠다.


## 네트웍 패널의 필터 검색에서 이미지, CSS, JS 등의 리소스는 빼고 보기


`mime-type` 으로 필터링하면 될듯

```
-mime-type:image/jpg -mime-type:image/jpeg  -mime-type:image/png -mime-type:image/gif -mime-type:image/x-icon -mime-type:text/javascript -mime-type:application/javascript  -mime-type:text/css -mime-type:application/octet-stream

```

source : https://developers.google.com/web/tools/chrome-devtools/network/reference#filter


## text-shadow 에디터

요약 : 스타일 영역에서 `text-shadow` 프로퍼티의 값 왼쪽 아이콘을 클릭하면 컬러피커처럼  섀도우를 조절할 수 있는 에디터가 뜸.

source : https://umaar.com/dev-tips/116-box-shadow-and-text-shadow-editor/


## JS 디버깅할때 Never Pause Here

요약 : `Pause on exceptions` 을 켜놓았을 경우 신경 쓸 필요 없는데서 브레이크가 걸려서 귀찮을 수 있는데, 그때 왼쪽 라인넘버 표시되는 영역에서 우클릭하고 `never pause here` 를 해놓으면 됨.

source : https://umaar.com/dev-tips/127-never-pause-here/

## 콘솔에서 $ 기호

https://medium.com/@tomsu/devtools-tips-day-1-the-console-dollars-3aa0d93e923c

- jQuery 같이 `$` 변수를 이미 사용하고 있지 않다면, `$` 는 `document.querySelector` , `$$` 는 `document.querySelectorAll` 의 alias로 쓸 수 있다.

- `$0`부터 `$4` 까지 : 요소 패널에서 선택한 html 노를 참조할 수 있다. 최근에 선택한 노드부터 0부터 4까지 할당된다. 그런고로, `$1.appendChild($0)` 와 같이 참조하여 작업할 수 있다.

- `$_` : 마지막에 평가된 expression 의 결과값을 참조한다.

- `$i` : 기본 기능은 아니고 [크롬확장](https://github.com/pd4d10/console-importer)을 설치한 상태에서, 콘솔에서 `$i` 를 쓸수 있게 되는데, cdnjs, unpkg 혹은 유효한 url 을 통해 js/css 를 바로 import 할 수 있다. 다만, CSP가 적용된 사이트에서는 작동하지 않는다.
