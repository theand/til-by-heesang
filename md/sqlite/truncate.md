[TOC]

# truncate table

어찌된 이유인지 sqlite에는 `truncate table` 이 없다.

그냥 delete 해야한다.

```
delete from `TABLE`;
```

`The Truncate Optimization`이라는 것이 있어서 `where` 없이 `delete`를 사용하면 빠르게 delete가 된다고 한다.

그리고 시퀀스를 사용했다면 아래 내용까지 해줘야한다.

```
select * from sqlite_sequence;
update sqlite_sequence set seq=0 where name=`TABLE`;
```


출처 :
- https://gist.github.com/rainyear/6348896
- https://sqlite.org/lang_delete.html
