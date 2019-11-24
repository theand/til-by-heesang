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


# 627. Swap Salary

https://leetcode.com/problems/swap-salary/

```
update salary
set sex = if(sex='f', 'm', 'f')
;
```

# 1179. Reformat Department Table

https://leetcode.com/problems/reformat-department-table/

```
select

id,
sum(if(month='Jan', revenue, null)) as Jan_Revenue,
sum(if(month='Feb', revenue, null)) as Feb_Revenue,
sum(if(month='Mar', revenue, null)) as Mar_Revenue,
sum(if(month='Apr', revenue, null)) as Apr_Revenue,
sum(if(month='May', revenue, null)) as May_Revenue,
sum(if(month='Jun', revenue, null)) as Jun_Revenue,
sum(if(month='Jul', revenue, null)) as Jul_Revenue,
sum(if(month='Aug', revenue, null)) as Aug_Revenue,
sum(if(month='Sep', revenue, null)) as Sep_Revenue,
sum(if(month='Oct', revenue, null)) as Oct_Revenue,
sum(if(month='Nov', revenue, null)) as Nov_Revenue,
sum(if(month='Dec', revenue, null)) as Dec_Revenue

from Department
group by id
order by id asc
;

```

# 184. Department Highest Salary

https://leetcode.com/problems/department-highest-salary/

```

select
  d.Name as Department,
  e.Name as Employee,
  m.maxSalary as Salary
from
  (
  select
  DepartmentId,
  max(Salary) as maxSalary
  from Employee
  group by DepartmentId
  ) m join Department d on m.DepartmentId = d.Id
  join Employee e on m.maxSalary = e.Salary and e.DepartmentId = m.DepartmentId
;
```
