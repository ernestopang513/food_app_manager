import React, { ReactElement } from 'react';
import { Text, TextProps } from 'react-native';

const categoryStyles = {
  h1: { fontSize: 30, fontWeight: 'bold' },
  h2: { fontSize: 26, fontWeight: 'bold' },
  h3: { fontSize: 22, fontWeight: 'bold' },
  h4: { fontSize: 20, fontWeight: 'bold' },
  h5: { fontSize: 18, fontWeight: 'bold' },
  h6: { fontSize: 16, fontWeight: 'bold' },
  p1: { fontSize: 16 },
  p2: { fontSize: 14 },
  s1: { fontSize: 14 },
  s2: { fontSize: 12 },
  c1: { fontSize: 12 },
  c2: { fontSize: 10 },
  label: { fontSize: 13, fontWeight: '500' },
};

type Category = keyof typeof categoryStyles;
type Status = 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control';
type Appearance = 'default' | 'alternative' | 'hint';

const statusColors: Record<Status, string> = {
  basic: '#000',
  primary: '#3366FF',
  success: '#00E096',
  info: '#0095FF',
  warning: '#FFAA00',
  danger: '#FF3D71',
  control: '#FFFFFF',
};

const appearances: Record<Appearance, { color: string } | {}> = {
  default: {},
  alternative: { color: '#FFFFFF' },
  hint: { color: '#8F9BB3' },
};

interface Props extends TextProps {
  children: string | number | ReactElement<TextProps>;
  category?: Category;
  status?: Status;
  appearance?: Appearance;
}

const CustomText: React.FC<Props> = ({
  children,
  category = 'p1',
  status = 'basic',
  appearance = 'default',
  style,
  ...props
}) => {
  return (
    <Text style={[categoryStyles[category], { color: statusColors[status] }, appearances[appearance], style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
