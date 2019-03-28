[TOC]


# 아파치 벨로시티 템플릿에서 빼기 연산을 위해 minus 기호(-)를 쓸때 주의사항

## 문제
템플릿에서 쓰는 정수 값 중에 빼기 연산을 이용할 일이 있어서 사용하려는데 특별히 문제 있어보이지 않는데 값이 안 나오거나 `ParseErrorException` 이 발생하는 증상을 확인

## 경과

검색을 해보니, 벨로시티의 identifier는 minus 를 valid 한 문자로 인정하기 때문에, 변수 이름에 `-`가 붙어 있으면 빼기 연산이 되지 않고 `-`를 포함한 새로운 변수로 인식함.

```
#set($idx = $rank-1)
#set($idx = ${rank - 1})
```
이렇게 하면 없는 변수를 참조하는 것이 된다.

```
#set($idx = ${rank}-1)
#set($idx = ${rank} -1)
```
이렇게 하면 `ParseErrorException` 이 발생한다.

```
#set($idx = $rank - 1)
#set($idx = ${rank}- 1)
#set($idx = ${rank} - 1)
```
이렇게 해야 원하는 결과를 얻을 수 있다.

## 결론

가장 안전하게는 `-` 기호 양 옆에 공백을 두면 된다.


ref:

- https://issues.apache.org/jira/browse/VELOCITY-542
