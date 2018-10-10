# Study Saturday 3: Guide

## Initial Setup

### in `index.js`

For the initial setup, we placed `h1` tags inside the `ReactDOM.render()` to ensure React was working. Usually always provided for us; will probably continue to be the case as they're likely to provide boilerplate for us to build off of. Still good to know.

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";

ReactDOM.render(<Main />, document.getElementById("app"));
```

### Main Setup

After importing React, we built and exported class called `Main` inside which contains:

- a constructor function
- state
- and a render method

We need to hardcode the `h1` for Students and provide a `table` base to bring the info from the db.

Here's the base table code used to render initial structure:

```jsx
  render() {
    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Names</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The table body</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
```

### db calls in `componentDidMount`

In our `axios.get`, the db calls for `student` data need to `GET` from `'/student'`. We can destructure the response object from the db call directly in order to pull and use `data` much more easily.

```js
  async componentDidMount() {
    const { data } = await axios.get("/student");
    this.setState({
      student: data
    });
  }
```

`console.log(this.state)` after setting the state with the new `data` confirms that we got what we were looking for:

```js
{student: Array(5)}
student: (5) [{…}, {…}, {…}, {…}, {…}]
__proto__: Object
```

### Rendering the names

To make things simple, we can deconstruct `this.state` into `{ students }` _before the return in `render()`_ to the mapping logic a little easier to follow.

Then we replace `<td>The table body</td>` with our mapping logic.

```jsx
<tbody>
  {students.map(studentObj => (
    <tr key={studentObj.id}>
      <td>{studentObj.fullName}</td>
    </tr>
  ))}
</tbody>
```

### Creating `StudentList` component

Time to create a stateless component that takes in props.

1. import `React` and make `StudentList` function that takes in `props`.
2. `export default StudentList` at the end of the file!
3. Deconstructed the passed down props to pull `students` off it.
4. `return` the code snippet of the map function with `tbody` above from `StudentList`

New component setup complete.

```jsx
import React, { Component } from "react";

const StudentList = props => {
  const { students } = props;

  return (
    <tbody>
      {students.map(studentObj => (
        <tr key={studentObj.id}>
          <td>{studentObj.fullName}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default StudentList;
```

Now we just have to plug this component into `Main.js`. `import` the newly created `StudentList` and update the `render()` function in `Main` to look like this:

```jsx
  render() {
    const { students } = this.state;

    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Names</th>
            </tr>
          </thead>
          <StudentList students={students} />
        </table>
      </div>
    );
  }
```

### Adding the tests column to the table

Add another `<th>` under the one that's already there for `names` and set it to **Tests**.

```jsx
return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Names</th>
              <th>Tests</th>  <-- Right here
            </tr>
          </thead>
          <StudentList students={students} />
        </table>
      </div>
    );
```

After that, head to `StudentList` and add a `<td>` that contains `Details` on the line after the `<td>` where we mapped the student's `fullName`.

```jsx
return (
    <tbody>
      {students.map(studentObj => (
        <tr key={studentObj.id}>
          <td>{studentObj.fullName}</td>
          <td>Details</td>     <-- Right here
        </tr>
      ))}
    </tbody>
  );
```

### Creating the `SingleStudent` component
