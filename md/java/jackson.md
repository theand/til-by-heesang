[TOC]

# 네이밍 컨벤션

json 문자열을 자바 객체로 deserialize 할때, 네이밍 컨벤션이 서로 다르다면 이름을 자동으로 매핑하지 못한다. 그래서 아래와 같이 어노테이션이 덕지덕지 붙은 레거시 코드를 볼때가 있다.

```
class User{
    @JsonProperty("first_name")
    protected String firstName;
}
```

json 에는 snake case로 `first_name` 프로퍼티가 있지만 java 에서는 camel case로 `firstName` 을 사용하는 경우라서 json의 프로퍼티 명을 명시하는 코드이다.

이걸 일일이 달아놓지 않고 일괄적으로 snake case to camel case 할 수 없나 하고 찾아보니 Naming Strategy를 지정할 수 있다는 것을 발견했다.

가장 간단하게 적용하는 방법은 `@JsonNaming` 어노테이션을 사용하면 된다.

```
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
class User{
    protected String firstName;
}
```


자세한 사항은 문서를 참고해본다.

>A PropertyNamingStrategy that translates typical camel case Java property names to lower case JSON element names, separated by underscores.

>These rules result in the following additional example translations from Java property names to JSON element names.
>"userName" is translated to "user_name"
>"UserName" is translated to "user_name"
>"USER_NAME" is translated to "user_name"
>"user_name" is translated to "user_name" (unchanged)
>"user" is translated to "user" (unchanged)
>"User" is translated to "user"
>"USER" is translated to "user"
>"_user" is translated to "user"
>"_User" is translated to "user"
>"__user" is translated to "_user" (the first of two underscores was removed)
>"user__name" is translated to "user__name" (unchanged, with two underscores)



참고
-  https://www.baeldung.com/jackson-advanced-annotations
- http://fasterxml.github.io/jackson-databind/javadoc/2.10/com/fasterxml/jackson/databind/annotation/JsonNaming.html
- http://fasterxml.github.io/jackson-databind/javadoc/2.10/com/fasterxml/jackson/databind/PropertyNamingStrategy.html
- http://fasterxml.github.io/jackson-databind/javadoc/2.10/com/fasterxml/jackson/databind/PropertyNamingStrategy.SnakeCaseStrategy.html
