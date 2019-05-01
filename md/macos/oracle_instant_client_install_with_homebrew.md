[TOC]

# homebrew로 Oracle Instant Client 설치하기

python에서 오라클 연결하기 위한 `cx-Oracle` 라이브러리를 설치하려다보니 이걸 설치해야했음.

아래 링크를 기본적으로 참고하면 되는데

- https://cx-oracle.readthedocs.io/en/latest/installation.html#installing-cx-oracle-on-macos
- https://www.oracle.com/technetwork/database/database-technologies/instant-client/overview/index.html


0. homebrew로 설치해보기로 함.

1. 다만 오라클 사이트에서 라이센스 동의를 하고 로그인을 해야 다운로드 받을 수 있기 때문에 brew 에서 다운로드까지 자동으로 해주진 못하고 따로 받아놓아야 한다.

2.

```
brew tap "instantclienttap/instantclient"
brew install instantclient-basic instantclient-sqlplus
```

위와 같이 실행하면 오라클 사이트에서 instant client basic 과 sqlplus 를 다운로드 받아서 특정 경로의 특정 파일로 위치시켜놓은 다음 다시 실행하라는 안내 메시지가 나온다. 그대로 따라하면 된다.

## case

내가 설치한 시점의 버전 기준으로는 아래와 같은 화면을 만나게 된다.

```
$ brew install instantclient-basic instantclient-sqlplus
==> Installing instantclient-basic from instantclienttap/instantclient
Error: The package file can not be downloaded automatically. Please sign in
and accept the licence agreement on the Instant Client downloads page:

  https://www.oracle.com/technetwork/topics/intel-macsoft-096467.html

Then manually download this file:

  http://download.oracle.com/otn/mac/instantclient/181000/instantclient-basic-macos.x64-18.1.0.0.0.zip

To this location (a specific filename in homebrew cache directory):

  /Users/ciao/Library/Caches/Homebrew/downloads/1ace9ca784e431112e837a769fc89eae38ad1489165c38aa698139d25d8fd96b--instantclient-basic-macos.x64-18.1.0.0.0.zip

An example command to rename and move the file into the homebrew cache:

  $ cd /path/to/downloads && mv instantclient-basic-macos.x64-18.1.0.0.0.zip /Users/ciao/Library/Caches/Homebrew/downloads/1ace9ca784e431112e837a769fc89eae38ad1489165c38aa698139d25d8fd96b--instantclient-basic-macos.x64-18.1.0.0.0.zip

Instead of renaming and moving you can create a symlink:

  $ cd /path/to/downloads && ln -sf $(PWD)/instantclient-basic-macos.x64-18.1.0.0.0.zip /Users/ciao/Library/Caches/Homebrew/downloads/1ace9ca784e431112e837a769fc89eae38ad1489165c38aa698139d25d8fd96b--instantclient-basic-macos.x64-18.1.0.0.0.zip

Then re-run the installation:

  $ brew install instantclient-basic
Error: An exception occurred within a child process:
  SystemExit: exit
```

`instantclient-basic` 파일을 먼저 옮긴다.

```
$ mv ~/Downloads/instantclient-basic-macos.x64-18.1.0.0.0.zip /Users/ciao/Library/Caches/Homebrew/downloads/1ace9ca784e431112e837a769fc89eae38ad1489165c38aa698139d25d8fd96b--instantclient-basic-macos.x64-18.1.0.0.0.zip
```

다시 실행하면 `instantclient-basic` 은 설치가 진행이 되고, `instantclient-sqlplus` 에 대한 안내 메시지가 나온다.
```
$ brew install instantclient-basic instantclient-sqlplus
==> Installing instantclient-basic from instantclienttap/instantclient
🍺  /usr/local/Cellar/instantclient-basic/18.1.0.0.0: 12 files, 226.4MB, built in 8 seconds
==> Installing instantclient-sqlplus from instantclienttap/instantclient
Error: The package file can not be downloaded automatically. Please sign in
and accept the licence agreement on the Instant Client downloads page:

  https://www.oracle.com/technetwork/topics/intel-macsoft-096467.html

Then manually download this file:

  http://download.oracle.com/otn/mac/instantclient/181000/instantclient-sqlplus-macos.x64-18.1.0.0.0.zip

To this location (a specific filename in homebrew cache directory):

  /Users/ciao/Library/Caches/Homebrew/downloads/89df168e7865278051f056052e6a23758e488c89bcda30d3c3ecb168a0d14df3--instantclient-sqlplus-macos.x64-18.1.0.0.0.zip

An example command to rename and move the file into the homebrew cache:

  $ cd /path/to/downloads && mv instantclient-sqlplus-macos.x64-18.1.0.0.0.zip /Users/ciao/Library/Caches/Homebrew/downloads/89df168e7865278051f056052e6a23758e488c89bcda30d3c3ecb168a0d14df3--instantclient-sqlplus-macos.x64-18.1.0.0.0.zip

Instead of renaming and moving you can create a symlink:

  $ cd /path/to/downloads && ln -sf $(PWD)/instantclient-sqlplus-macos.x64-18.1.0.0.0.zip /Users/ciao/Library/Caches/Homebrew/downloads/89df168e7865278051f056052e6a23758e488c89bcda30d3c3ecb168a0d14df3--instantclient-sqlplus-macos.x64-18.1.0.0.0.zip

Then re-run the installation:

  $ brew install instantclient-sqlplus
Error: An exception occurred within a child process:
  SystemExit: exit
```

`instantclient-sqlplus` 에 대해서도 위에서 안내한 경로로 옮겨둔다.

```
$ mv ~/Downloads/instantclient-sqlplus-macos.x64-18.1.0.0.0.zip /Users/ciao/Library/Caches/Homebrew/downloads/89df168e7865278051f056052e6a23758e488c89bcda30d3c3ecb168a0d14df3--instantclient-sqlplus-macos.x64-18.1.0.0.0.zip
```

다시 실행하면 설치가 완료된다.

```
$ brew install instantclient-basic instantclient-sqlplus
Warning: instantclienttap/instantclient/instantclient-basic 18.1.0.0.0 is already installed and up-to-date
To reinstall 18.1.0.0.0, run `brew reinstall instantclient-basic`
==> Installing instantclient-sqlplus from instantclienttap/instantclient
🍺  /usr/local/Cellar/instantclient-sqlplus/18.1.0.0.0: 5 files, 2.8MB, built in 4 seconds
```
