import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJokes } from '../actions';

class Jokes extends Component {
  componentDidMount() {
    this.props.getJokes();
  }

  render() {
    return (
      <ul>
        {this.props.jokes.map((joke, i) => {
          return <div key={i}>
              <li>
                <h4>{joke.setup}</h4>
                <h5>{joke.punchline}</h5>
              </li>
            </div>;
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  console.log("State at time of joke mount is", state);
  return {
    jokes: state.jokes
  };
};

export default connect(mapStateToProps, { getJokes })(Jokes);