[TOC]

https://leetcode.com/problemset/database/
Leetcode에 database 문제 세트가 있다는걸 발견했다.

하루 한문제씩만 풀어보기로 함.

# 175. Combine Two Tables



```
select Person.FirstName, Person.LastName, Address.City, Address.State
from Person left join Address on Address.PersonId = Person.PersonId
;
```
