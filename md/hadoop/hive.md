[TOC]

Hive 사용하다가 만난 트러블슈팅 모음.

# 특정 파티션에 대한 오퍼레이션이 작동하지 않는 경우

증상 : 하이브 테이블을 생성하는 스케쥴링을 개발하고 있었는데, 특정 날짜(파티션)에서만 insert가 안됨. `INSERT OVERWRITE TABLE  PARTITION` 에서 Heart beat 체크만 무한정 하다가 잡이 실패함. 이리저리 뒤지다가 파티션에 문제가 있는 것 같아 파티션을 지워보려고 하니 `ALTER TABLE DROP IF EXISTS PARTITION ` 도 수행되지 않음.

원인(추정) : 개발하면서 파티션과 external을 삭제하고 쿼리를 다시 돌려서 파티션을 생성하는 걸 반복했는데, 손으로 하다보니, 개발마무리 단계 직전에 데이터 초기화하면서 실수로 파티션을 먼저 지우지 않고 external 만 삭제하는 바람에 뭐가 어디에서 꼬였는지 Lock이 걸렸던걸로 추정됨.

이런 커맨드들로 힌트를 발견함.

```
DESCRIBE FORMATTED table_name partition(date_id='2019-09-10');
show locks extended;
```

해결 : unlock 쿼리를 쓰면 된다.

```
unlock table table_name partition(date_id='2019-09-10');
ALTER TABLE table_name drop IF EXISTS PARTITION (date_id='2019-09-10');
```

그러면 파티션도 문제없이 drop 되고, 원래 수행하려던 쿼리도 정상 작동함.

# collect_set() 한 결과를 string column 에 insert 햐기

증상 :

select 문에서 아래와 같이 수행한 결과를 string type인 column에 insert하려니 오류가 발생했다.

```
select
  magazine_no,
  article_no,
  collect_set(case when read_rate=1 then article_no end)  as complete_read_article_no_list`
from raw
where date_id = ${dt}
group by magazine_no, article_no
```

`collect_set()`의 결과가 array type이었고 위 경우엔 array of integer 이었기에 string 으로 자동 casting 이 되지 않고 있었다.

해결 : `cast()`와 `concat_ws()`, `concat()`를 사용한다.

```
select
  magazine_no,
  article_no,
  concat('[', concat_ws(',', collect_set(cast(case when read_rate=1 then article_no end as string))), ']')  as complete_read_article_no_list
from raw
where date_id = ${dt}
group by magazine_no, article_no
```
