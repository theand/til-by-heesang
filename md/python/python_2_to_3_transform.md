[TOC]


# 의도 : (python2와 pyton3의 차이도 잘 모르지만) 일단 python2에서 돌아가던 스크립트를 python3에서 그럭저럭 돌아가게 만들기

til 에 작성한 마크다운 문서 목록을 [인덱스](../index.md)로 만들어주는 [스크립트](../build.py)를 너무 옛날에 만든거라 python2 기반이었는데, 눈에 띈 참에 python3 기반으로 바꿔보려고 함.

# 진행
## 인터프리터 지정

바로 실행가능한 스크립트로 쓰고 있었으므로, 인터프리터 경로를 python3 로 바꿔야 하는데, `env`로 경로를 찾고 있었으므로 간단히 아래 diff와 같이 지정하면 됨.

```
-#!/usr/bin/env python
+#!/usr/bin/env python3
```

## 2to3

python2 코드를 python3 코드로 자동 번역해주는 파이썬 프로그램.

https://docs.python.org/3.7/library/2to3.html

따로 설치하는 패키지인가 했는데, 인터프리터 설치하면 기본으로 딸려오는 스크립트였다.

```
2to3 build.py
```
이렇게 하면 수정 필요한 부분을 stdout 에 출력함.

수정 필요한 부분을 바로 파일에 반영하려면 `-w` 옵션을 주면 됨.
```
2to3 -w build.py
```

기본 옵션으로 실행하면, [미리 정의된 fixer 집합]에 대해 검사를 수행하는데, 명시적으로 fixer를 지정하려면 `-f` 옵션을 주면 된다.

`-f all` 옵션은 모든 디폴트 fixer를 활성화시킨다. 디폴트 fixer는 [fixer 목록](https://docs.python.org/3.7/library/2to3.html#to3-fixers) 중에서 optional 이라고 써있는 것들 빼고 나머지이다.

정리하는 김에 optional fixer 목록은 다음과 같다.

- buffer
- idioms
- set_literal
- ws_comma

디폴트 fixer + optional fixer를 활성화 하려면 아래와 같이 `all`로 디폴트 fixer를 활성화하고, optional 을 명시적으로 써주면 된다.
```
2to3 -f all -f idioms build.py
```

fixer 설명들을 보면, python3 다운 코드가 무엇인지 엿볼 수 있는 듯 하다.

see also https://github.com/python/cpython/tree/3.7/Lib/lib2to3/fixes

# 결과

적용해보니, build.py 는 워낙 기본적인 문법만 사용하고 있던터라 `from __future__ import new_feature` 구문만 제거하는 정도만 수정이 필요했다.
