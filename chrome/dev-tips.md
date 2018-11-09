
# 크롬 개발자 도구 팁 정리

https://umaar.com/dev-tips/ 를 보면서 내가 다시 쓸만한 기능들 정리.


## DOM 트리 모두 펼치기

요약 :
`option + 화살표 클릭`

source: https://umaar.com/dev-tips/181-expand-nodes/


## 단축키로 페이지 일시 정지 시키기

요약 :

개발자도구 열어놓고 웹페이지에서 `cmd+\` 입력

source:
https://umaar.com/dev-tips/178-quick-pause-script-execution/
https://twitter.com/pocketjoso/status/1022582753169158144

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

https://umaar.com/dev-tips/128-blackboxing/
https://plus.google.com/+UmarHansa/posts/2m8yF7aFonn

비고 : 디버깅할때 step in, step out 같은거 하다가 jquery 같은거 소스로 들어가면 피곤한데, 블랙박스 처리하면 그걸 막아줌.
