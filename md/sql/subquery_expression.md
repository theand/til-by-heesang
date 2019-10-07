[TOC]

특정 조회조건을 쿼리로 어떻게 짜야 하나 생각하다가, 컬렉션을 다루는 어지간한 API에 요새 다 있는 any, some, all, every 이런 조건을 표현하려면 어떻게 해야하는지 찾아보니 나는 처음 봤지만 sql에 예전부터 있었다는걸 발견했다.

참고
- https://www.postgresql.org/docs/9.5/functions-subquery.html
- https://dev.mysql.com/doc/refman/5.7/en/any-in-some-subqueries.html

# ANY, SOME, IN

문법:

```
operand comparison_operator ANY (subquery)
operand IN (subquery)
operand comparison_operator SOME (subquery)
```

예제:

```
SELECT s1 FROM t1 WHERE s1 = ANY (SELECT s1 FROM t2);
SELECT s1 FROM t1 WHERE s1 IN    (SELECT s1 FROM t2);
```


# ALL, NOT IN

문법:

```
operand comparison_operator ALL (subquery)
```

예제:

```
SELECT s1 FROM t1 WHERE s1 > ALL (SELECT s1 FROM t2);
```


# 비고


- `ANY`와 `SOME`은 동일한 기능에 대한 alias 이다. 굳이 2개를 둔 이유는 쿼리를 영어식으로 읽을때 의미전달에 용이한 키워드를 골라 쓸 수 있도록 하기 위함이라고 한다.

- `ANY`와 `SOME`이 낯설었지만, `IN`이 `= ANY`에 대한 alias 라는 설명을 보니 사실 그동안 많이 사용해왔던 조건이었다는걸 알았다.

- `ANY`와 `SOME`과 마찬가지로 `ALL`도 낯설었는데, `NOT IN`은 `<> ALL`에 대한 alias 라는 설명을 보고 보니 역시 종종 사용해왔던 조건이었다.

- 아주 처음 써보는건 `ALL` 하나 뿐이었던 것 같다.

- 그리고 단순하게 요약만 했지만, 이 키워드들이 어느 맥락에서 쓰이는지에 따라 제약조건들이 다르게 작용하는데 자세한 사항은 레퍼런스를 정독해야 한다.
