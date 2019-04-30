[TOC]

# less 로 여러개의 파일을 열었을때 다음 파일로 넘어가기

```
less +F catalina.out app.log app-info.log
```
와 같이 여러개의 파일을 열었을때 다음 파일로 넘어가는 방법.

scroll forward mode(+F)에서 `ctrl+c` 를 누른 다음 `:n` 은 다음 파일, `:p` 는 이전 파일로 이동.

source : https://superuser.com/questions/347760/less-command-with-multiple-files-how-to-navigate-to-next-previous/347761
