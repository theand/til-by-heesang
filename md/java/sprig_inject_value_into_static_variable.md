[TOC]

# static 변수에 @Value 주입하기

사용중이던 static class 에 하드코딩된 값을 추출하여 프로파일에 따라 다른 값을 쓰도록 변경해야할 일이 생겼다. static 변수를 선언하고 `@Value` 를 썼더니 값이 안 들어간다. 찾아보니 지원되지 않는 행동이라고 하는데, 스프링 문서에서 정확한 레퍼런스를 찾지는 못했다. 어쨌든 기존 코드 구조 때문에 static 을 안 쓰고 하려면 너무 여러군데를 고쳐야 했기 때문에 방법을 찾아보니 다음과 같다.


static 이 아닌 setter 메소드에 값 주입하기

```java
@Component
public class GlobalValue {

    public static String DATABASE;

    @Value("${mongodb.db}")
    public void setDatabase(String db) {
        DATABASE = db;
    }

}
```

출처 : https://www.mkyong.com/spring/spring-inject-a-value-into-static-variables/

setter 에 어노테이션 부착하는것은 처음 봤는데 찾아보니 다음과 같은 내용이 있었다.

https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#expressions-beandef-annotation-based
