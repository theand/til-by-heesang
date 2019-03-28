[TOC]


# problem

https://leetcode.com/problems/roman-to-integer/

# solution

```javascript

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {

    const romanMap = {
        'I' :            1,
        'V' :            5,
        'IV':            4,
        'X' :            10,
        'IX':            9,
        'L' :            50,
        'XL':            40,
        'C' :            100,
        'XC':            90,
        'D' :            500,
        'CD':            400,
        'M' :            1000,
        'CM':            900,
    };

    return Object.entries(romanMap).reverse().reduce( (acc, cur) => {
        while( s.includes(cur[0]) ){

            acc += cur[1];
            s = s.replace(cur[0], '');
        }
        return acc;
    }, 0);

};


```
