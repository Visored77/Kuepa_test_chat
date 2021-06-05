import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/users`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
        this.setState({ persons });
      })
  }

  render() {
    return (
    <div>
    <h1>hola que hacen </h1>
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
    </div>
    )
  }
}