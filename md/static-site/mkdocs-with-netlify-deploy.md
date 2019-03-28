[TOC]


# [MkDocs로 만든 사이트](./mkdocs.md)를 netlify 로 배포하기

## netlify

[netlify](https://www.netlify.com/)는 최근 핫한 정적 사이트 호스팅 서비스이다. 그냥 정적 사이트 호스팅이라고 하면 github pages랑 뭐가 다르냐 할텐데, 정적 사이트 호스팅+알파의 알파가 매우 크다.

- continuous deployment : 깃헙에 푸쉬하면 자동으로 빌드되어 배포된다. 깃헙 페이지에서는 jekyll 을 쓰는 경우에만 가능하지만, netlify 에서 자동빌드에 사용하는 [빌드이미지](https://github.com/netlify/build-image/blob/xenial/Dockerfile)를 보면 node.js, python, hugo & go, clojure, php, .net 의 빌드환경이 갖추어져서 해당 환경을 이용한 정적 사이트 생성기를 사용했다면 지속적 배포의 장점을 누릴 수 있다. 깃헙 페이지에서는 jekyll 이 아닌 경우에는 이게 되지 않아, 로컬에서 빌드스크립트를 돌리고 생성된 결과물도 같이 커밋해야했다.

- CDN, Custom domain, HTTPS 등은 깃헙 페이지에서도 대충 비슷하게 되던 기능이긴 하다.

- 디플로이 프리뷰 : 혼자 만드는 사이트라 사용해보진 않았지만 PR 이 있을때 그 PR의 결과물을 볼 수 있도록 빌드한 결과물의 URL이 나온다고 하더라.

그외에 더 상세한 기능은 [feature](https://www.netlify.com/features/)를 참고.

## MkDocs 사이트 적용하기

### 코드 베이스에 추가할 내용

1. 빌드에 필요한 개발환경 명시하기 : 파이썬 3.6을 쓸 것이고, `runtime.txt` 를 만들고 아래 내용을 저장한다.

```
3.6
```


2. 빌드에 필요한 파이썬 패키지 명시하기 : `requirements.txt` 에 아래 내용을 넣는다.

```
mkdocs
```

3. 빌드 스크립트 만들어두기 : 꼭 필요한건 아닌데, 나는 build.py 라는걸 돌려야해서 아래의 내용을 `build.sh`라는 파일로 만들어두었다.
```
#!/usr/bin/env bash

cd md && ./build.py
cd .. && mkdocs build --clean
```

### netlify 사이트 설정에서 지정할 내용

`Setting` - `Build & deploy`

1. Continuous Deployment

- `Repository` : 본인의 깃헙 계정 연동하여 저장소 지정
- `Build.command` : 빌드 명령어 입력. 나는 아까 만들어둔 `./build.sh` 를 입력했다. 별도 빌드스크립트가 없다면, 그냥 `mkdocs build --clean` 만 입력해도 될 것이다.
- `Publish directory` : 빌드된 정적 사이트 결과물이 놓이는 경로. 이 경로의 내용으로 배포가 이루어진다. MkDocs 기본 설정을 변경하지 않았으므로 `site` 을 지정한다. 정적사이트생성기 마다 경로가 다르다.

2. `Post Processing`

- `Snippet injection` : `body`나 `head` 태그 끝나기 전에 코드 조각을 넣을 수 있다. 나는 MkDocs를 readthedocs 테마의 최소설정을 사용하고 있기 때문에 google analytics 코드를 넣을려면 문서를 뒤적거려야 했는데 이 기능 덕분에 더 뒤져보지 않고 바로 ga 코드를 넣을 수 있었다.

### 빌드&배포 과정 확인하기

`Deploys` 탭에서 빌드 로그와 결과를 알 수있다. 빌드이미지가 올라오면서 각종 개발환경을 로딩하고 위에서 지정한 환경을 이용해 빌드 명령어룰 수행한 결과가 나오므로 오류가 있다면 확인하여 수정 후 푸쉬하면 자동 빌드가 될 것이고 필요하다면 `Trigger deploy` 를 눌러서 다시 확인해볼 수 있다.

### 배포된 결과물 확인하기

디폴트 도메인으로 `sitename.netlify.com` 이 부여되고, 본인 소유 도메인이 있다면 CNAME 설정을 통해 연결할 수도 있다.

위 과정을 거쳐 이 TIL 저장소는 [Heesang's TIL](https://til.heesang.dev/)으로 배포하고 있다.
