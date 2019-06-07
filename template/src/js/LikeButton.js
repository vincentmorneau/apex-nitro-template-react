import React from 'React';
import '../css/button.css';

export class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this!!!!";
    }

    return <button onClick={() => this.setState({ liked: true })}>Like</button>;
  }
}
