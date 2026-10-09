import { Image, StyleSheet } from 'react-native';

// Soft color blobs exported from the Figma frames (same on intro, menu and chat).
export function Backdrop() {
  return (
    <Image
      source={require('../../../assets/images/background.jpg')}
      resizeMode="cover"
      style={[StyleSheet.absoluteFill, styles.size]}
      accessibilityIgnoresInvertColors
    />
  );
}

const styles = StyleSheet.create({
  size: {
    width: '100%',
    height: '100%',
  },
});
