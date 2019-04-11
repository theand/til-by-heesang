[TOC]

# Oracle DB에 oracle-enhanced 젬으로 연결 중인데 maximum open cursors exceeded 에러가 발생할 경우

Ruby on rails 프로젝트에 Oracle DB를 연결하여 rake task 로 일회성 자료 추출에 사용하고 있다. 가끔, 처리해야할 갯수가 아주 많은 경우에 한참 수행하다가 maximum open cursors exceeded 발생하며 task 가 종료되곤 한다.

맨처음 마주쳤을때는 검색을 해도 대응책이 눈에 잘 띄지 않아서 select 할때 배치 사이즈를 다음과 같이 지정해서 해당 오류를 회피할 수 있었다.

```ruby
Article
  .includes(:article_content)
  .select("id", "type", "status", "reg_dttm")
  .where(["TYPE =?", t])
  .where(["STATUS =?", s])
  .where(["reg_dttm >= ? and reg_dttm <= ?", Date::strptime(m[0], '%Y-%m-%d'), Date::strptime(m[1], '%Y-%m-%d')])
  .order(id: :asc)
  .find_each(batch_size: 500) do |a|
```

두번째 마주쳤을때는 위의 방식으로도 회피를 할 수 없어서 `oracle-enhanced` 저장소의 이슈들을 자세히 읽어보았더니 저번에는 눈에 띄지 않았던 내용이 눈에 들어와서 `config/database.yml` 에 아래 내용을 추가하였더니 더이상 발생하지 않았다.

```
  statement_limit: 250
  open_cursors: 300
```

참고:

- https://github.com/rsim/oracle-enhanced/issues/1358
- https://github.com/rsim/oracle-enhanced/issues/1426
