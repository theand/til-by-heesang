
# 프로젝트마다 다른 gradle 버전 사용하기

내 로컬에 homebrew로 설치한 gradle은 5.x 버전인데, 최근 투입된 프로젝트에서 사용하는 gradle은 3.x 이다. `jetty` 플러그인이 4.x 부터 쓸수없게 되었기에 gradle 빌드가 안되는데 `gretty` 로 플러그인을 교체하면 돌아가기는 한다. 빌드 프로세스를 다 이해한 것도 아니라 영향도 파악도 안됐는데 전체 gradle 버전을 올리자고 하기도 뭐하고, 로컬에서 5.x -> 3.x 롤백하는 것도 몹시 귀찮고 싫고 해서, 내 로컬에서만 `build.gradle` 파일에 `gretty` 설정을 넣었다 뺐다하면서 작업하고 있었다. 여기서 파생된 다른 문제들 때문에 지인들에게 한탄을 했더니, gradle wrapper라는 것을 알려줬다.

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
