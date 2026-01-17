import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

interface TabIconProps {
  size?: number;
  color: string;
}

export const ServicesIcon: React.FC<TabIconProps> = ({ size = 24, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Scissors icon for services/haircuts */}
    <Path
      d="M6 9C6 6.23858 8.23858 4 11 4C11.8284 4 12.5 4.67157 12.5 5.5C12.5 6.32843 11.8284 7 11 7C10.1716 7 9.5 6.32843 9.5 5.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M18 15C18 17.7614 15.7614 20 13 20C12.1716 20 11.5 19.3284 11.5 18.5C11.5 17.6716 12.1716 17 13 17C13.8284 17 14.5 17.6716 14.5 18.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M6 9L8 7L10 5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 15L16 17L14 19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 7C9.5 8.5 14.5 15.5 16 17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M10 5C11.5 6.5 12.5 14.5 14 16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const ServicesIconOutline: React.FC<TabIconProps> = ({ size = 24, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9C6 6.23858 8.23858 4 11 4C11.8284 4 12.5 4.67157 12.5 5.5C12.5 6.32843 11.8284 7 11 7C10.1716 7 9.5 6.32843 9.5 5.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M18 15C18 17.7614 15.7614 20 13 20C12.1716 20 11.5 19.3284 11.5 18.5C11.5 17.6716 12.1716 17 13 17C13.8284 17 14.5 17.6716 14.5 18.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M6 9L8 7L10 5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 15L16 17L14 19"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 7C9.5 8.5 14.5 15.5 16 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M10 5C11.5 6.5 12.5 14.5 14 16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const WhatsAppIcon: React.FC<TabIconProps> = ({ size = 24, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* WhatsApp brand icon */}
    <Path
      d="M12 2C6.47715 2 2 6.47715 2 12C2 13.8158 2.48473 15.5201 3.33347 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M2.5 17.5L4 21L7.5 19.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <Path
      d="M14.5 10.5C14.5 10.5 14 9 12 9C10 9 9.5 10.5 9.5 10.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M9.5 13.5C9.5 13.5 10 15 12 15C14 15 14.5 13.5 14.5 13.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const WhatsAppIconOutline: React.FC<TabIconProps> = ({ size = 24, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Chat bubble outline */}
    <Path
      d="M21 11.5C21 16.7467 16.7467 21 11.5 21C10.1364 21 8.84091 20.7415 7.67273 20.1855L3 21.5L4.81445 17.3273C4.2585 16.1591 4 14.8636 4 13.5C4 8.25329 8.25329 4 13.5 4C18.7467 4 21 8.25329 21 11.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 12C9 12 10 10 12 10C14 10 15 12 15 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M9 15C9 15 10 17 12 17C14 17 15 15 15 15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);
