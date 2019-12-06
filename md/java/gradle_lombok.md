[TOC]

# Gradle 환경에서 lombok 사용하기

build.gradle 에 아래 내용을 넣는 것이 가장 간편해 보인다.


```
repositories {
	mavenCentral()
}

dependencies {
	compileOnly 'org.projectlombok:lombok:1.18.10'
	annotationProcessor 'org.projectlombok:lombok:1.18.10'
}
```

`gradle-lombok` 플러그인을 추천한다고 나와있지만, gradle 을 잘 모르면서 플러그인 설정하는 것까지 조사해볼 시간이 없어서 위 내용을 적용했다.

참고
- https://projectlombok.org/setup/gradle


# Gradle 으로 테스트 케이스를 실행할때 lombok 사용하기

위의 설정으로 빌드할때 lombok 사용은 되지만 테스트 케이스를 돌리니 못 찾는 증상이 발생했다.

테스트 케이스를 수행할때도 작동하게 하기 위해서는 아래와 같이 수정이 필요했다.

```
repositories {
	mavenCentral()
}

dependencies {
	compile 'org.projectlombok:lombok:1.18.10'
	annotationProcessor 'org.projectlombok:lombok:1.18.10'
  testAnnotationProcessor "org.projectlombok:lombok:1.18.10"
}
```

`complieOnly`를 `compile`로 바꾸고, `testAnnotationProcessor`를 추가했다. 앞부분의 변경은 `compileOnly`와 `testCompileOnly`를 둘다 두는 것으로 해도 되긴한다.
