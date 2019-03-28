[TOC]


[30 days of vue](https://www.fullstack.io/30-days-of-vue/)라는 강좌사이트가 눈에 띄었는데, vue도 까먹어가고 있는지 한참이기도 해서 하루에 한개씩 보면서 해치우기 좋은 구성인 것 같아서 바로 시작.

# 2019-01-09 : day 1 - what is vue
https://www.fullstack.io/30-days-of-vue/day-01-what-is-vue/

- progressive : 간단히 쓸때는 빌드 툴 필요 없이 jquery 처럼 `<script src="https://cdn.jsdelivr.net/npm/vue"></script>` 으로 바로 쓸 수 있다. 복잡해지면 관련 툴 생태계의 도움을 받아 더 생산적인 구성을 할 수도 있다.
- approachable : html, css, js만 알면 된다.
- versatile : vue 코어팀에 의해 관리되는 에코시스템이 있다. `vue-cli`, `vue-router`, `vuex`, `vue-test-utils` 등.
- performant : virtual DOM 으로 빠른 렌더링의 장점을 확보한다.

헬로월드 찍기

```javascript

new Vue({
  el: '#app',
  data: {
    greeting: 'Hello World!',
  },
});
```

```html
<html>
  <body>
    <div id="app">
      <h2>{{ greeting }}</h2>
    </div>
    <script src="https://unpkg.com/vue"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

# 2019-01-12 : day 2 - THE VUE INSTANCE - DATA
https://www.fullstack.io/30-days-of-vue/day-02-the-vue-instance---data/

- THE VUE INSTANCE : vue 앱의 시작점. data 프로퍼티에 데이터를 바인딩 해두고 인스턴스에서 템플릿에서 사용할 수 있게 해준다.

```javascript
new Vue({
  el: '#app',
  data: {
    greeting: 'Hello World!',
  },
});
```

```html
<html>
  <head>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <div id="app">
      <h2>{{ greeting }}</h2>
    </div>
    <script src="https://unpkg.com/vue"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

- METHODS AND HANDLING EVENTS : data 프로퍼티에 있는 값은 reactive 하다. 뷰 인스턴스에 있는 값이 바뀌면 템플릿을 다시 렌더링해서 바뀐 값을 보여준다.

```html
<html>
  <head>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <div id="app">
      <h2>{{ greeting }}</h2>
      <button v-on:click="changeGreeting">
        Change Greeting
      </button>
    </div>
    <script src="https://unpkg.com/vue"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

```javasctipt
new Vue({
  el: '#app',
  data: {
    greeting: 'Hello World!',
  },
  methods: {
    changeGreeting() {
      this.greeting = this.greeting === 'Hello World!' ?
       'What is up!' :
       'Hello World!';
    }
  }
});
```

> When a Vue instance is instantiated, Vue recursively creates a series of getters and setters for each data property to make them reactive. Within an instance, the data object can then be accessed with this.$data. With proxying, Vue proxies all the properties of the instance so this.$data.greeting is equal to simply stating this.greeting


# 2019-01-12 : day 3 - THE VUE INSTANCE - DATA DRIVEN APPLICATIONS

https://www.fullstack.io/30-days-of-vue/day-03-the-vue-instance---data-driven-applications/

- data : vue 인스턴스의 `data` 프로퍼티에 선언한 key-value 조합은 뷰 라이브러리가 알아서 getter, setter를 만들고 값의 변화를 추적해 변경사항이 있을떄 템플릿이 렌더링을 다시 하게 됨.

- data driven application
  - vanilla js 샘플 앱 : DOM 이 값의 근원이 됨. 값을 읽고 변경하기 위해 계속 DOM을 직접 읽고 써야함.
  - vue js 샘플 앱 : vue 인스턴스의 data 프로퍼티가 값의 근원이 됨. DOM을 직접 읽고 쓰는 일이 거의 없음.

- VUE DATA PROPERTIES : vue 인스턴스가 생성될될때 reactivity를 초기화하므로, 사용하려는 데이터를 미리 선언해놔야 한다. 이것 때문에, 이미 생성된 인스턴스에 프로퍼티를 직접 추가하거나 삭제할 수 없게 된다. (2019년에 나올 vue 3.0에서는 이게 가능해질 예정이라고 한다)


# 2019-01-13 : day 4 - VUE DIRECTIVES

https://www.fullstack.io/30-days-of-vue/day-04-vue-directives/

- `v-on` :  이벤트 리스너 생성. vue 인스턴스의 메소드를 트리거하거나 자바스크립트를 인라인으로 넣을 수 있다. 어느 native dom 에나 넣을 수 있다.
- key modifier : 키보드 이벤트를 리스닝할때는 많이 쓰이는 키에 대해 미리 정의된 key modifier를 사용해 키코드를 체크할 수 있다. see https://vuejs.org/v2/guide/events.html#Key-Modifiers
- `$event` : 이벤트 자체에 대한 세부 정보를 담은 객체를 참조할 수 있는 이름이다.
- `v-bind` : HTML 요소의 text content에는 `{{ variable }}` 와 같은 식으로 데이터 값을 바인딩할 수 있지만, HTML attribute에는 그렇게 할 수 없고 `v-bind` 디렉티브를 사용해야 한다.
- `v-if`, `v-show` : 어떤 표현식의 값에 따라 컨텐트를 렌더링할지 말지 결정할때 쓸 수 있는 디렉티브. `v-else` 와 `v-else-if` 디렉티브도 있다.
  - `v-if` : true가 아니면 요소를 렌더링하지 않는다.
  - `v-show` : 요소는 항상 렌더링되지만 css display 속성으로 show/hide를 제어한다.
  - dom 요소가 굳이 존재해야할 필요가 없으면 보통 `v-if`를 선호하고, dom 요소가 굳이 존재해야할 필요가 있거나 토글이 자주 발생하는 경우에는 `v-show`가 적합하다.
- shorthand syntax :
  - `v-bind` -> `:`
  - `v-on` -> `@`

example
```HTML
<!-- the full syntax -->
<img v-bind:src="dataProperty" />

<!-- the shorthand syntax -->
<img :src="dataProperty" />

<!-- the full syntax -->
<button v-on:click="methodName"></button>

<!-- the shorthand syntax -->
<button @click="methodName"></button>
```

# 2019-01-17 : day 5 - LIST RENDERING WITH V-FOR

https://www.fullstack.io/30-days-of-vue/day-05-list-rendering-with-v-for/


`v-for` :

  - 데이터 소스의 아이템 리스트를 렌더링할때 사용.
  - `v-for="item in items"`와 같은 문법이 필요.
  - `key` 속성 :
    - `v-for` 리스트에서 순회하여 렌더링하는 모든 요소들에 대해 `key` 속성을 명시하는게 관례. 각 요소에 대해 고유한 `key` 속성을 설정하면 이를 통해  각 노드의 아이덴티티를 고유하게 바인딩하여 관리할 수 있다.
    - 기본적으로는 데이터소스에 따라 UI도 동적으로 변경되게 될때, DOM 노드를 움직이지 않고 각 요소 안에 있는 값만 바뀐다. 하지만 DOM의 상태나 자식 컴포넌트의 상태에 의존하는 경우에는 예상 밖의 동작을 하게 된다. `key` 를 통해 `v-for`가 렌더링한 DOM 노드를 하나의 아이덴티티로 묶어서 인식할 수 있게 해주어야 한다.
    - `key` 속성은 항상 사용하길 권장되고 있고, 1) 성능상의 이유로 DOM의 이동이 아니라 요소만 바꾸는 기본 동작을 원하는게 확실한 경우, 2) DOM 컨텐트가 너무 심플한 경우에만 생략할 것을 권고하고 있다.

```javascript
new Vue({
  el: '#app',
  data: {
    numbers: [
      {id: 1, value: 1},
      {id: 2, value: 10},
      {id: 3, value: 100},
      {id: 4, value: 1000},
      {id: 5, value: 10000}
    ],
  },
  methods: {
    shuffle() {
      this.numbers = _.shuffle(this.numbers)
    }
  }
});
```

```HTML
<html>
  <head>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <div id="app">
      <ul>
        <li v-for="number in numbers" :key="number.id">
          <p>{{ number.value }}</p>
          <input placeholder="type something..." />
        </li>
      </ul>
      <button @click="shuffle">Shuffle!</button>
    </div>
    <script src="https://unpkg.com/vue"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/lodash/lodash.js">
    </script>
    <script src="./main.js"></script>
  </body>
</html>
```

이렇게 하면, vue가 각 리스트 아이템(li)의 아이덴티티를 인식할 수 있게 된다.



# 2019-01-18 : day 6 - FORM HANDLING WITH V-MODEL

https://www.fullstack.io/30-days-of-vue/day-06-form-handling-with-v-model/


`v-model`
 - 유저 입력(form input -- text input, textarea, checkbox, radio button, dropdown 등등)과 vue 인스턴스의 데이터모델을 직접 양방향으로 연결해서 한쪽이 바뀌면 다른쪽도 같이 바뀔 수 있게 해준다.
 - `v-model="dataProperty"` : 이 문법은 해당 입력이 바인딩될 data 프로퍼티의 이름을 취한다.

```javascript
new Vue({
  el: '#app',
  data: {
    name: '',
    subject: '',
    termsAndConditions: false,
    yesOrNo: 'No'
  },
  methods: {
    submit() {
      console.log('name', this.name);
      console.log('subject', this.subject);
      console.log(
        'termsAndConditions',
        this.termsAndConditions
      );
      console.log('yesOrNo', this.yesOrNo);
    }
  }
});
```

```HTML
<html>
  <head>
    <link rel="stylesheet" href="./styles.css" />
    <link rel="stylesheet"
      href="https://unpkg.com/bulma/css/bulma.css" />
  </head>

  <body>
    <div id="app">
      <div class="field">
        <label class="label">Name</label>
        <input v-model="name"
          class="input"
          type="text"
          placeholder="Text input" />
      </div>

      <div class="field">
        <label class="label">Subject</label>
        <div class="select">
          <select v-model="subject">
            <option disabled value="">
              Select dropdown
            </option>
            <option>Engineering</option>
            <option>Computer Science</option>
            <option>Biology</option>
            <option>Other...</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="checkbox">
          <input v-model="termsAndConditions"
            type="checkbox" />
          I agree to the terms and conditions
        </label>
      </div>

      <div class="field">
        <label class="radio">
          <input v-model="yesOrNo"
            type="radio"
            value="Yes" />
          Yes
        </label>
        <label class="radio">
          <input v-model="yesOrNo"
            type="radio"
            value="No" />
          No
        </label>
      </div>

      <div class="field">
        <button class="button is-info" @click="submit">
          Submit
        </button>
      </div>
    </div>
    <script src="https://unpkg.com/vue"></script>
    <script src="./main.js"></script>
  </body>
</html>
```


# 2019-01-19 : day 7 - VUE DEVTOOLS

https://www.fullstack.io/30-days-of-vue/day-07-vue-devtools/

[Vue Devtools ](https://github.com/vuejs/vue-devtools)은 vue 코어팀이 만든 개발툴. 크롬 확장, 파이어폭스 애드온, 스탠드얼론 일렉트론 앱으로 제공된다.

크롬 확장을 설치하고 활성화한 상태에서, 페이지에 프로덕션 버전인 `vue.min.js`가 아니라 개발용 버전인 `vue.js`가 로딩되어 있으면 vue devtools이 사용가능해진다.

`http` 로 페이지를 로딩한 것이 아니라 로컬 파일을 `file://` 프로토콜로 로딩한 페이지에서도 쓰고 싶으면 크롬 확장 설정에서  권한을 허용해야 한다.

위 조건을 만족시킨 상태에서 개발자 도구 윈도우를 띄우면 `Vue` 탭이 생긴다. 여기에서 vue 인스턴스의 루트부터 포함하고 있는 하위 컴포넌트들의 각 data 프로퍼티 값을 모니터링할 수 있고, 바로 여기에서 값을 변경할 수도 있다.


# 2019-01-20 : day 8 - METHODS AND COMPUTED PROPERTIES

https://www.fullstack.io/30-days-of-vue/day-08-methods-and-computed-properties/

- methods :  method 를 사용하지 않고, 템플릿에서 인라인으로 js 코드를 실행시켜도 된다. 이렇게 하는게 본질적으로 틀린 것은 아니지만, method를 쓰는것이 향후의 변경사항이 발생했을때 파악하기 쉽고 템플릿을 깨끗하고 이해하기 쉽게 유지할 수 있게 해준다.
- computed properties : 뷰에서 표시하는 정보가 복잡한 계산을 필요로 하는 경우를 처리하기 위해 쓰인다.
- method 와 computed property : 주요 차이점은 computed property 는  의존하는 데이터를 기준으로 캐싱이 된다는 점이다. 의존하는 data 프로퍼티가 변하지 않는다면 computed property는 캐쉬된 값을 돌려준다. 그러므로 computed property를 쓸 자리에 method를 사용할 수도 있지만, data property를 기반으로 한 값을 계산해야 한다면 computed property를 쓰는게 기본이다. 그리고 캐싱의 효과를 덤으로 얻을 수 있다.
  - method 는 파라메터를 받을 수 있고, computed property는 받을 수 없다.
- 대략 다음과 같이 사용하면 된다.
  - method : 변경사항에 반응할때(이를테면 버튼 클릭, 폼 제출 등)나 아니면 인스턴스 내에서 명시적인 기능 변경이 필요할때(이를테면 라이프사이클 훅)
  - computed property : 데이터 조작.
