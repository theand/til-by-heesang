[TOC]

# gradle로 테스트 수행할때 커맨드라인 인자를 테스트케이스로 넘어갈 수 있게 하기

필요 : 테스트 케이스에 들어가는 인자를 CLI에서 넣고 싶다.

해결 :

1. 커맨드라인에서는 `-Dyourkey=yourvalue` 형식으로 인자를 준다.

예)

```
gradle :brunch-core:test \
  --stacktrace \
  -Ddt=2019-10-17  \
  --tests com.yourpackage.YourTest.testYou
```

2. `build.gradle` 에 아래와 같은 설정을 넣어야 한다

```
test {
    systemProperty 'dt', System.getProperty('dt')
}

```

3. JUnit 테스트 케이스에서 아래와 같이 접근하면 된다.

```

    @Test
    public void testYou() {
        String dt = System.getProperty("dt");

    }

```
