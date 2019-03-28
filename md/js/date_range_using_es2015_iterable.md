[TOC]

# ES2015 iterable 로 date range 만들어보기

iterable protocol은 객체를 `for..of` 같은 구문에서 사용할 수 있게 해준다. 객체에 `Symbol.iterator` 을 이름으로 하는 메소드를 구현하면 이 프로토콜을 만족한다.

메소드 이름을 `Symbol.iterator` 으로 하기 위해서는 computed property syntax 를 쓰면 된다. `[Symbol.iterator]`

요약하자면, iterable 은

- 객체를 `for .. of` 구문을 통해 순회할 수 있게 해준다.
- spread operator (`...`) 에서도 쓸 수 있게 해준다.
- `Symbol.iterator` 메소드를 구현하면 되고, 이 메소드에서는 iterator 를 만들어서 리턴한다.


대략적인 코드 틀은 이러게 나온다고 보면 될 것 같다.

```javascript

const anIterable = {
  //some codes
  [Symbol.iterator]() {
    return {
      next() {
        //some codes
        return {
          value: //some value,
          done: //true/false
        }
      }
    };
  }
};
```

iterable 까지 보고 나니, moment-range 의 이 코드가 이해가 되었다. https://github.com/rotaready/moment-range/blob/master/lib/moment-range.js#L61

참고

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
- https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e

## 사용 코드

```javascript
const moment = require('moment');

const start = moment('2018-10-15', 'YYYY-MM-DD');
const end = moment('2018-11-22', 'YYYY-MM-DD');

const moment_daterange = function (start, end) {
    let next = start;

    return {
        [Symbol.iterator]() {
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
            }
        }
    };
};


const dateIterator = moment_daterange(start, end);

for(let d of dateIterator){
    console.log(d.format(moment.HTML5_FMT.DATE));
}


```

하나씩 개별적으로 알아본 iterator, iterable, generator 의 관계에 대한 정리는 내일 하도록 하자.
