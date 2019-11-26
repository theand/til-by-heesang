[TOC]

# 이 저장소의 모든 author 목록을 얻고 싶다

1. 커밋 횟수 순으로 정렬해서 보기

```
git shortlog --summary --numbered --email
```

1. 이름순으로만 정렬해서 보기

```
git log --pretty="%an %ae%n%cn %ce" | sort | uniq
```


참고
- https://stackoverflow.com/questions/9597410/list-all-developers-on-a-project-in-git
- https://git-scm.com/docs/git-shortlog
- https://git-scm.com/docs/git-log/#_pretty_formats
