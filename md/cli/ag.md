
# The Silver Searchger a.k.a. ag

ag 는 grep 보다 개선되었다고 주장하는 ack 의 클론으로 출발해서 지금은 기능이 좀 다르고 속도도 ack 보다 더 빠르다고 주장하는 텍스트 검색 커맨드라인 툴이다.

내가 주로 사용하는 케이스에서 사용법이나 결과 화면이 마음에 들어 이걸 주로 사용하고 있다.

source:
- https://geoff.greer.fm/ag/
- https://github.com/ggreer/the_silver_searcher

## 기본 사용법 ##

설치는 늘 그렇듯이 homebrew.

```
brew install the_silver_searcher
```

ag 라는 커맨드로 사용할 수 있다.

```
ag SomeController
```

```
grep  SomeController . -R
```

클래식 grep 의 결과와 비교해보면 차이점을 금방 알 수 있다.

`ag` 현재 디렉토리의 하위 경로를 대상으로 `SomeController`라는 문자열을 검색하는데, 클래식 `grep` 의 기본 설정으로는 모든 파일에 대해 검색을 하기 때문에 불필요한 검색과 결과출력이 발생하는데, `ag`는 소스 저장소에 있는 이미 있는  `.gitignore`  설정을 따라서 검색할 파일의 목록을 구별하기 때문에 불필요한 파일의 내용이 검색되지 않는다. 그리고 결과화면의 검색어 하이라이팅 등은 덤으로 얻는 효과.

## 추가로 무시할 파일 목록을 미리 설정하기

`ag` 기본 설정으로 해결되지 않는 부분이 있다.

`*.min.js` 같은 파일이 소스 저장소에 들어가있다면 `.gitignore` 에서 무시하라고 명시되지 않았으니 `ag` 는  `*.min.js` 의 내용도 검색을 하고 그게 검색결과 화면을 크게 어지럽힌다.

버전컨트롤에서 사용하는 ignore 파일 외에 `ag` 전용으로  `$CWD/.ignore` 혹은  `$HOME/.agignore` 라는 파일에 패턴을 적어두면 이를 읽고 검색하지 않는다.

```
IGNORING FILES
       By default, ag will ignore files whose names match patterns in .gitignore, .hgignore, or .ignore. These files can  be  anywhere  in
       the  directories  being searched. Binary files are ignored by default as well. Finally, ag looks in $HOME/.agignore for ignore pat-
       terns.

       If you want to ignore .gitignore and .hgignore, but still take .ignore into account, use -U.

       Use the -t option to search all text files; -a to search all files; and -u to search all, including hidden files.
```

min js 를 늘 검색에서 제외하기 위해 나는 아래와 같이 설정을 했다.

```
$ cat ~/.agignore
*min*.js
```

이를 적용하는데 설정이 잘 되지 않아서 적지않게 삽질이 필요했고 깃헙 이슈를 봐도 비슷한 이슈가 많아서 포기할 뻔 했는데 다음과 같은 이유였다.

- `.ignore` 파일이 위치한 경로는 명령어가 실행되는 현재 경로(`$CWD`)에 있어야 하고, `.agignore` 는 홈디렉토리(`$HOME`)에 있어야 인식함. git ignore 와 같은 방식으로 작동하지는 않음. 깃헙 이슈에서 정확하지 않거나 오래되어 유효하지 않은 답변들이 있어서 헷갈렸다.
- 파일패턴은 정규표현식(`.*.min.js`)가 아니라 glob 패턴(`*.min.js`)이다. `-G` 옵션에서는 정규표현식을 받기 때문에 헷갈렸다.

ref.
- https://github.com/ggreer/the_silver_searcher/issues/1210
- https://github.com/ggreer/the_silver_searcher/issues/1251
- https://github.com/ggreer/the_silver_searcher/issues/111
