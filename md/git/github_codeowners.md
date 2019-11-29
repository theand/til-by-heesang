[TOC]

# 깃헙에서 PR이 올라올때 리뷰어가 디폴트로 지정되도록 만들기

리뷰어를 지정할때 특별한 조건이 필요하다면 공개되어있는 GitHub Actions나 아니면 웹훅, 봇 등으로 만드는 수도 있겠지만 그럴 필요가 없이 늘 지정된 인원이 리뷰어로 등록되는 것이 요구사항이라면 `CODEOWNERS` 설정을 통해 가능하다.

프로젝트 루트로부터 `.github/CODEOWNERS` 의 경로의 파일을 만들고 그 내용에 아래와 같이 적으면 된다.

```
*       @userid1 @userid2 @userid3
```

이 내용이 먼저 메인 브랜치에 푸쉬되어 있는 상태가 되면 그 다음부터 올라오는 모든 PR에는 디폴트로 저 목록에 들어있는 리뷰어가 지정된다. 그리고 리뷰어 옆에는 code owner 임을 표시하는 아이콘이 새로 생긴다.

`.gitignore` 에서 사용하는 것과 같은 경로 표현식을 이용하여 특정 경로에 대해서만 code owner를 지정할 수 있기도 한데 자세한 사항은 문서를 참고할 것.

참고
- https://help.github.com/en/github/creating-cloning-and-archiving-repositories/about-code-owners
