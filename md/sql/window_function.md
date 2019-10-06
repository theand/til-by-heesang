[TOC]

# window function challenge 1

[window function 을 사용한 퀴즈 챌린지 ](https://window-functions-experiment-afc440.netlify.com)가 눈에 띄어서 풀어봄.

첫 시도에는 풀지 못함.

문서만 보고는 `lag()` 함수를 잘못 이해해서, 다른 샘플 코드를 보고서야 이해한 후에 다시 도전하여 아래와 같은 쿼리를 만들었다.

window function을 그리 열심히 써본적이 없던터라, 쿼리가 불필요하게 중복된게 아닌가 싶긴한데 마땅히 다른 방법이 생각나지 않아 여기까지만 풀어봄.

```sql
select type, day, days_since_previous
from (
    select type, day, days_since_previous
            , row_number() over ( partition by type order by days_since_previous asc) r

    from (
        select type
                , day
                , day - lag(day, 1, null) over (partition by type order by day asc) as days_since_previous
        from weather
    ) diff_prev
    where diff_prev.days_since_previous is not null
) ordered_diff_prev
where ordered_diff_prev.r = 1
order by ordered_diff_prev.days_since_previous asc
;

```

게다가 함수 이름 `lag`을 처음 봤을때 의미가 영 와닿질 않았는데, 작동을 이해하고 나서 생각해보니 저 단어에 대충 `지연` 정도의 의미가 있으니, 이전 row의 컬럼값을 현재행까지 지연시켜서 평가할 수 있다 정도의 의미로 쓰인게 아닐까 추측해본다. `lag()`와 `lead()` 는 `look behind`, `look ahead` 정도로 매칭시켜 이해하면 더 편한 것 같다.

참고:
- https://www.sqlite.org/windowfunctions.html
- https://www.sqlitetutorial.net/sqlite-window-functions/sqlite-lag/
- https://www.sqlitetutorial.net/sqlite-window-functions/sqlite-rank/
- https://www.sqlitetutorial.net/sqlite-window-functions/sqlite-row_number/
