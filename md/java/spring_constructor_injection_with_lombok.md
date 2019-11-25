[TOC]

# 스프링 생성자 기반 의존성 주입시에 롬복과 함께 사용하기

>The Spring team generally advocates constructor injection, as it lets you implement application components as immutable objects and ensures that required dependencies are not null. Furthermore, constructor-injected components are always returned to the client (calling) code in a fully initialized state. As a side note, a large number of constructor arguments is a bad code smell, implying that the class likely has too many responsibilities and should be refactored to better address proper separation of concerns.


스프링에서 의존성 주입(DI)시에 생성자 기반 주입이 권장되는 방법인데, 생성자 메소드를 일일이 만드는게 거슬린다면 롬복의 도움을 받을 수 있다.

```
@Service
public class MembershipServiceImpl{
  @Autowired	    
  UserService userService;
}
```

위와 같이 DI를 사용하던 코드를 롬복과 함께 하면 아래와 같이 만들 수 있다.


```
@RequiredArgsConstructor
@Service
public class MembershipServiceImpl{
  private final UserService userService;
}
```

> All non-initialized final fields get a parameter, as well as any fields that are marked as @NonNull that aren't initialized where they are declared.

초기화되지 않은 `final` 필드와 `@NonNull`로 표시됐지만 선언과 함께 초기화되지 않은 필드들을 파라메터로 하는 생성자를 만들어준다.

생성된 코드는 다음과 같다.
```
@Service
public class MembershipServiceImpl {
    private final UserService userService;

    @ConstructorProperties({"userService"})
    public MembershipServiceImpl(UserService userService) {
        this.userService = userService;
    }
}
```

참고
- https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-constructor-injection
- https://projectlombok.org/features/constructor
- https://www.baeldung.com/spring-injection-lombok
