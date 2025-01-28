---
title: "Mastering Children in React"
datePublished: Fri Jan 24 2025 12:30:26 GMT+0000 (Coordinated Universal Time)
cuid: cm6aqpizt000509juf7i6880q
slug: mastering-children-in-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737560950134/b1ac52ea-c5ca-4cf7-83b8-5655e5867c71.jpeg
tags: interview, design-patterns, javascript, reactjs, javascript-framework, reacthooks

---

---

One common React.js interview question focuses on managing children passed to a React component and ensuring they are not unnecessarily re-rendered when the parent component’s state updates. 

This blog will break down this concept, using a practical example to understand how React handles children and how to optimize component performance.

---

### Key Concepts

### 1\. Children in React

The `children` prop is a special property in React, automatically passed to every component. It allows you to pass JSX or other React components as children within a parent component.

### 2\. Re-Rendering Behavior

When a parent component’s state or props update, React triggers a re-render for the parent and all of its children by default. However, in many cases, this behavior can lead to unnecessary renders, particularly when the child component’s output does not depend on the updated state.

---

### Example Implementation

### Code:

```javascript
import React, { useState, useEffect } from 'react';

// Child Component
const Child = () => {
  console.log("Child component re-rendered");

  useEffect(() => {
    console.log("Child component mounted");
  }, []);

  return <div>Child component</div>;
};

// Parent Component
const Parent = ({ children }) => {
  const [counter, setCounter] = useState(1);

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <div>
      {children}
      <p>Counter: {counter}</p>
      <button onClick={incrementCounter}>Increment Counter</button>
    </div>
  );
};

// App Component
export const App = () => (
  <div className="App">
    <h1>Hello React</h1>
    <Parent>
      <Child />
    </Parent>
  </div>
);
```

### How It Works:

1. **The** `Child` **Component**:
    

* Contains a `useEffect` hook that logs a message only when the component is mounted.
    
* Logs to the console whenever the component re-renders.
    

**2\. The** `Parent` **Component**:

* Maintains a `counter` state that updates when the button is clicked.
    
* Accepts the `children` prop and renders it alongside the counter value.
    

**3\. The** `App` **Component**:

* Passes the `Child` component as a child to the `Parent` component.
    

---

### Observations

**Logs to Console**:

* When you click the “Increment Counter” button, the `Parent` component re-renders due to the state update.
    
* However, the `Child` component does not re-render unless explicitly triggered.
    

**Why Doesn’t the Child Re-Render?**:

* React treats `children` as a prop, and unless the reference to `children` changes, React assumes it is unchanged.
    
* In this example, `<Child />` is defined outside of the `Parent` component, so its reference remains stable.
    

---

### Key Takeaways:

Children passed to a React component are treated as stable references unless explicitly changed.

Happy Learning :)