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

# 176. Second Highest Salary

https://leetcode.com/problems/second-highest-salary/

```
select
(
  select distinct salary
  from Employee
  order by Salary desc
  limit 1 offset 1
) as SecondHighestSalary
;    
```

# 181. Employees Earning More Than Their Managers

https://leetcode.com/problems/employees-earning-more-than-their-managers/

```
select
name as Employee
from employee e
where salary > (select salary from employee m where e.managerId = m.id)
```

# 182. Duplicate Emails

https://leetcode.com/problems/duplicate-emails/

```
select Email
from Person
group by Email
having count(Email) > 1;
```

# 183. Customers Who Never Order

https://leetcode.com/problems/customers-who-never-order/

```
select Name as Customers
from Customers
where Id not in (select CustomerId from Orders group by CustomerId);

```

# 196. Delete Duplicate Emails

https://leetcode.com/problems/delete-duplicate-emails/

```
delete from Person
where
    Id not in ( select *
        from ( select min(id) as smallestId
            from Person
            group by Email
        ) small
    )

```


# 197. Rising Temperature

https://leetcode.com/problems/rising-temperature/

```
select Id
from Weather a
where Temperature > (select Temperature from Weather b where b.RecordDate = DATE_SUB(a.RecordDate, interval 1 day))
```


# 595. Big Countries

https://leetcode.com/problems/big-countries/

```
select name, population, area
from World
where area > 3000000 or population > 25000000

```


# 596. Classes More Than 5 Students

https://leetcode.com/problems/classes-more-than-5-students/

```
select class
from courses
group by class
having count(distinct student) >= 5
```

# 620. Not Boring Movies

https://leetcode.com/problems/not-boring-movies/

```
select *
from cinema
where id%2 != 0
  and description != 'boring'
order by rating desc
;

```
