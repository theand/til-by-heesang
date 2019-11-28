[TOC]

# macos에서 GNU sed 사용하기

macos에 기본으로 탑재되어 있는 sed 는 BSD sed인데, 원격 서버에는 보통 리눅스가 깔려있고 거기에는 GNU sed를 사용한다. 그래서 sed 를 사용하는 스크립트는 한쪽에서 돌아가면 다른 한쪽에서 안 돌아가기 쉽다. 그래서 macos에 GNU sed를 설치해서 쓰면 맥과 리눅스에서 모두 돌아가도록 특별히 고민하지 않아도 된다.

GNU sed는 Homebrew로 설치하고, 약간의  설정이 필요하다.

```
brew install gnu-sed
```

이렇게 설치하면 `gsed` 라는 이름으로 설치가 된다.

```
$ which gsed
/usr/local/bin/gsed
```

하지만 목표는 sed라는 커맨드를 사용하는 것이다. 설정하는 법은 Homebrew로 설치한 직후의 메시지에 나오는대로 하면 되는데, 바로 쉘 설정 파일에 기본 PATH 보다 먼저 GNU sed의 실행파일이 있는 위치를 PATH로 넣으면 되는 것이다.

>GNU "sed" has been installed as "gsed".
>If you need to use it as "sed", you can add a "gnubin" directory
>to your PATH from your bashrc like:
>    PATH="/usr/local/opt/gnu-sed/libexec/gnubin:$PATH"

PATH 설정을 마치고, 관련된 파일 경로를 보면 다음과 같다.

```
$ ll /usr/local/bin/gsed
lrwxr-xr-x 1 ciao admin 30 Apr 18  2019 /usr/local/bin/gsed -> ../Cellar/gnu-sed/4.7/bin/gsed*

$ ll /usr/local/opt/gnu-sed/libexec/gnubin/
total 0
lrwxr-xr-x 1 ciao staff 14 Dec 21  2018 sed -> ../../bin/gsed*

$ which sed
/usr/local/opt/gnu-sed/libexec/gnubin/sed
```
