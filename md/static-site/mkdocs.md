
til 저장소를 static site 로 만들기 위해 적당한 템플릿을 찾다가  [MkDocs](https://www.mkdocs.org/)으로 정했다.

# 기본 사용법

0. 사이트에 나온 설치 및 시작 사용법을 따라 해본다. 우선 til 저장소에 적용할거라 미리 이동해있는 상태에서 시작.

1. 일단 패키지 설치.

```
pip3 install mkdocs
```

2. 환경 초기화를 하고 무작정 빌드하고 서버를 띄워서 브라우저로 확인해본다. 뭐가 보이긴 한다.

```
mkdocs new .
mkdocs serve
```

3. 설정 파일은 `mkdocs.yml` 에 있다고 한다. 문서를 참고해 아래와 같이 고쳤다.

```yaml
site_name: Heesang's TIL
docs_dir: md
nav:
        - 'By Categories': index.md
theme: readthedocs
```

4. 이걸 위해 기존에 있던 문서를 모두 `md/` 경로로 이동시켰다. 빌드된 정적 페이지는 `site/` 으로 나온다. 커밋 히스토리 유지를 위해 아래 명령어를 사용했다.

```
git mv coding-quiz/ index.md jetbrains/ lecture/ macos/ vuejs/ build.py cli/ java/ js/ lifehack/ meta/ python/ ruby/ userscript/ md
```

5. `site/` 를 날리고 새로 빌드해보려면 다음 명령어로 가능.

```
mkdocs build --clean
```

6. 나는 다행히 예전에, [build.py](../build.py)라는 스크립트를 만들어서 [index.md](../index.md)를 생성하도록 해두었었기 때문에 이번에 작업할때 TIL 문서 인덱스를 생성하는 과정을 스킵할 수 있었다.

여기까지가 md 로 작업된 문서들을 정적 사이트로 옮기는 기본 사용법이었다. 이 정적 사이트를 퍼블리싱하는 것은 별도의 이슈이므로 여기에서 일단 마무리.
