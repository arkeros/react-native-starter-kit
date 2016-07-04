import React, {
  PropTypes,
} from 'react';
import {
  Image,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'cover',
    height: 40,
    paddingLeft: 30,
  },
  title: {
    color: 'white',
    fontFamily: 'Avenir Light',
    fontSize: 38,
    fontWeight: '200',
    backgroundColor: 'transparent',
  },
});

function Header({ title, background }) {
  return (
    <Image style={styles.container} source={background}>
      <Text style={styles.title}>{title}</Text>
    </Image>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  background: PropTypes.number.isRequired,
};


export default Header;
