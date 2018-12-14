
# 필요

til 에 작성한 마크다운 문서 목록을 [인덱스](../index.md)로 만들어주는 [스크립트](../build.py)를 몇년전에 만든걸 그대로 쓰고 있었는데, 이번에 til 을 진행하다가 보니 디렉토리와 문서의 순서가 알파벳순이 아닌 것을 발견함.

for 문에서 루프 돌기 전에 정렬하면 되는데, `list.sort()` 는 `None` 을 리턴하기 때문에 변수에 한번 할당하고 써야함. 굳이 한줄 더 쓰지 않고 정렬된 리스트를 바로 쓰고 싶다.


# 해결

https://docs.python.org/3.7/library/functions.html#sorted

`sorted` 함수를 쓰면 정렬된 리스트를 바로 리턴해줌. python 2.4 에서 생긴 함수였는데, 내가 파이썬을 워낙 옛날에 기본 문법, 함수만 보고 그 이후로 업데이트를 잘 안 했다보니 익숙하지 않은 함수였던 듯.

아래와 같이 `-,+` 수정하여 해결함.

```python
 indexfile = open("index.md", "w")

 # print out to index.md
-for category in dicts:
+for category in sorted(dicts.keys()):
     print(category, file=indexfile)
     print('====', file=indexfile)
     print('', file=indexfile)
-    for title in dicts[category]:
+    for title in sorted(dicts[category]):
```
