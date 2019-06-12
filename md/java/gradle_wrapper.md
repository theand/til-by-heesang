[TOC]


# 인텔리제이에서 프로젝트마다 다른 gradle 버전 사용하기

## 필요

내 로컬에 homebrew로 설치한 gradle은 5.x 버전인데, 최근 투입된 프로젝트에서 사용하는 gradle은 3.x 이다. `jetty` 플러그인이 4.x 부터 쓸수없게 되었기에 gradle 빌드가 안되는데 `gretty` 로 플러그인을 교체하면 돌아가기는 한다. 빌드 프로세스를 다 이해한 것도 아니라 영향도 파악도 안됐는데 전체 gradle 버전을 올리자고 하기도 뭐하고, 로컬에서 5.x -> 3.x 롤백하는 것도 몹시 귀찮고 싫고 해서, 내 로컬에서만 `build.gradle` 파일에 `gretty` 설정을 넣었다 뺐다하면서 작업하고 있었다. 여기서 파생된 다른 문제들 때문에 지인들에게 한탄을 했더니, gradle wrapper라는 것을 알려줬다.

## 해결

다음과 같은 과정을 통하면, 로컬 머신에 전역 설치된 gradle 의 버전과 별개로 프로젝트마다 다른 gradle 버전을 사용할 수 있게 된다.

 1. `gradle/wrapper/gradle-wrapper.jar` 파일을 적당히 구해서 프로젝트에 집어넣는다. (알수 없는 이유로 내가 투입된 프로젝트에서는 gradle wrapper 관련 파일이 git ignore로 막혀서 이 과정이 필요했다.)
 1. 쉘에서 `gradle wrapper --gradle-version 3.5` 이라고 입력하면 gradle wrapper 파일이 생성된다. 지정한 버전의 gradle 을 쓸 수 있게 된다.
 1. IntelliJ 의 Preference - Build - Gradle 에서 `Use default gradle wrapper` 를 체크하면 아까 지정한 버전의 gradle 으로 빌드가 수행된다.
 1. 전역 gradle 은 최신버전으로 두고, `jetty` 플러그인 대신 `gretty` 플러그인을 사용하기 위해 빌드 설정을 수정해야했던 것을 안해도 된다. 문제 해결.

비고. gradle wrapper 는 아래와 같은 내용으로 생성된다.


```
$ tree gradle
gradle
└── wrapper
    ├── gradle-wrapper.jar
    └── gradle-wrapper.properties

$ bat gradle/wrapper/gradle-wrapper.properties
───────┬───────────────────────────────────────────────────────────────────────────────────────────
       │ File gradle/wrapper/gradle-wrapper.properties
───────┼───────────────────────────────────────────────────────────────────────────────────────────
   1   │ distributionBase=GRADLE_USER_HOME
   2   │ distributionPath=wrapper/dists
   3   │ distributionUrl=https\://services.gradle.org/distributions/gradle-3.5-bin.zip
   4   │ zipStoreBase=GRADLE_USER_HOME
   5   │ zipStorePath=wrapper/dists
───────┴───────────────────────────────────────────────────────────────────────────────────────────
```

# 커맨드라인에서 gradle wrapper 사용하기

## 필요

위에서와 같이 gradle wrapper를 세팅하면 지정한 버전의 wrapper가 세팅이 되지만, 실제 gradle task는 인텔리제이에 연동되서 수행하도록 해놓았고, 특정한 명령어 조합을 확인하기 위해 커맨드라인에서 gradle 태스크를 수행했더니 전역에 설치된 gradle 5.x의 바이너리가 실행되어서 메이저 버전 차이로 인해 원하는 태스크 실행이 안됨은 물론 lombok 지원사항 차이 때문에 컴파일조차 되지 않았다. 커맨드라인에서 gradle wrapper로 태스크를 수행하려면 어떻게 해야하나?

## 해결

간단했다. 위와 같이 셋업을 하면 프로젝트 루트 디렉토리에 `gradlew` 스크립트가 만들어지고 이 스크립트를 실행하면 지정한 버전의 gradle wrapper가 수행되는 것이었다.

```
./gradlew build
````
와 같이 수행하니 지정된 버전의 gradle 바이너리가 수행됨을 확인할 수 있었고 이후 원하는 태스크도 수행할 수 있었다.


참고 : https://docs.gradle.org/current/userguide/gradle_wrapper.html
