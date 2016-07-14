import Relay from 'react-relay';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from './Header';

const styles = StyleSheet.create({
  actionList: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? undefined : 20,
  },
  footer: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    color: '#0074c2',
    textDecorationLine: 'underline',
  },
  desc: {
    color: '#222',
  },
  header: {
    alignSelf: 'center',
    color: '#222',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontSize: 32,
    fontWeight: '100',
  },
  list: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      height: -2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
});

const newsDataSource = new ListView.DataSource({
  // eslint-disable-next-line no-underscore-dangle
  rowHasChanged: (r1, r2) => r1.__dataID__ !== r2.__dataID__,
});

class Home extends Component {

  static propTypes = {
    relay: PropTypes.object,
    me: PropTypes.shape({
      news: PropTypes.array,
      email: PropTypes.string.isRequired,
    }),
  };

  constructor(props, context) {
    super(props, context);
    const { news } = props.me;
    this.state = {
      initialListSize: news.length,
      listScrollEnabled: true,
      newsDataSource: newsDataSource.cloneWithRows(news),
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.me.news !== nextProps.me.news) {
      this.setState({
        newsDataSource:
          newsDataSource.cloneWithRows(nextProps.me.news),
      });
    }
  }

  handleStatusChange(status) {
    this.props.relay.setVariables({ status });
  }

  renderNewsItem(newsItem) {
    return (
      <View style={styles.news}>
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.desc}>{newsItem.contentSnippet}</Text>
      </View>
    );
  }

  render() {
    // alert(JSON.stringify(this.props.me));
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.header}>React.js News</Text>
        <Text style={styles.header}>Hello {this.props.me.email}!</Text>
        <ListView
          dataSource={this.state.newsDataSource}
          initialListSize={this.state.initialListSize}
          renderRow={this.renderNewsItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

export default Relay.createContainer(Home, {
  initialVariables: {
    status: 'any',
  },
  fragments: {
    me: () => Relay.QL`
        fragment on User {
          email
          news {
            title
            link
            contentSnippet
          }
        }
      `,
  },
});
