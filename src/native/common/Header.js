import React, {
  PropTypes,
} from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';

import { Heading1 } from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'cover',
    height: 40,
    paddingLeft: 30,
  },
});

function Header({ title, background }) {
  return (
    <Image style={styles.container} source={background}>
      <Heading1>{title}</Heading1>
    </Image>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  background: PropTypes.number.isRequired,
};


export default Header;
