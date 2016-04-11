'use strict';

/**
 * Generate a random base16 value of a specified length for unique key generation.
 * @module util/RandomBase16
 * @param {number} len - length of token to generate
 * @return {string} - Returns a new random, unique toekn.
*/

module.exports = function RandomBase16(len) {
  var base16 = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
  var token = '';
  for (var i = 0; i <= len; i++) {
    token += base16[Math.floor(Math.random() * 16)];
  }
  return token;
};
