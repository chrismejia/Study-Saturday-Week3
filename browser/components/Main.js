import React, { Component } from "react";
import axios from "axios";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
  }

  // fetch data from db via axios after component mounts

  async componentDidMount() {
    const { data } = await axios.get("/student");
    this.setState({
      students: data
    });
  }

  // return "Hello again from Main"; //<- WORKS
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
          <tbody>
            {students.map(studentObj => (
              <tr key={studentObj.id}>
                <td>{studentObj.fullName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
