const randomNames = [
  'dog', 'cat', 'pig', 'eagle', 'falcon', 'food', 'apple', 'rye', 'badger',
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 
  48, 49, 50, 'joe', 'ned', 'bill', 'ted', 'fred', 'will', 'ivan', 'doof', 
  'bruh', 'dawg', 'bro', 'homey', 'homer', 'bart', 'lisa',
  'marge', 'maggie', 'moe', 'barney', 'gaga', 'shmo', 'brad', 'rad', 'eh', 'cool', 'guy',
  'hairy', 'lame', 'sick', 'blah', 'daffy', 'duck', 'big', 'bird', 'mickey', 'mouse',
  'kermit', 'frog', 'piglet', 'jack', 'sparow', 'larry', 'david'
]

const generateUserName = (arr) => {
  let userName = '';
  for (let i = 0; i < 4; i++) {
    let randomIdx = Math.floor(Math.random() * arr.length);
    userName += arr[randomIdx];
  }
  return userName.substring(0,15);
}

module.exports = {
  randomNames,
  generateUserName
}