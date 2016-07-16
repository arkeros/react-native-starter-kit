import React from 'react';
import {
  StyleSheet,
  Text as NativeText,
} from 'react-native';

import Colors from './Colors';
import { fontFamily } from '../env';


const styles = StyleSheet.create({
  font: {
    fontFamily,
    color: Colors.darkText,
  },
  h1: {
    color: 'white', // TODO put in parent
    fontSize: 38,
    fontWeight: '200',
    backgroundColor: 'transparent',
  },
  p: {
    // TODO
    // fontSize: normalize(15),
    // lineHeight: normalize(23),
    color: Colors.lightText,
  },
});

export function Text({ style, ...props }) {
  return <NativeText style={[styles.font, style]} {...props} />;
}

export function Heading1({ style, ...props }) {
  return <NativeText style={[styles.font, styles.h1, style]} {...props} />;
}

export function Paragraph({ style, ...props }) {
  return <NativeText style={[styles.font, styles.p, style]} {...props} />;
}

Paragraph.propTypes = Heading1.propTypes = Text.propTypes = NativeText.propTypes;
