[TOC]


# ES2015 iterator 로 date range 만들어보기

generator 로 date range를 만들어봤는데, 그렇다면 iterator 랑은 무슨 차이인가 싶어서 만들어봄.

iterator는 어떤 시퀀스를 정의하여 값을 돌려주는, iterator 프로토콜을 만족하는 객체를 말한다.

iterator 프로토콜은 `.next()` 메소드를 구현하면 되고, `.next()` 메소드는 `done`과 `value`로 시퀀스의 완료여부와 값을 담은 객체를 리턴하면 된다.

iterator 객체는 명시적으로 `.next()` 를 호출하며 순회해야 한다. for of 같은데서 쓰려면 Iterable protocol을 구현해야 한다.

간단히는 이렇게 볼 수 있고, iterable과 `Symbol.iterator` 에 대해서는 내일 알아보자.


참고

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols



## 사용 코드

```javascript

const moment = require('moment');

const start = moment('2018-10-15', 'YYYY-MM-DD');
const end = moment('2018-11-22', 'YYYY-MM-DD');

const moment_daterange = function (start, end) {
    let next = start;

    return {
        next: () => {
            if (!next.isAfter(end)) {
                const ret = next.clone();
                next.add(1, 'd');
                return {value: ret, done: false}
            } else {
                return {value: undefined, done: true};
            }
        }
    };
};


const dateIterator = moment_daterange(start, end);

let result = dateIterator.next();
while (!result.done) {
    console.log(result.value.format(moment.HTML5_FMT.DATE));
    result = dateIterator.next();
}
```
