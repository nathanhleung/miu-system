(() => {
  const { M, I, U, rule1, rule2, rule3, rule4 } = MIU;
  const START = [M,I];
  const END = [M,U];
  
  function rule0(state) {
    return state;
  }
  const rules = [rule0, rule1, rule2, rule3, rule4];
  
  function success(state, target) {
    if (state.length !== target.length) {
      return false;
    }
    for (let i = 0; i < state.length; i++) {
      if (state[i] !== target[i]) {
        return false;
      }
    }
    return true;
  }
  
  /*
  function getState(initial, steps) {
    let result = initial;
    for (let i = 0; i < steps.length; i++) {
      result = rules[steps[i].rule](result);
    }
    return result;
  }
  */
  
  function applyRule(steps, rule) {
    const lastStep = steps[steps.length - 1];
    console.log(lastStep);
    if (steps.length > 1000) {
      return 'done';
    }
    if (rule === 0) {
      throw new RangeError('Rule 0 will give you an infinite loop!');
    }
    const lastState = steps[steps.length - 1].state;
    let nextState;
    try {
      nextState = rules[rule](lastState);
      return applyRule([
        ...steps, {
          rule,
          state: nextState
        }
      ], rule);
    } catch (e) {
      nextState = rules[rule + 1](lastState);
      return applyRule([
        ...steps, {
          rule: rule + 1,
          state: nextState,
        }
      ], rule);
    }
  }
  
  function solve(state, steps = []) {
    if (steps.length === 0) {
      steps.push({
        rule: 0,
        state,
      });
    }
    const result1 = applyRule(steps, 1);
    const lastState = result1[result1.length - 1].state;
    if (success(lastState, END)) {
      return result1;
    }
  }
})();

