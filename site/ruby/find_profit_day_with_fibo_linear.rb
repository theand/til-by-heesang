
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

linear_fine = Hash.new do |f,n|
  f[n] = n*1000
end

accumulated_linear_fine = Hash.new do |f,n|
  f[n] = (1..n).sum{|x| linear_fine[x] }
end

puts "결석일\tacc_fixed\tacc_fibo\tacc_fibo_filtered\t구간\tacc_linear"
(1..31).each do |n|
	fib_original_sum = accumulated_fib_fine[n]
	fib_filtered_sum = filter_max_for_fibo accumulated_fib_fine[n]
	fixed_sum = accumulated_fixed_fine[n]
	lin_sum = accumulated_linear_fine[n]
	msg = if fib_original_sum < fixed_sum then "개이득" else "노이득" end
	printf "#{n}\t%12s\t%12s\t%12s\t#{msg}\t%12s\n" , fixed_sum, fib_original_sum, fib_filtered_sum, lin_sum
end
