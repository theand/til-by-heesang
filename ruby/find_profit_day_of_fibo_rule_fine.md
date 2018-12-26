
# 2018-12에 적용된 피보나치 벌금 제도 하에서 개이득 구간 보기

TIL 모임에서 12월에는 결석일수에 따른 벌금을 피보나치 수에 따라 증가시키기로 했는데, 기존의 하루 1000원으로 고정된 벌금제도와 비교해서 결석일수에 따른 총 벌금액이 어느 구간이 `개이득` 인지 궁금해져서 찾아봄.


```
fib(n) = fib(n-1) + fib(n-2)
f(0)=0, f(1)=100 으로 정의
결석일이 n일 일경우 12월 총 벌금액 :  \sum{i=1}^{n} fib(i)
```

피보나치 함수 구현은 [로제타 코드](https://rosettacode.org/wiki/Fibonacci_sequence#Recursive_with_Memoization_4)에 있는 버전을 가져다 씀.

코드
```ruby


#https://rosettacode.org/wiki/Fibonacci_sequence#Recursive_with_Memoization_4 가져다 고쳐씀.

fib_fine = Hash.new do |f, n|
  f[n] = if n == 0
           0
         elsif n == 1
           n * 100
         else
           f[n - 1] + f[n - 2]
         end
end

accumulated_fib_fine = Hash.new do |f,n|
  f[n] = (1..n).sum{|x| fib_fine[x] }
end

def filter_max_for_fibo(x)
  if x > 50000
    50000
  else
    x
  end
end

accumulated_fixed_fine = Hash.new do |f,n|
  f[n] = n*1000
end


puts "결석일\tacc_fixed\tacc_fibo\tacc_fibo_filtered\t구간"
(1..31).each do |n|
	fib_original_sum = accumulated_fib_fine[n]
	fib_filtered_sum = filter_max_for_fibo accumulated_fib_fine[n]
	fixed_sum = accumulated_fixed_fine[n]
	msg = if fib_original_sum < fixed_sum then "개이득" else "노이득" end
	printf "#{n}\t%12s\t%12s\t%12s\t#{msg}\n" , fixed_sum, fib_original_sum, fib_filtered_sum
end
```


결과
```tsv
결석일	acc_fixed	acc_fibo	acc_fibo_filtered	구간
1	        1000	         100	         100	개이득
2	        2000	         200	         200	개이득
3	        3000	         400	         400	개이득
4	        4000	         700	         700	개이득
5	        5000	        1200	        1200	개이득
6	        6000	        2000	        2000	개이득
7	        7000	        3300	        3300	개이득
8	        8000	        5400	        5400	개이득
9	        9000	        8800	        8800	개이득
10	       10000	       14300	       14300	노이득
11	       11000	       23200	       23200	노이득
12	       12000	       37600	       37600	노이득
13	       13000	       60900	       50000	노이득
14	       14000	       98600	       50000	노이득
15	       15000	      159600	       50000	노이득
16	       16000	      258300	       50000	노이득
17	       17000	      418000	       50000	노이득
18	       18000	      676400	       50000	노이득
19	       19000	     1094500	       50000	노이득
20	       20000	     1771000	       50000	노이득
21	       21000	     2865600	       50000	노이득
22	       22000	     4636700	       50000	노이득
23	       23000	     7502400	       50000	노이득
24	       24000	    12139200	       50000	노이득
25	       25000	    19641700	       50000	노이득
26	       26000	    31781000	       50000	노이득
27	       27000	    51422800	       50000	노이득
28	       28000	    83203900	       50000	노이득
29	       29000	   134626800	       50000	노이득
30	       30000	   217830800	       50000	노이득
31	       31000	   352457700	       50000	노이득
```
