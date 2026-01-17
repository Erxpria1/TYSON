/**
 * Uniform Image Guidelines - TY-HAIR-DESIGN
 *
 * All images should follow these standards for consistent appearance.
 */

// Aspect Ratios
export const AspectRatio = {
  SQUARE: 1,          // 1:1 (profile pictures, icons)
  LANDSCAPE_16_9: 16 / 9,   // Hero images, banners
  PORTRAIT_9_16: 9 / 16,    // Stories, vertical cards
  LANDSCAPE_4_3: 4 / 3,    // Standard photos
  POSTER: 2 / 3,          // Service cards, posters
} as const;

// Standard Sizes (for reference & consistent sizing)
export const ImageSize = {
  THUMB: 64,            // Thumbnail size
  SMALL: 128,           // Small preview
  MEDIUM: 256,          // Card image
  LARGE: 512,           // Full screen preview
  HERO: 1024,           // Hero banner
  FULL: undefined,      // Original size
} as const;

// Default Resize Modes
export const ResizeMode = {
  COVER: 'cover' as const,    // Fill container, crop (default for photos)
  CONTAIN: 'contain' as const, // Fit entirely, letterbox (default for logos)
  STRETCH: 'stretch' as const, // Fill exactly, may distort
  CENTER: 'center' as const,  // Center in container, no scale
} as const;

// Uniform Image Styles Factory
export const createImageStyle = (aspectRatio: number = AspectRatio.SQUARE) => ({
  width: '100%',
  aspectRatio: aspectRatio,
});

export const createSquareImageStyle = () => createImageStyle(AspectRatio.SQUARE);

export const createCardImageStyle = () => ({
  width: '100%',
  aspectRatio: AspectRatio.POSTER, // 2:3 for service cards
  borderRadius: 12,
});

// Test Images (from assets/)
export const TestImages = {
  ICON: require('@/assets/icon.png'),
  ADAPTIVE: require('@/assets/adaptive-icon.png'),
  SPLASH: require('@/assets/splash-icon.png'),
  FAVICON: require('@/assets/favicon.png'),
} as const;
