var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');
var Game = require('./game/Game');

var APP = React.createClass({

  getInitialState() {
    return{
      status: 'disconnected',
      currentUser: 'none',
      currentTeam: 'none',
      turn: 'none',
      walls: [],
      moves: [],
      move: {}
    }
  },

  componentWillMount() {
    this.socket = io('localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('update', this.update);
  },

  emit(eventName, payload){
    this.socket.emit(eventName, payload);
  },

  connect() {
    this.setState({ status: 'connected' });
  },

  disconnect() {
    this.setState({ status: 'disconnected' });
  },

  update(newState) {
    this.setState({...newState});
  },

  render() {
    return (
      <div>
        <Header {...this.state} />
        <div className="game-container">
          <Game emit={this.emit} {...this.state} />
        </div>
      </div>
    );
  }
});

module.exports = APP;
