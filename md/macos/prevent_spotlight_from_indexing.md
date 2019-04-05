
# macOS가 spotlight가 node_modules 디렉토리 인덱싱 하는것 막기

스팟라이트 데몬이 `node_modules` 같은 경로를 인덱싱하느라 시스템 리소스 사용이 치솟는걸 볼 수 있는데,  `.metadata_never_index` 파일이 있으면 그 경로는 인덱싱하지 않는다고 한다. (출처 :  https://twitter.com/roelvangils/status/1113074439976075264)

그걸 이용해서 아래와 같은 명령어로 모든 node_modules 에 해당 파일을 만들어놓을 있다.

```
find . -type d -name "node_modules" -exec touch "{}/.metadata_never_index" \;
```
