(() => {
  // MIU import
  const { M, I, U, rule1, rule2, rule3, rule4 } = MIU;
  const rules = [rule1, rule2, rule3, rule4];
  
  const START = [M,I];
  const END = [M,U];
  
  const state = {
    string: [...START],
    steps: [],
    setState(key, value) {
      state[key] = value;
      render();
    },
  };
  const RulesBlock = () => {
    const ol = document.createElement('ol');
    const rulesText = [
      'Rule 1: If your string ends with I, you can add a U',
      'Rule 2: Double the remaining letters after M (e.g. MIU -> MIUIU',
      'Rule 3: Replace III with U (in progress)',
      'Rule 4: Remove UU (in progress)',
    ];
    for (let i = 0; i < rulesText.length; i++) {
      const li = document.createElement('li');
      li.innerHTML = rulesText[i];
      ol.appendChild(li);
    }
    ol.className = 'rulesBlock';
    return ol;
  }
  const RuleButton = (rule) => {
    const button = document.createElement('button');
    button.onclick = () => {
      state.setState('string', rules[rule](state.string));
      state.setState('steps', [
        ...state.steps, {
          rule,
          string: state.string,
        }
      ])
    };
    const text = document.createTextNode(`Rule ${rule + 1}`);
    button.appendChild(text);
    button.className = 'button';
    return button;
  }
  const CurrentString = (state) => {
    const div = document.createElement('div');
    const text = document.createElement('span');
    text.innerHTML = state.string.join('');
    div.appendChild(text);
    div.className = 'currentString';
    return div;
  }
  const CurrentSteps = (state) => {
    const div = document.createElement('div');
    for (let i = 0; i < state.steps.length; i++) {
      const stepEl = document.createElement('div');
      const step = state.steps[i];
      stepEl.innerHTML = `
        Step ${i + 1}: Rule ${step.rule + 1} => ${step.string.join('')}
      `;
      div.appendChild(stepEl);
      div.className = 'step';
    }
    div.className = 'steps';
    return div;
  }
  const App = () => {
    const app = document.createElement('div');
    app.appendChild(RulesBlock());
    app.appendChild(CurrentString(state));
    for (let i = 0; i < rules.length; i++) {
      app.appendChild(RuleButton(i));
    }
    app.appendChild(CurrentSteps(state));
    app.className = 'app';
    return app;
  };
  function render() {
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(App());
  }
  render();
})();

