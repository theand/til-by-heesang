[TOC]


# Spring RestTemplate의 StringMessageConverter에 UTF-8 인코딩 지정하기


## 발단

레거시 코드를 수정하다가 `HttpUtil` 이라는 유틸클래스로 `Apache HTTP Client`를 래핑해서 http requst/response 를 처리하는 코드가 있었는데, 너무 못생기고 마음에 들지 않아서 스프링 `RestTemplate`으로 바꿔넣고 싶었다. 다른 로직엔 가능한 손 안대고 request, reponse 부분만 바꿔치웠다. 그런데 테스트를 해보니, 한글 파라메터가 제대로 인코딩되지 않은 상태로 넘어가고 있었다. 그리하여 원인을 추적해봄.

## 1차 시도 - xml-config 에서 처리?

`StringHttpMessageConverter` 라는 것이 관여하고 있었고, 여기서 `UTF-8` 인코딩을 하지 못했다. `restTemplate` 빈 설정에 `StringHttpMessageConverter` 을 `UTF-8` 을 디폴트 캐릭터셋으로 설정하여 주입하는 법을 찾아내고 싶었다. 당연히 있을 것이라 생각했는데, 찾지 못했다. 억지로 설정을 우겨넣을 순 있었다. 요즘 시대에 안 맞는 xml config 이라서 잘 안 나오나 생각했는데 사후에 다시 보니 딱히 그런 이유 때문은 아니었다. 그냥 그런 방법이 없었다고 할 수 밖에 없다.

기존 설정
```xml
<bean id="restTemplate" class="org.springframework.web.client.RestTemplate">
    <constructor-arg ref="httpClientRequestFactory" />
</bean>
```

꾸역꾸역 넣어본 설정
```xml
<bean id="restTemplate" class="org.springframework.web.client.RestTemplate">
    <constructor-arg ref="httpClientRequestFactory" />
    <property name="messageConverters">
        <list>
            <ref bean="stringHttpMessageConverter" />
        </list>
    </property>
</bean>

<bean id="stringHttpMessageConverter" class="org.springframework.http.converter.StringHttpMessageConverter">
    <constructor-arg>
        <bean class="java.nio.charset.Charset" factory-method="forName">
            <constructor-arg value="UTF-8" />
        </bean>
    </constructor-arg>
</bean>
```

이렇게 하면 원하는대로 `StringHttpMessageConverter`를 가진 `RestTemplate`를 쓸 수 있긴 하지만, 내가 원하는 요구사항은 단지 그것이 아니었기에 문제.  이렇게 하면, `RestTemplate` 의 기본 converters 리스트가 여러개 있는데, 위와 같이 설정하면 그 컨버터 리스트가 싹 날아가고 위에 적은대로만 생기는데 이게 코드 다른 부분에 어떤 영향을 줄지 검증할 수가 없었다.

원하는 바를 더 정확히 하자면

1. `restTemplate` 를 선언하는데
1. 디폴트로 가지는 컨버터 리스트를 다 갖고 있으면서
1. 그 중에서 `StringHttpMessageConverter`는 `UTF-8`을 디폴트 캐릭터셋으로 가지고 있도록 만들고 싶은데
1. 가능한 한 침습적이지 않은 수정으로 했으면 좋겠다.

이어서, 좀더 찾아보기로 했다.

## 2차 시도 - 로딩되고 나서 처리?



기존 컨버터 리스트를 유지하면서  `StringHttpMessageConverter`를 `UTF-8`로 새로 객체를 만들어서 넣는 방법을 생각해보았다.

검색해서 나온 코드 중에 자바로 리스트를 얻어서 그냥 추가하는 코드가 있었는데, 그걸 지금 작업하는 코드에 대충 맞게 적용해보았다.

```java
   @Override
    public void afterPropertiesSet() throws Exception {
        restTemplate.getMessageConverters().add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
    }
```

그런데, 문제는 이렇게 하니 컨버터 리스트 마지막에 `StringHttpMessageConverter`가 들어가서 실행해보면 디폴트 컨버터 리스트에 있던 `StringHttpMessageConverter`가 먼저 반응을 해서 이렇게 추가한 컨버터는 쓸모가 없었다.

... 하지만 사후에 보니, 이때 내가 너무 성급하게 테스트를 했기 때문에 이 방법으로 해결이 안된다고 착각했던 것이었다.

```java
restTemplate.getMessageConverters().add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
```
를 하면 리스트 맨 마지막에 들어가는 것 때문에 문제였으니,
```java
restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
```
으로 하면 리스트 맨 앞에 넣어서 해결이 됐을 것이다. 다른 시도를 더 하고 검색을 더 해보다가 검색 내용 중에 이 부분 코드를 너무 대충 읽었다는걸 나중에 깨달음.

물론, 컨버터 리스트에 다른 캐릭터셋을 디폴토 캐릭터셋으로 가지는 `StringHttpMessageConverter`  객체가 2개 남아있는다는 문제는 생긴다. 컨버터 리스트를 루프를 돌면서, 하나는 지우고 하나만 남길 수도 있겠는데 그런 더러운 코드를 필요하도록 스프링을 만들진 않았을거라고, 내가 아직 모르는게 있을거라고 믿고 싶었다.

아무튼 2차 시도에서는, 이게 원하는대로 작동 안한다고 생각하고 이게 말이 되나 싶어서 스프링 소스를 뒤져보게 되었다. 실은, 이 단계에 오기 전에 스프링 소스를 보려고 했는데 사내 메이븐 저장소의 문제인지, 스프링 최신 버전의 소스가 자동으로 다운받아지지 않아서 인텔리제이에서 오리지널 소스를 열지 못하는 바람에 귀찮아서 자세히 보지 않고 있었다.


## 3차 시도 - 스프링 소스를 보고 왜 이런지 이해를 해보자.

### RestTemplate
source: https://github.com/spring-projects/spring-framework/blob/master/spring-web/src/main/java/org/springframework/web/client/RestTemplate.java#L140

`RestTemplate`의 소스에서 생성자를 보면, 다르게 설정할 여지 없이 `new StringHttpMessageConverter()` 를 쌩으로 넣어주고 있다.

```java
public RestTemplate() {
	this.messageConverters.add(new ByteArrayHttpMessageConverter());
	this.messageConverters.add(new StringHttpMessageConverter());
	this.messageConverters.add(new ResourceHttpMessageConverter(false));

//생략
}
```

### StringHttpMessageConverter
source: https://github.com/spring-projects/spring-framework/blob/master/spring-web/src/main/java/org/springframework/http/converter/StringHttpMessageConverter.java

`StringHttpMessageConverter`의 소스를 찾아가보면, 자비 없게도 `StandardCharsets.ISO_8859_1` 를 디폴트 캐릭터 셋으로 하고 있다. 생성자에 디폴트 캐릭터셋을 넣지 않으면 set 메소드도 없어서 이상했다(는 나중에 오해로 밝혀짐).

```java
/**
 * The default charset used by the converter.
 */
public static final Charset DEFAULT_CHARSET = StandardCharsets.ISO_8859_1;

/**
 * A default constructor that uses {@code "ISO-8859-1"} as the default charset.
 * @see #StringHttpMessageConverter(Charset)
 */
public StringHttpMessageConverter() {
	this(DEFAULT_CHARSET);
}

/**
 * A constructor accepting a default charset to use if the requested content
 * type does not specify one.
 */
public StringHttpMessageConverter(Charset defaultCharset) {
	super(defaultCharset, MediaType.TEXT_PLAIN, MediaType.ALL);
}
```

### FormHttpMessageConverter

왜 이러는지 이해가 안되서, 다른 메시지 컨버터에서는 인코딩을 어떻게 처리하는지 찾아보았다. FormHttpMessageConverter 룰 보기로 함.

다행히도 디폴트 캐릭터셋이 제정신이었다.

```java
	/**
	 * The default charset used by the converter.
	 */
	public static final Charset DEFAULT_CHARSET = StandardCharsets.UTF_8;
```
source: https://github.com/spring-projects/spring-framework/blob/master/spring-web/src/main/java/org/springframework/http/converter/FormHttpMessageConverter.java#L99


이 상수를 어떻게 쓰는지 찾아가 보니 문제의 원인을 깨달을 수 있었다.

```java
	public FormHttpMessageConverter() {
		this.supportedMediaTypes.add(MediaType.APPLICATION_FORM_URLENCODED);
		this.supportedMediaTypes.add(MediaType.MULTIPART_FORM_DATA);

		StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter();
		stringHttpMessageConverter.setWriteAcceptCharset(false);  // see SPR-7316

		this.partConverters.add(new ByteArrayHttpMessageConverter());
		this.partConverters.add(stringHttpMessageConverter);
		this.partConverters.add(new ResourceHttpMessageConverter());

		applyDefaultCharset();
	}
```

`FormHttpMessageConverter` 여기에서도 `StringHttpMessageConverter`를 아래와 같이 디폴트 캐릭터셋 `ISO-8859-1` 인채로 추가하고 있었다.

```java
StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter();
```

다만 생성자 마지막에 `applyDefaultCharset()` 이라는 메소드를 호출하고 있었다.


```java
	private void applyDefaultCharset() {
		for (HttpMessageConverter<?> candidate : this.partConverters) {
			if (candidate instanceof AbstractHttpMessageConverter) {
				AbstractHttpMessageConverter<?> converter = (AbstractHttpMessageConverter<?>) candidate;
				// Only override default charset if the converter operates with a charset to begin with...
				if (converter.getDefaultCharset() != null) {
					converter.setDefaultCharset(this.charset);
				}
			}
		}
	}
```
source : https://github.com/spring-projects/spring-framework/blob/master/spring-web/src/main/java/org/springframework/http/converter/FormHttpMessageConverter.java#L182

### AbstractHttpMessageConverter

source : https://github.com/spring-projects/spring-framework/blob/master/spring-web/src/main/java/org/springframework/http/converter/AbstractHttpMessageConverter.java#L115

`StringHttpMessageConverter`에 setter가 없어서 이건 대체 무슨 인터페이스가 이런가 싶었는데, 내가 소스를 깃헙 웹인터페이스로 코드로 읽고 있었기 때문에 상속받은 클래스에 있던 setter의 존재를 바로 찾아내지 못했던거였다. 근데, 다만 이 setter도 스프링 4.3 이후에 생긴 것으로 보이는데, 이전 버전을 썼으면 이것도 사용하기 어려웠을 듯 하다.

```java
	/**
	 * Set the default character set, if any.
	 * @since 4.3
	 */
	public void setDefaultCharset(@Nullable Charset defaultCharset) {
		this.defaultCharset = defaultCharset;
	}
```

## 마무리

여기까지 진행해오는 동안 오해하거나 이상했던 부분들의 미스테리가 다 풀렸다.

- `RestTemplate` 에 들어가는 디폴트 컨버터 중 하나인 `StringHttpMessageConverter` 의 디폴트 캐릭터셋을 `UTF-8`로 선언시점에 지정할 방법은 없었음. xml config 이라서 구닥다리 방식이라 검색이 안되는게 아니었음.
- setter가 없다고 생각했던 이유는, `StringHttpMessageConverter`에 있는게 아니라 `AbstractHttpMessageConverter` 에 있는거였기 때문에.
- 결국 런타임 코드로 어딘가에 넣어서 로딩 시점 어딘가에서 컨버터 리스트에 객체를 하나 새로 만들어 넣던가, 컨버터 리스트를 순회하면서 setter 로 디폴트 캐릭터셋을 바꿔주든가 둘중 하나를 해야함.
  - 디폴트 컨버트 리스트에 `add(0, new ... )` 으로 런타임에 넣기.
  - 인스턴스가 두개 들어가 있는 부분이 마음에 걸리면, `applyDefaultCharset()` 같은 코드를 만들어서 루프 돌면서 setter로 처리해야함.
- 그리고 애초에 프로젝트 다른 부분에서 안 쓰이던 `RestTemplate`의 파라메터 전송에서 인코딩 문제를 이번에 겪게 된 것은 다음과 같은 이유였다고 생각이 된다.
  1. 기존 레거시 코드를 유지하면서 보내다보니, `ResponseEntity<String> resp = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, String.class);` 와 같이 `String` 클래스를 보내야했다. 코드 다른 부분에서 json body를 한땀한땀 `String` 으로 조합해서 만들어내는 부분이 있었기 때문에...
  1. 기존에 `RestTemplate` 를 쓰던 비교적 레거시가 아니었던 코드들은 json을 `String` 으로 조합해서 보내는 것 같은 일을 하지 않았고, `FormHttpMessageConverter` 같은걸 썼기 때문에 인코딩 문제를 겪을 일이 없었다.


------
여기까지 오는데 참고한 그외 다른 링크들

- https://gist.github.com/ucpwang/949145408a12bb40a671#file-README-md
- https://stackoverflow.com/questions/29392422/how-can-i-tell-resttemplate-to-post-with-utf-8-encoding
- http://bcuts.tistory.com/32
- http://www.javarticles.com/2015/06/spring-static-factory-method-example.html
