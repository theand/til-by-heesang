[TOC]

# assertThat 에서 null 체크하기

```
import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.core.Is.is;
```

```
assertThat(userProfile.getAccount(), is(notNullValue()));
assertThat(emptyProfile.getAccount(), is(nullValue()));
```

위와 같이 null, not null 을 체크할 수 있다.

`CoreMatchers.nullValue()` 와 `CoreMatchers.notNullValue()`는 각각 `IsNull.nullValue()` 와 `IsNull.notNullValue()` 에 대한 숏컷이다.


참고
- https://www.mkyong.com/unittest/hamcrest-how-to-assertthat-check-null-value/
- http://hamcrest.org/JavaHamcrest/javadoc/2.2/org/hamcrest/CoreMatchers.html
- http://hamcrest.org/JavaHamcrest/javadoc/2.2/org/hamcrest/core/IsNull.html
