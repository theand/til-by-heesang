[TOC]

# 어느 객체에 바인딩 되있는 메소드들 살펴보기

필요했던 상황 : 빌드에는 문제가 없었는데 코드를 실행하면 없는 메소드라고 떴다. 브레이크 포인트를 걸어놓고 그 지점에서 해당 객체에 들어가있는 메소드 목록을 보고 싶었는데, 그냥 디버그 뷰에서는 객체의 프로퍼티는 표시해줘도 메소드는 보여주지 않았다.

해결: 브레이크 포인트에 걸려있는 상황에서 Watch 뷰에 `thatObject.getClass().getMethods()` 라고 하니 바인딩되어 있는 퍼블릭 메소드의 목록을 볼 수 있었다.

목록을 보고 실제로 원하는 메소드가 없는 것을 확인했고, `build`, `target`, `out` 등의 빌드 결과물이 들어가있을 법한 폴더를 모두 삭제하고, 빌드를 다시 했더니 문제가 사라졌다.


참고
- http://www.avajava.com/tutorials/lessons/how-do-i-list-the-public-methods-of-a-class.html
- https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html
