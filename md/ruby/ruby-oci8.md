[TOC]

# ruby-oci8 젬 설치하기

맥북 장비를 바꾸고 나서 가끔 사용하는 프로젝트의 작동을 확인하려고 하다가

```
gem install ruby-oci8
```

을 했더니 빌드 에러가 뜸. 해당 환경 세팅한게 2년도 훨씬 전이라 기억이 잘 안났는데 에러 메시지 중에 안내 링크가 있어서 들어가봄.

https://www.rubydoc.info/github/kubo/ruby-oci8/file/docs/install-on-osx.md

- 며칠전에 python `cx_Oracle` 라이브러리 때문에 instantclient basic과 sqlplus 는 설치했는데 sdk는 필요 없어도 되는 것 같아서 설치를 안했는데 ruby gem 에서는 sdk가 필요한듯.
- sdk 는 기존과 같이 설치. 자동다운로드가 안되므로 웹사이트 들어가서 직접 다운로드 받아놓은 다음에 brew 실행해서 안내 메시지 보고 해당 위치로 파일 옮겨놓은 다음 다시 설치.

```
brew install instantclient-sdk
mv ~/Downloads/instantclient-sdk-macos.x64-18.1.0.0.0-2.zip /Users/ciao/Library/Caches/Homebrew/downloads/30eed7ec4b699302bdf15b028a7c8db70292871fe4d9e17c42c05d2cae02bba6--instantclient-sdk-macos.x64-18.1.0.0.0-2.zip
brew install instantclient-sdk
```


- sdk 파일 잘들어가 있는지 확인

```
ls /usr/local/opt/instantclient-sdk/lib/sdk/include/
```

- 환경 변수 셋업 필요.
```
export OCI_DIR=/usr/local/opt/instantclient-basic/lib
export DYLD_FALLBACK_LIBRARY_PATH=$HOME/lib:/usr/local/lib:/lib:/usr/local/opt/instantclient-basic/lib
```

이제 다시 `gem install ruby-oci8`을 하면 제대로 설치가 됨.

