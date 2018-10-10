import React, { Component } from "react";
import axios from "axios";
import StudentList from "./StudentList";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      tests: []
    };
  }

  async componentDidMount() {
    const studentID = this.props.match.params.id;

    const student = await axios.get("/student");
    this.setState({
      students: student.data,
      tests: test.data
    });
    console.log(test.data);
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
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList students={students} />
        </table>
      </div>
    );
  }
}
