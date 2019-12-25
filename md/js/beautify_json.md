[TOC]

# json 문자열로 변환할때 보기 편하게 변환하기



`JSON.stringify()` 의 인자 중 3번쨰 인자는 만들어지는 JSON 문자열에 들여쓰기할 문자를 설정할 수 있다. 숫자를 넣으면 아래와 같이 들여쓰기가 된다.


```
console.log(JSON.stringify({ x: 5, y: 6 }));
//{"x":5,"y":6}

console.log(JSON.stringify({ x: 5, y: 6 }, null, 2));
//{
//  "x": 5,
//  "y": 6
//}
```

참고
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
