import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppText } from '@/components/ui';
import { useTheme } from '@/theme';

// "AZ logo / Color=AZ Primary Purple" from Figma, kept as the original brand artwork.
const logo = `<svg viewBox="0 0 56 56" fill="none"><path d="M38.5121 33.5505C38.5121 33.5505 37.627 42.4367 37.4413 43.9875H40.4047C40.4047 43.9875 40.7544 41.5792 41.5644 34.7457C41.7106 33.505 41.916 31.0237 41.916 31.0237L38.5121 33.5505Z" fill="url(#a)"/><path d="M30.4537 10.6988C34.2547 9.75842 36.9909 11.5206 38.2355 19.1444C38.599 21.367 38.7452 23.8878 38.7591 26.4581C39.9089 25.5532 41.0073 24.6721 42.0504 23.8207C41.9378 20.7684 41.598 17.8247 40.9855 15.1063C39.6599 9.22304 35.9063 6.71997 32.0835 6.71997C31.5857 6.71997 31.0385 6.77134 30.4537 6.87012V10.6988Z" fill="url(#b)"/><path d="M32.0835 6.71997C27.6602 6.71997 19.5919 10.5269 11.4288 19.4111C2.21661 29.4372 0 37.3179 0 41.4429C0 45.5679 2.74804 48.8395 7.73838 48.8395C12.7287 48.8395 20.7259 45.6884 32.615 37.6893C44.5041 29.6901 56 19.6798 56 19.6798L53.5187 13.9743C50.9623 16.0191 39.735 26.8374 24.7383 36.498C10.3422 45.7714 5.76674 44.2383 5.1385 43.049C4.60707 42.0435 3.53433 38.4854 9.36824 29.0816C15.2021 19.6778 24.2879 13.0122 28.8989 11.2026C30.0428 10.7541 31.1076 10.4854 32.0816 10.4677V6.71997H32.0835Z" fill="#7240DC"/><defs><linearGradient id="a" x1="37.3735" y1="34.0892" x2="42.9109" y2="42.2987" gradientUnits="userSpaceOnUse"><stop offset="0.0747" stop-color="#7240DC" stop-opacity="0.5"/><stop offset="0.7" stop-color="#7240DC"/></linearGradient><linearGradient id="b" x1="42.7817" y1="23.232" x2="29.8969" y2="7.32059" gradientUnits="userSpaceOnUse"><stop offset="0.0747" stop-color="#7240DC" stop-opacity="0.5"/><stop offset="0.6" stop-color="#7240DC"/></linearGradient></defs></svg>`;

type IntroHeroProps = {
  name: string;
};

export function IntroHero({ name }: IntroHeroProps) {
  const { spacing } = useTheme();

  return (
    <View style={{ alignItems: 'center', gap: spacing.sm }}>
      <SvgXml xml={logo} width={56} height={56} />
      <AppText
        variant="heading"
        style={{ textAlign: 'center', paddingHorizontal: spacing.gutter, paddingVertical: spacing.sm, maxWidth: 276 }}
      >
        {`Hello ${name}, welcome to Azercell AI assistant`}
      </AppText>
    </View>
  );
}
