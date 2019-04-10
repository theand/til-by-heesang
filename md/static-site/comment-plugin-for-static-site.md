[TOC]

# 정적 사이트에 댓글 플러그인 연동하기

가장 유명한건 disqus 지만 온갖 트래킹 스크립트를 주렁주렁 달고 오는터라 이건 배제하고, 예전에 본게 있는데 이름이 생각나지 않아 `disqus alternatives` 로 검색하여 깃헙 이슈 커멘트를 댓글로 이용하는 `utterances` 를 찾아내었고 이를 적용해봄.

## 작동 방식

1) 깃헙 이슈는 댓글을 달 수가 있다, 2) 깃헙 이슈의 댓글 보기와 댓글 등록 등은 모두 API로 가능하다는 것을 이용해 정적 사이트에 댓글을 달 수 있게 해주는 구현체이다.

댓글을 표시할 페이지의 `url`, `pathname`, `title` 중에 유저가 설정한 기준을 이용해 해당 페이지에 매칭되는 이슈가 있으면 그 이슈의 댓글 목록을 사이트에 표시해준다.

그 페이지에 댓글이 처음 달릴 때는, 앞서 설정한 기준을 이용해 해당 페이지에 매칭될 이슈가 먼저 등록이 되고, 그 아래로 댓글이 등록된다.

물론 당연히 이를 위해서는 유저가 OAuth 인증을 승인해야 한다. `disqus`도 disqus 계정이 필요하므로 특별히 흠이라고 할 수는 없다.

## 설정

https://utteranc.es/ 의 설명을 따라하면 크게 어려울 건 없다.

1. 저장소가 public 이고 issue 기능이 on 인지 확인.
1. 해당 저장소의 `Installed GitHub Apps` 에 https://github.com/apps/utterances 을 연동.
1. 블로그 포스트와 이슈를 매핑할 규칙을 선택.
1. 이슈가 등록될때 라벨을 붙이려면 지정.
1. 테마 선택까지 하면 추가 가능한 `script` 코드를 얻을 수 있다. 여기서 repo 부분을 자신의 저장소 경로로 수정.
1. 현재 사용하는 `mkdocs`의 테마 레이아웃을 수정하기는 힘들어서, `netlify`의 snippet injection 을 통해 앞단계에서 얻은 클라이언트 스크립트를 추가한다.

```
<script src="https://utteranc.es/client.js"
        repo="theand/til-by-heesang"
        issue-term="pathname"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```
1. 다시 `netlify` 빌드를 하고 원래 사이트를 로딩해보면 댓글 폼이 표시가 된다.
1. 그 댓글 폼의 레이아웃은 유저가 직접 커스터마이징을 해야한다. `.utterances` 와 `.utterances-frame` css 선택자를 통해 지정해야 한다.

## 참고

- http://donw.io/post/github-comments/
- https://news.ycombinator.com/item?id=14170041
- https://fedidat.com/530-blog-comments/
- https://utteranc.es/
- https://github.com/utterance/utterances
