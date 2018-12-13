
# gradle 플러그인 jetty 대신 gretty 쓰기

## 문제

기존에 하던 프로덕트 외에 추가로 투입된 프로덕트를 로컬에서 실행해보려고 세팅하는데, 에러메시지와 함께 빌드가 진행되지 않음.

```
Error:(2, 0) Plugin with id 'jetty' not found
```

gradle 기반 프로젝트는 처음이라 무슨 상황인지 모르겠어서, 에러 메시지로 검색을 해봄.

jetty 플러그인은 gradle 3.0 에서 deprecated 되었고, 4.0 에서 완전히 삭제되었다는 것 같음.

내 로컬에 설치된 gradle은 5.0 이었음. 이 프로젝트의 기존 개발자들이나 빌드서버의 환경은 아마 4.0 미만이었을걸로 추정됨.

source
- https://github.com/gradle/gradle/issues/735

## 해결

문서에서 jetty 대신 gretty 라는걸 추천함. 서블릿 컨테이너로 jetty, tomcat 을 다 지원해주는 플러그인인가봄.

문서에 나온 설정법이 여러가지였는데, 지금 프로젝트의 설정에서 작동하는건 아래와 같이 github에 있는 스크립트 주소를 하드코딩하는 방법만 작동했다. gradle 경험이 없다보니 어디선가 설정이 빠졌거나 설정을 넣은 위치가 잘못 되었거나 한게 아닐까 추측해본다.


before
```
apply plugin: "jetty"
``

after
```
apply from: 'https://raw.github.com/gretty-gradle-plugin/gretty/master/pluginScripts/gretty.plugin'
```

에러남
```
    plugins {
        id "org.gretty" version "2.3.1"
    }
```

source :
- https://docs.gradle.org/current/userguide/jetty_plugin.html
- https://github.com/gretty-gradle-plugin/gretty
- https://gretty-gradle-plugin.github.io/gretty-doc/Getting-started.html
- https://plugins.gradle.org/plugin/org.gretty
