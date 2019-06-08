import React from 'react';

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this!!!!";
    }

    return <button className="my-button" onClick={() => this.setState({ liked: true })}>Like</button>;
  }
}
