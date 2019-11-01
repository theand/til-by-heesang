[TOC]

# Mysql int 타입 컬럼과 Java Integer, Long 클래스

mybatis를 사용하는데, 보통때는 Integer로 매핑된 컬럼이 나오다가 특이한 경우에 Long으로 매핑된 컬럼이 나오는 증상을 경험.

디버깅을 해보니 원인은 다음과 같았다.

내부로직에서 A database의 a 테이블에서 값을 가져온 다음 값을 검사해서 빠진 값은 B database의 b 테이블에서 가져온 값으로 메꾼다.

그런데, A database의 a 테이블의 cnt 컬럼은 int 타입이고, B database의 b 테이블의 cnt 컬럼은 int unsigned 였다.

찾아보니 다음과 같다.

MySQL

>MySQL integer int(11) has size is 4 bytes which equals 32 bit.
>Signed value is : -2^(32-1) to 0 to 2^(32-1)-1 = -2147483648 to 0 to 2147483647. One bit is for sign.
>Unsigned values is : 0 to 2^32-1 = 0 to 4294967295

Java

>int: By default, the int data type is a 32-bit signed two's complement integer, which has a minimum value of -2^31 and a maximum value of 2^31-1. In Java SE 8 and later, you can use the int data type to represent an unsigned 32-bit integer, which has a minimum value of 0 and a maximum value of 2^(32-1). Use the Integer class to use int data type as an unsigned integer.

>long: The long data type is a 64-bit two's complement integer. The signed long has a minimum value of -2^63 and a maximum value of 2^63-1. In Java SE 8 and later, you can use the long data type to represent an unsigned 64-bit long, which has a minimum value of 0 and a maximum value of 2^(64-1). Use this data type when you need a range of values wider than those provided by int.


그래서 하나는 Integer 로 매핑되고, 하나는 Long 으로 매핑된 것이었따.

참고
- https://nexladder.com/blog/what-does-int11-means-in-mysql/
- https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
