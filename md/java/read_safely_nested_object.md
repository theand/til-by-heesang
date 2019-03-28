[TOC]


# 중첩된 객체의 요소를 안전하게 조회하기

## 상황

기존 자바 코드 중에 api json 응답을 읽어서 HashMap 으로 구성해서 그 안의 요소를 참조하는데 null 체크로 뒤범벅이 되있는 코드가 눈에 띄었고 이게 영 마음에 들지 않았다.

문제 코드.

```java
Map<String, Object> map = restTemplate.postForObject(requestUrl, request, HashMap.class);
if (map != null && ((Map<String, String>) map.get("info")).get("processed_terms") != null
		&& ((Map<String, String>) map.get("info")).get("processed_terms").length() > 0) {

	String processed_terms = ((Map<String, String>) map.get("info")).get("processed_terms");
	keywordList = Lists.newArrayList(processed_terms.split(" "));
}
```

언어차원에서 [safe navigation operator](https://en.wikipedia.org/wiki/Safe_navigation_operator)가 지원됐으면 간단했겠고, loosely-typed 언어라면 객체에 path 를 지정해 조회하는 기능의 라이브러리 함수를 흔히 사용하는데( [ruby Hash#dig](https://ruby-doc.org/core-2.5.0/Hash.html#method-i-dig), [lodash _.get](https://lodash.com/docs/4.17.11#get)).. 둘다 아닌 자바에선 어떻게 해야할까?

## 시도

1. `Optional` 을 이용해서 어찌어찌해보려 했으나 옵셔널을 깊게 이해하지도 못했기 때문에 `Map<String, Object> map` 이걸 가지고 뭘 해보려는게 잘 안됐다. 실패.

2. `HashMap` 으로 매핑하지 않고 json 문자열에서 바로 조회할 수 있는 [Jayway JsonPath](https://github.com/json-path/JsonPath)를 소개 받았다.

```
<dependency>
    <groupId>com.jayway.jsonpath</groupId>
    <artifactId>json-path</artifactId>
    <version>2.4.0</version>
</dependency>
```

```java
@Bean
public ParseContext parseContext(){
	Configuration conf = Configuration.defaultConfiguration()
			.addOptions(Option.SUPPRESS_EXCEPTIONS)
			.jsonProvider(new JacksonJsonProvider())
			.mappingProvider(new JacksonMappingProvider());
	return JsonPath.using(conf);
}

@Autowired ParseContext parseContext;
```

```java
DocumentContext context = parseContext.parse(restTemplate.postForObject(requestUrl, request, String.class));
String processed_terms = context.read("info.processed_terms");
if( StringUtils.isNotBlank(processed_terms)){
	keywordList = Lists.newArrayList(processed_terms.split(" "));
}
```

준비 코드가 들어가야 했지만 null 체크하는 조건문을 없앨 수 있었다.

근데 이것 때문에 의존성이 하나 늘어난 것은 감안해야 하는데, 다른 부분에서도 이걸 쓰도록 해서 코드를 간결하게 만들 수 있을거라고 위안을 해본다.
