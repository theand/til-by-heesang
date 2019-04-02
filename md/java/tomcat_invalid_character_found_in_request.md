[TOC]

# 톰캣에서 잘 돌아가던 어플리케이션이 갑자기 IllegalArgumentException 을 뿜는 증상 대처

## 증상
n년째 Tomcat 8.x, 8.5.x 에서 잘 돌아가던 어플리케이션이 있었는데 어느날 갑자기 어플리케이션을 실행하고 있다보니 아래와 같은 예외를 발생하고 있었다.

>java.lang.IllegalArgumentException: Invalid character found in the request target. The valid characters are defined in RFC 7230 and RFC 3986



## 원인

원인을 추적해보니, 톰캣이 버전업되면서 쿼리스트링에 허용되는 문자열 규칙을 바꾸었기 때문이다. RFC 에 맞춰 바꾼 것이긴 한데, 오랫동안 기존의 디폴트 설정에 따라 쿼리스트르링에 특별한 문자를 유의미하게 사용해왔던 어플리케이션의 히스토리가 있어 에러를 내게 된 것이다.

구체적으로 말하자면, `" { } [ ] ^ |` 를 더이상 유효한 문자로 인정하지 않게 되었고, 내가 작업하는 어플리케이션에서는 아래와 같은 방식으로 쿼리스트링에 복잡한 파라메터를 넘길때 `[] |`  등을 사용하고 있었다.

```
?status=S&options[%27include%27]=N&options[%27onlyMedia%27]=N&options[%27color%27]=EXCLUDE&paging.entriesPerPage=20&paging.pagesPerGroup=5&paging.pageNumber=3
```

좀더 자세한 변경 히스토리를 찾아보니 다음과 같다.

>62273: Implement configuration options to work-around specification non-compliant user agents (including all the major browsers) that do not correctly %nn encode URI paths and query strings as required by RFC 7230 and RFC 3986. (markt)

[해당 이슈티켓](https://bz.apache.org/bugzilla/show_bug.cgi?id=62273)에 따르면 `9.0.8`, `8.5.31`, `8.0.52` 버전부터 적용되었다고 한다. `8.5.31`의 경우 2018-05-03에 릴리즈 되었다.

그런데 나는 그동안 기억나지 않는 이슈로 인해 `brew pin` 명령어를 통해 `tomcat@8` 패키지의 버전을 `8.5.28` 으로 고정해두고 있어서 좀더 일찍 이 오류를 만나지 못하고 있었다. 그러다가 최근 다른 프로젝트의 테스트를 위해 tomcat 9.x 를 설치해서 적용해보고 내친 김에 이 프로젝트에도 tomcat 9.x 를 적용해놓고 작업하고 있었는데, 쿼리스트링에서 `[]` 를 사용하는 특정 경로에 접근하기 전까지는 이 오류가 발생하는줄 모르고 있다가 마침 그 경로를 사용해야하는 작업을 진행하다가 이 변경사항을 인지하게 되었다.

## 대응

1. `server.xml`에 다음과 같이 `relaxedQueryChars`를 통해 쿼리스트링에 추가로 허용할 문자를 명시한다.
```
<Connector
  connectionTimeout="20000"
  port="8080"
  protocol="HTTP/1.1"
  redirectPort="8443"
  relaxedQueryChars='^{}[]|&quot;' />
```

2. 해당 변경사항이 반영되지 않은 이전 버전으로 다운그레이드한다.

나는 다운그레이드를 선택했다. `relaxedQueryChars`에 들어갈 문자 하나하나를 테스트하거나, 내가 파악하지 못한 어떤 부분에서 어떤 문자가 또 허용하지 않는 문자열에 걸려서 폭탄이 터지길 기다리기도 피곤했기 때문에 다운그레이드를 택했다.




ref.

- https://cwiki.apache.org/confluence/display/TOMCAT/Encoding+and+URIs
- https://stackoverflow.com/questions/41053653/tomcat-8-is-not-able-to-handle-get-request-with-in-query-parameters
- https://stackoverflow.com/questions/50361171/how-to-allow-character-in-urls-for-tomcat-8-5
https://confluence.atlassian.com/jirakb/changing-server-xml-to-handle-requests-with-special-characters-958453799.html
- https://tomcat.apache.org/tomcat-8.5-doc/config/http.html


local 에서  다른 프로젝트 때문에 추가로
