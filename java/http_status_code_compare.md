
# http request에 대한 status code 체크하기

## 동기

레거시 코드를 변경하다보니

```
if (HttpServletResponse.SC_OK == respCode){

}
```

위와 같은 코드가 있었고, 새 요구사항에서는 status code가 `207`이 오고 있었기에 위 코드는 작동하지 않았다. `HttpServletResponse` 에는 `207` 에 해당하는 상수가 없어서 일단 아래와 같이 하드코딩해서 작동만 확인함.

```
if (HttpServletResponse.SC_OK == respCode  || 207 == respCode) {

}
```

일단 돌아가게 해놓고, 이걸 일일이 조건문에 하드코딩해야하나? `2xx`는 성공이라고 구분하는 간단한 방법은 없나? 그리고 `HttpServletResponse`에는 왜 어떤 코드는 있고 어떤 코드는 없는거지?

## 경과

### 2xx인지 4xx인지 구분하기

https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/HttpStatus.html

spring의 `HttpStatus` 를 쓰는게 가장 간단한 것 같다.

위의 코드는 아래와 같이 바꾸었다.

```
if (HttpStatus.valueOf(respCode).is2xxSuccessful()) {

}
```

참고: 스프링 소스에서 최종적으로 `is2xxSuccessful()` 에서 어떻게 구분하는지는 찾아가보니, 결국에는 status code를 100으로 나누어서 1~5까지의 값으로 구분하고 있었다.

### 빠진 코드가 있는 이유는?

정확한 이유는 찾지 못했으나, `HttpServletResponse`에는 누락된 status code가 있다는 언급만 찾을 수 있었음.

```
HttpServletResponse supports the RFC1945 and part of RFC2616 standards, but it's missing all of RFC2518
```

status code를 하나하나 구분해서 쓰려면, `HttpServletResponse` 말고 다른 컴포넌트를 통해서 상수를 사용하는게 좋아보임. Spring, Apache HttpComponents, Netty 등

source : https://stackoverflow.com/questions/730283/does-java-have-a-complete-enum-for-http-response-codes
