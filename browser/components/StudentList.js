import React, { Component } from "react";

const StudentList = props => {
  const { students } = props;

  return (
    <tbody>
      {students.map(studentObj => (
        <tr key={studentObj.id}>
          <td>{studentObj.fullName}</td>
          <td>Details</td>
        </tr>
      ))}
    </tbody>
  );
};

export default StudentList;
