[TOC]

# 특정문자의 Unicode Script 이름 알아내기

`Pattern HANGUL_GRAPH_ONLY_PATTERN = Pattern.compile("^[\\p{IsHangul}|\\p{Punct}|\\p{Digit}| ]*$")` 이런 식으로 쓰기 위해 특정 문자가 속한 영역의 이름을 알아내야하는데 정확히 모를때, 아래 코드를 통해 알아낼 수 있다.

```
Character.UnicodeScript.of("가".codePointAt(0))
```

참고 :

https://docs.oracle.com/javase/7/docs/api/java/lang/Character.UnicodeScript.html
