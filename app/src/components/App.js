import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultsList from './ResultsList';
import { searchFriends } from '../store/friend.module';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { history: { location }, searchFriends } = this.props;
    const query = location.search.replace('?q=', '');
    searchFriends(query);
    if (location.search.length) {
      this.setState({
        query,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { location, searchFriends } = this.props;
    const { location: prevLocation } = prevProps;
    if (location !== prevLocation) {
      const query = location.search.replace('?q=', '');
      this.setState({
        query,
      }, async () => {
        await searchFriends(query);
      })
    }
  }

  handleSearch(e) {
    const { value } = e.target;
    const { history } = this.props;
    const search = value.length > 0 ? `q=${value}` : '';
    this.setState({ query: value }, () => {
      history.push({
        pathname: '/',
        search,
      })
    });
  }
  render() {
    const { query } = this.state;
    const { friends } = this.props;
    return (
      <div className="App">
        <input
          type="text" value={query}
          onChange={this.handleSearch}
          className="search-field"
          placeholder="Search Friends..."
        />
        <ResultsList matches={friends.matches} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends,
});

const mapDispatchToProps = dispatch => ({
  searchFriends: values => dispatch(searchFriends(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
