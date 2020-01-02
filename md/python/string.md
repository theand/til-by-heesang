[TOC]

파이썬 문자열 객체에 대해 알게된 것들

# str.translate()

문자열처리를 하다보면 룩업 테이블을 구성해서 A 패턴은 B 패턴으로 치환하고 하는 종류의 작업을 할때가 있는데, str.translate() 를 사용하면 무척 단순화시킬 수 있다.


```
user_input = "This\nstring has\tsome whitespaces...\r\n"

character_map = {
 ord('\n') : ' ',
 ord('\t') : ' ',
 ord('\r') : None
}
user_input.translate(character_map)  # This string has some whitespaces... "
```

>str.translate(table)
Return a copy of the string in which each character has been mapped through the given translation table. The table must be an object that implements indexing via __getitem__(), typically a mapping or sequence. When indexed by a Unicode ordinal (an integer), the table object can do any of the following: return a Unicode ordinal or a string, to map the character to one or more other characters; return None, to delete the character from the return string; or raise a LookupError exception, to map the character to itself.


출처
- https://martinheinz.dev/blog/1
- https://docs.python.org/3.8/library/stdtypes.html#str.translate
