[TOC]

# logger.isDebugEnabled() 는 과연 성능상 이득이 있는가?

## 출발

PR 리뷰를 하다가 오랜만에 아래와 같은 패턴의 코드를 보게 되었다. 이게 요새도 필요한 코드인걸까 의심이 들었다. `logger.debug()` 호출 시에 비용이 큰 메소드를 호출해서 찍거나 찍는 문자열객체가 엄청 크거나 하면 퍼포먼스에서 미세한 이득이 있을듯하긴한데 의미 있는 수준일까 하는 의심이 들었다.

```
if (logger.isDebugEnabled()) {
    logger.debug(">>> some log");
}
```


SO에 이 주제로 올라온 논의를 살펴보았다.

- https://stackoverflow.com/questions/963492/in-log4j-does-checking-isdebugenabled-before-logging-improve-performance
- https://stackoverflow.com/questions/105852/conditional-logging-with-minimal-cyclomatic-complexity/105908#105908

`slf4j`의 로그 포맷 스트링을 사용하는 경우에는 가드가 없더라도, 포맷 문자열 객체 하나는 만들어지지만 StringBuilder 니 toString 이니 하는건 일어나지 않기 때문에 퍼포먼스 손해가 별로 없다는듯 하다.




## 결론

`log4j2` 이던 `logback` 이던 내가 본 프로젝트들은 다 `slf4j`로 감싸서 쓰고 있었는데, `slf4j` 홈페이지 FAQ에 바로 아래와 같이 나와있다.

```
SLF4J supports an advanced feature called parameterized logging which can significantly boost logging performance for disabled logging statement.

For some Logger logger, writing,

logger.debug("Entry number: " + i + " is " + String.valueOf(entry[i]));
incurs the cost of constructing the message parameter, that is converting both integer i and entry[i] to a String, and concatenating intermediate strings. This, regardless of whether the message will be logged or not.

One possible way to avoid the cost of parameter construction is by surrounding the log statement with a test. Here is an example.

if(logger.isDebugEnabled()) {
  logger.debug("Entry number: " + i + " is " + String.valueOf(entry[i]));
}
This way you will not incur the cost of parameter construction if debugging is disabled for logger. On the other hand, if the logger is enabled for the DEBUG level, you will incur the cost of evaluating whether the logger is enabled or not, twice: once in debugEnabled and once in debug. This is an insignificant overhead because evaluating a logger takes less than 1% of the time it takes to actually log a statement.

Better yet, use parameterized messages

There exists a very convenient alternative based on message formats. Assuming entry is an object, you can write:

Object entry = new SomeObject();
logger.debug("The entry is {}.", entry);
After evaluating whether to log or not, and only if the decision is affirmative, will the logger implementation format the message and replace the '{}' pair with the string value of entry. In other words, this form does not incur the cost of parameter construction in case the log statement is disabled.

The following two lines will yield the exact same output. However, the second form will outperform the first form by a factor of at least 30, in case of a disabled logging statement.

logger.debug("The new entry is "+entry+".");
logger.debug("The new entry is {}.", entry);
```

출처 : https://www.slf4j.org/faq.html#logging_performance

로거 호출시에 메시지 문자열을 직접 조합하는게 아니라 파라메터화된 메시지를 사용하면 알아서 처리가 된다고 한다.

참고로 롬복에서는 자동으로 가드 문을 생성하도록 할거라는 언급이 있었으나, 향후 계획 중의 하나일뿐이고 아직 구현된 기능은 아닌듯 하다.

```
A future feature of lombok's diverse log annotations is to find calls to the logger field and, if the chosen logging framework supports it and the log level can be compile-time determined from the log call, guard it with an if statement. This way if the log statement ends up being ignored, the potentially expensive calculation of the log string is avoided entirely. This does mean that you should NOT put any side-effects in the expression that you log.
```

출처 : https://projectlombok.org/features/log
