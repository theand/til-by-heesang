
# arrow function 에서 객체 리터럴 리턴하기

가끔 할때마다 세부 문법을 까먹어서 다시 찾아서 정리함.

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions

## return 생략

기본적으로 arrow function 의 body 에 expression 하나만 쓰면 return expression 과 같다.


```javascript
(param1, param2, …, paramN) => expression
// equivalent to: => { return expression; }
```

## 객체 리터럴을 리턴하고 싶다.

원하는건 이런 모양새

```javascript
let pair = (p1, p2) => SOMETHING;
console.log(pair("v1", "v2"))
//expect: { v1: "v2" }
```

그냥 객체 리터럴을 써볼까?

```javascript
let pair = (p1, p2) => {p1: p2};
console.log(pair("v1", "v2"));
//gets undefined
```
안된다.

객체 리터럴을 리턴하려면 괄호로 싸줘야한다.

```javascript
// Parenthesize the body of function to return an object literal expression:
params => ({foo: bar})
```

pair 에 적용해보면
```javascript
let pair = (p1, p2) => ({p1: p2});
console.log(pair("v1", "v2"));
//gets {p1: "v2"}
```

그런데 객체는 리턴하게 됐지만 key 가 원하는대로 다이나믹하게 들어가지 않는다.

찾아보면 ES2015 의 Object initializer 에 computed property name syntax 가 들어왔다.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015

```JavaScript
{
  [SOMETHING] : val
}
```

다시 pair 에 적용해보면
```javascript
let pair = (p1, p2) => ({[p1]: p2});
console.log(pair("v1", "v2"));
//gets {v1: "v2"}
```

### 다른 예제로.

```javascript
['a','b','c'].map( e => {val: e})
// [undefined, undefined, undefined]
```

```javascript
['a','b','c'].map( e => ({val: e}))
//[ {val: "a"}, {val: "b"}, {val: "c"} ]
```

```javascript
['a','b','c'].map( e => ({[e]: e}))
//[ {a: "a"}, {b: "b"}, {c: "c"} ]
```
