

# problem

https://leetcode.com/problems/palindrome-number/

# solution

```javascript
var isPalindrome = function(x) {
    const left = (x).toString();
    const right = [...left].reverse().join('');
    return left === right;
};
```
