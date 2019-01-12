
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


# 2019-01-13 : day 3 - THE VUE INSTANCE - DATA DRIVEN APPLICATIONS

https://www.fullstack.io/30-days-of-vue/day-03-the-vue-instance---data-driven-applications/

- data : vue 인스턴스의 `data` 프로퍼티에 선언한 key-value 조합은 뷰 라이브러리가 알아서 getter, setter를 만들고 값의 변화를 추적해 변경사항이 있을떄 템플릿이 렌더링을 다시 하게 됨.

- data driven application
  - vanilla js 샘플 앱 : DOM 이 값의 근원이 됨. 값을 읽고 변경하기 위해 계속 DOM을 직접 읽고 써야함.
  - vue js 샘플 앱 : vue 인스턴스의 data 프로퍼티가 값의 근원이 됨. DOM을 직접 읽고 쓰는 일이 거의 없음.

- VUE DATA PROPERTIES : vue 인스턴스가 생성될될때 reactivity를 초기화하므로, 사용하려는 데이터를 미리 선언해놔야 한다. 이것 때문에, 이미 생성된 인스턴스에 프로퍼티를 직접 추가하거나 삭제할 수 없게 된다. (2019년에 나올 vue 3.0에서는 이게 가능해질 예정이라고 한다)
