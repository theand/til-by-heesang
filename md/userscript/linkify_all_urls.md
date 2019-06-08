[TOC]

# 클릭할 수 없는 URL 주소를 클릭할 수 있게 바꾸기

## 필요

https://egghead.io/feed 에그헤드 피드를 raw XML 로 보면서 관심 가는 링크를 열어보다가... 주소 문자열을 정확히 선택해서 다른 탭으로 열기를 해서 페이지를 여는게 너무 짜증이 나서 찾아봄.

## 경과

먼저 크롬 확장을 검색해봤는데 제대로 작동하지 않았음.
- https://chrome.google.com/webstore/detail/linkification-chrome/haaamfoknimneabkapikpoccmfekkidj?hl=en
- https://chrome.google.com/webstore/detail/clickable-links/mgamelhnfokapndfdodnmfiningckjia

이걸 소스 열어서 고치느니, userscript를 찾아보자 하고 찾아봄.

[Linky Plus](https://userscripts-mirror.org/scripts/show/1352)라는 오래된 스크립트 소스가 나왔고, 붙여넣기 해보니 원하는대로 작동함.
