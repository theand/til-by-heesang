[TOC]

# in 연산자

`where` 에서 `in` 연산자를 종종 쓰는데, 이번에도 쓰다가 문득 궁금해졌다. `in ()`에 들어가는 값은 몇개까지 허용되는가?

찾아보니, 갯수제한은 없고 용량제한이 있다고 한다.

>The maximum size of one packet or any generated/intermediate string, or any parameter sent by the mysql_stmt_send_long_data() C API function. The default is 64MB.

 `max_allowed_packet`에 설정된 값에 제한을 받을 뿐이라고 한다. 기본값이 64메가니까 어지간해선 넘어설 일이 없어보인다.

서버 설정파일을 열어볼 수 없는 상황이라면, 아래 쿼리로 `max_allowed_packet`의 값을 볼 수 있다.

```
SHOW VARIABLES LIKE 'max_allowed_packet';
```

참고:
- https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_in
- https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_allowed_packet
- https://dev.mysql.com/doc/refman/8.0/en/show-variables.html
