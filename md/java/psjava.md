[TOC]

# 커맨드라인에서 ps로 자바 프로세스 볼때 커맨드라인 옵션의 가독성을 높이기

보통 원격의 리눅스 서버에 들어가서 톰캣 프로세스 상태를 확인하기 위해 `ps -ef | grep java` 같은 명령을 내리면, java 프로세스가 출력되긴 하는데 한줄로 이어져서 줄줄이 표시되서 알아보기가 어렵다.

아래와 같은 alias 를 `~/.bash_profile` 에 넣어두면 `psjava` 라고 입력해서 현재 떠있는 자바 프로세스의 옵션을 잘 알아볼 수 있다.


```
alias psjava='ps -ef | grep java | grep -v grep | sed '\''s/ -/\n\t\t\t\t\t\t\t-/g'\'''
```


예)

```
$ psjava

  501 47408 46971   0 11:33AM ??         0:16.21 /Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home/bin/java
							-Xmx700m
							-Djava.awt.headless=true
							-Djava.endorsed.dirs=""
							-Djdt.compiler.useSingleThread=true
							-Dcompile.parallel=false
							-Drebuild.on.dependency.change=true
							-Djava.net.preferIPv4Stack=true
							-Dio.netty.initialSeedUniquifier=-3699627539313089847
							-Dfile.encoding=UTF-8
							-Duser.language=en
							-Duser.country=KR
							-Didea.paths.selector=IntelliJIdea2019.2
							-Dio.netty.noUnsafe=true
```
