/**
 * Sample React Native App (RSS Reader)
 *
 * Description:
 *    Feedlyの未読RSSを取得し、表示する
 *
 * Author:
 *    @sota1235
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  NavigatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

var REQUEST_URL = 'http://b.hatena.ne.jp/sota1235/rss';

var RssReaderNavigator = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{
          component: RSSList,
          title: 'sota1235\'s Hatena Bookmark List',
        }}/>
      );
  }
})

var RSSList = React.createClass({
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.text())
      .then((responseData) => {
        this.setState({
          rss: responseData,
          loaded: true,
        });
      })
      .catch((error) => console.log(error))
      .done();
  },

  getInitialState: function() {
    return {
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return this.renderRSS(this.state.rss);
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading bookmarks...
        </Text>
      </View>
    );
},

  renderRSS: function(rss) {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>RSS:{rss.substr(0, 20)}</Text>
        </View>
      );
  },
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ReactNative', () => RssReaderNavigator);
