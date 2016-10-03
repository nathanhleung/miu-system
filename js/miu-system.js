window.MIU = (() => {
  const M = 'M';
  const I = 'I';
  const U = 'U';
  
  function eq(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  
  function uniq(arr) {
    const uniqArr = [];
    for (let i = 0; i < arr.length; i++) {
      let uniqEl = true;
      for (let j = 0; j < uniqArr.length; j++) {
        if (eq(arr[i], uniqArr[j])) {
          uniqEl = false;
        }
      }
      if (uniqEl) {
        uniqArr.push(arr[i]);
      }
    }
    return uniqArr;
  }
  
  function rule1(state) {
    const last = state[state.length - 1];
    if (last === I) {
    	return [
      	...state,
        U,
      ];
    } else {
    	throw new TypeError('Array must end with I');
    }
  }
  
  function rule2(state) {
    if (state.length > 50) {
      throw new RangeError('State cannot be bigger than 50 characters')
    }
  	if (state[0] === M) {
    	const rest = [];
    	for (let i = 1; i < state.length; i++) {
      	rest.push(state[i]);
      }
      return [
      	M,
        ...rest,
        ...rest,
      ];
    } else {
    	throw new TypeError('Array must start with M');
    }
  }
  
  function rule3(state) {
  	const positions = [];
  	for (let i = 2; i < state.length; i++) {
    	const condition =
    	  (state[i] === I) &&
    	  (state[i - 1] === I) &&
    	  (state[i - 2] === I);
    	if (condition) {
        positions.push(i - 2);
    	}
    }
    if (positions.length === 0) {
      throw new TypeError('Array must contain III');
    }
    const results = [];
    for (let i = 0; i < positions.length; i++) {
    	const result = [];
      for (let j = 0; j < state.length; j++) {
      	if (j === positions[i]) {
        	result.push(U);
          j += 2;
        } else {
        	result.push(state[j]);
        }
      }
      results.push(result);
    }
    return results;
  }
  
  function rule4(state) {
    const positions = [];
  	for (let i = 1; i < state.length; i++) {
    	const condition =
    	  (state[i] === U) &&
    	  (state[i - 1] === U);
    	if (condition) {
        positions.push(i - 1);
    	}
    }
    if (positions.length === 0) {
      throw new TypeError('Array must contain UU');
    }
    const results = [];
    for (let i = 0; i < positions.length; i++) {
    	const result = [];
      for (let j = 0; j < state.length; j++) {
      	if (j === positions[i]) {
          j += 1;
        } else {
        	result.push(state[j]);
        }
      }
      results.push(result);
    }
    return uniq(results);
  }
  
  return {
    M,
    I,
    U,
    rule1,
    rule2,
    rule3,
    rule4
  };
})();