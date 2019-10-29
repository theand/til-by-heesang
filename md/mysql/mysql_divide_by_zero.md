[TOC]

# divide by zero가 발생하는 경우

기본적으로 SQL MODE 에 영향을 받는데, 서버 버전에 따라 디폴트 모드에 `ERROR_FOR_DIVISION_BY_ZERO`의 포함여부가 다르다. 5.6에서는 비포함이고, 5.7, 8.0에는 포함되어 있다.

오늘 작업한 DB는 5.6 이었고, divide by zero가 발생시 경고를 발생하지 않고 `NULL`을 결과값으로 내놓는다.

```
By default, division by zero produces a result of NULL and no warning. By setting the SQL mode appropriately, division by zero can be restricted.

With the ERROR_FOR_DIVISION_BY_ZERO SQL mode enabled, MySQL handles division by zero differently:
- If strict mode is not enabled, a warning occurs.
- If strict mode is enabled, inserts and updates involving division by zero are prohibited, and an error occurs.
```

아래 쿼리에서는 `gender` 컬럼이 모두 null인 경우에 `count(gender)` 값이 0 으로 나오면서 divide by zero가 발생하고 `age60femaleRatio`에는 NULL이 들어갔는데, NULL 대신 0이 나오길 원했다.

다행히 `COALESCE()` 함수를 이용해서 간단히 처리할 수 있었다.


```
-    ( count(IF(age_range = '60~69' and gender = 'female', 1, null)) / count(gender) * 100) as age60femaleRatio,
+    COALESCE(( count(IF(age_range = '60~69' and gender = 'female', 1, null)) / count(gender) * 100), 0) as age60femaleRatio,
```



참고

* https://dev.mysql.com/doc/refman/5.6/en/sql-mode.html
* https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html
* https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html
* https://dev.mysql.com/doc/refman/5.6/en/sql-mode.html#sqlmode_error_for_division_by_zero
* https://dev.mysql.com/doc/refman/8.0/en/precision-math-expressions.html
*
https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_coalesce
