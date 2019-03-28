[TOC]


# 인텔리제이에서 스칼라/Play 프로젝트 열기

업무 인수인계를 했는데 스칼라 프로젝트였다. 한번도 열어본 적 없는 스칼라 프로젝트를 열어서 로컬에서 돌리기.

1. 이건 불필요할 수도 있는데, `brew install scala` 로 스칼라를 로컬에 설치.
1. [스칼라 플러그인](https://plugins.jetbrains.com/plugin/1347-scala)을 인텔리제이에 설치해야 한다.
1. 그리고 `Open` 으로 `build.sbt` 를 선택하고 `open as project` 으로 하면 스칼라 프로젝트로 인식해서 연다.
1. 그런데 아무리 기다려도 프로젝트 빌드가 안 된다. 에러 메시지로 찾아보니 설정에서 `Download: Library sources` 에 체크되있는 것을 해제해야 빌드가 진행이 되었다. [참고](https://stackoverflow.com/questions/47697141/intellij-cannot-import-sbt-project).
1. 로컬에서 웹앱 실행은 `Run/Debug Configuration` 에서 `Play 2 App` 으로 하면 무리 없이 가능.
