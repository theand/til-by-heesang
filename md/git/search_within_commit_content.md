[TOC]

# 커밋 히스토리에서 삭제되거나 추가된 내용 중 필요한 내용 검색하기

## 필요

코드를 정리하다가, 알 수 없는 IP주소가 나왔는데 현재 사용하는 내역이 없는 IP였다. 해당 파일에서의 추가 히스토리는 확인할 수 있었지만, 이 아이피를 사용하는 다른 코드에서의 추가/삭제 내역을 찾고 싶었다.

## 해결

```
git log -Saaa.bbb.ccc.ddd
```

이렇게 -S 뒤에 검색할 IP 문자열을 넣어서 해당 문자열이 추가되거나 삭제된 커밋 로그 목록을 볼 수 있었고, 해당 커밋 아이디를 복사해서 회사에서 사용중인 깃헙 저장소의 경로에 `{github}/{ORG}/{REPO}/commit/{COMMIT_ID}` 와 같은 형태로 접근하여 변경 내역 diff 를 확인할 수 있었다.


참고

- https://git-scm.com/docs/git-log#Documentation/git-log.txt--Sltstringgt
