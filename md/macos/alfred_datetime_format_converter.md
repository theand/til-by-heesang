[TOC]

# unix timestamp 를 datetime 으로 자주, 빨리 변환해서 보기 - Alfred Workflow 사용

## 필요

업무상 자주 봐야하는 API 응답에 날짜 시간 데이터가 unix timestamp로 내려오는데 human readable 하지 않아 괴롭다. 이런저런 변환 사이트는 수두룩하게있지만, unix timestamp <-> datetime 을 자주, 빨리 볼 수 있는 방법은 Alfred Workflow가 제일 솔루션을 찾기 쉽고 사용하기 쉬울 것 같았다.

## 해결

mwaterfall 이라는 유저가 만든 workflow가 있는데, alfred 2용이라서 그런지 제대로 실행이 안됐다. 포럼에 보니 저걸 fork 해서 alfred 3용으로 수정한 것이 있었다.

.alfredworkflow 파일을 다운로드 받고 열면 alfred 에 등록된다. `df nnnnnnnnnnn` (timestamp 값) 을 입력하면 각종 datetime 포맷으로 변환해서 보여주고 엔터를 치면 클립보드로 복사해준다. 다만 `df yyyy-mm-dd` 와 같이  datetime 형식 중의 하나로 입력하면 timestamp 로 보여주진 않는다.


참고

- https://github.com/mwaterfall/alfred-datetime-format-converter
- https://www.alfredforum.com/topic/1558-datetime-format-converter-convert-between-unix-timestamps-and-datetime-strings/
- https://github.com/ACBingo/alfred-datetime-format-converter : 이걸로 사용함.
- http://www.packal.org/ : alfred 워크플로우, 테마를 검색할 수 있는 써드파티 사이트인데, 내가 위의 목적을 위해 검색을 하던 시점에는 검색기능이 작동하지 않고 있다가 글을 쓰는 지금 시점에서는 정상 작동해서 다른 datetime converter도 찾아볼 수 있다.
