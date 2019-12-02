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
