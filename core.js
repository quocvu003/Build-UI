export default function html([first, ...strings], ...values) {
  return values
    .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
    .filter((x) => (x && x !== true) || x === 0)
    .join('')
}
export function createStore(reducer) {
  let state = reducer()
  // Map giúp lấy Object làm key được
  const roots = new Map()

  function render() {
    for (const [root, component] of roots) {
      const output = component()
      root.innerHTML = output
    }
  }
  return {
    // Set dữ liệu và render ra UI
    attach(component, root) {
      roots.set(root, component)
      render()
    },
    connect(selector = (state) => state) {
      //  props là những công việc, dữ liệu truyền vào component
      return (component) =>
        (props, ...args) =>
          component(Object.assign({}, props, selector(state), ...args))
    },
    dispatch(action, ...args) {
      state = reducer(state, action, args)
      render()
    },
  }
}
