[TOC]

# gradle로 test 태스크를 수행할때, stdout과 stderr으로 남겨지는 로그를 콘솔에 바로 표시하기

gradle로 커맨드라인에서 테스트 태스크를 수행할때, gradle 자체의 로그는 콘솔에 출력되지만 테스트 케이스 내부에서 발생하는 로그는 출력이 안되는데 아래와 같이 설정하면 출력이 된다.
 

`build.gradle` 에 추가.

```

test {
    testLogging {
        showStandardStreams = false
    }
}

```

참고 : https://docs.gradle.org/current/dsl/org.gradle.api.tasks.testing.Test.html
