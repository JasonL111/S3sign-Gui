export  function encrypt(appKey){
    let first=appKey.slice(0,9)
    let second=appKey.slice(9)
    return second+first
  }
export  function decrypt(str) {
    let second = str.slice(0, 21); 
    let first = str.slice(21);
    return first + second;
  }