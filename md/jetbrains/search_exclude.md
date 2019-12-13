[TOC]

# 전체 검색을 할때 minified resource(js,css)는 제외하고 싶다

Find in Path를 할때 `*.min.js`, `*.min.css`는 검색되지 않게 하고 싶다. 그동안은 해당 경로를 Excluded 처리해놓고 사용해왔는데, 해당 경로에서 검색이 되어야 하는 파일도 있음을 발견했기 때문에 특정 경로를 통채로 제외하는게 아니라 확장자 등의 규칙으로 제외하고 싶어서 찾아보았더니 Custom Scope이란 기능을 발견했고, 정리하는 김에 검색에서 특정 패턴을 제외하기 위한 방법을 정리해보았다.


## File Mask

임시로 쓰기에 가장 간단하다.

Find in Path 다이얼로그에서 File mask 체크박스를 체크하고, 아래 패턴을 입력하면 된다.

```
!*.min.js,!*.min.css
```

## Mark Directory as Excluded

제외 경로로 지정하면 되고, 다른 두 방법과 달리 Search Everywhere 와 VCS에서도 제외가 된다.

지정하는 방법은 아래 둘중 하나로 하면 된다.

1. Project Tool(cmd+1) -> 제외할 경로에서 우클릭 -> Mark Directory as -> Excluded
2. Project Structure(cmd+;) -> Modules -> 해당 경로를 찾아가서우클릭 후 Excluded


## Custom Scope

`Settings | Appearance & Behaviour | Scopes` 에서 Scope 을 생성하고, Find in Path를 할때 해당 Scope을 선택할 수 있다.

프로젝트의 모든 경로에서  `*.min.js`, `*.min.css` 를 제외하기 위한 Scope의 패턴은 다음과 같다. `MyProject`에는 적절한 이름이 들어가야 한다.


```
!file[MyProject*]:*//*.min.js&&!file[MyProject*]:*//*.min.css
```

Search Everywhere에서는 제외되지 않는다. 하지만 File Watchers 등에서도 이 Scope을 사용할 수 있다.



참고
- https://intellij-support.jetbrains.com/hc/en-us/community/posts/206332739-Is-there-any-way-to-exclude-min-js-files-from-project-search-
- https://www.jetbrains.com/help/idea/configuring-scopes-and-file-colors.html
- https://www.jetbrains.com/help/idea/scope-language-syntax-reference.html
