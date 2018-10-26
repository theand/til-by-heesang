

Iterator

- iterator object : 어떤 시퀀스를 정의하고, `next()` 를 반복해서 호출해서 다음 값을 얻을 수 있는 객체.
- iterator protocol : `next()` 메소드를 구현하고 리턴값으로 `value`와 `done`을 키로 하는 객체를 리턴한다.

Iterable

- iterable object :  `next()`를 일일이 호출하지 않고 `for ... of` 구문이나 spread operator 에서 쓸 수 있도록 행동을 정의한 객체. iterable protocol을 만족해야 한다.
- iterable protocol : `Symbol.iterator` 메소드를 구현해서 iterator 를 리턴하면 된다.

Generator

- generator object : iterator의 한 형태. iterable protocol과 iterator protocol을 모두 만족한다.
- generator function : `function *` 키워드로 정의하고, `yield` 구문을 통해 제어흐름이 멈추었다가 재개되는 함수.
  ```javascript
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  ```

- generator method : method 로 정의할때는 `function` 을 생략하고 `* generatorName()` 형태로 정의하기도 한다.
  ```javascript
  class Clz {
      * bar () {
          …
      }
  }
  let Obj = {
      * foo () {
          …
      }
  }
  ```


----

참고

- http://es6-features.org/#IteratorForOfOperator
- http://es6-features.org/#GeneratorFunctionIteratorProtocol
- http://es6-features.org/#GeneratorFunctionDirectUse
- http://es6-features.org/#GeneratorMethods
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
- https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e
