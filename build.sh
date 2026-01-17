#!/bin/bash
set -e

echo "🚀 Starting Flutter Web Build for Netlify..."

# Check if Flutter is installed
if ! command -v flutter &> /dev/null; then
    echo "📦 Flutter not found. Installing Flutter..."

    # Download and install Flutter
    cd ~
    git clone https://github.com/flutter/flutter.git -b stable --depth 1
    export PATH="$PATH:`pwd`/flutter/bin"

    # Add Flutter to PATH for this session
    cd -
fi

# Get Flutter version
echo "📱 Flutter version:"
flutter --version

# Enable web support
echo "🌐 Enabling web support..."
flutter config --enable-web

# Get dependencies
echo "📦 Getting dependencies..."
flutter pub get

# Build for web with environment variables
echo "🔨 Building Flutter web app..."
flutter build web \
  --release \
  --web-renderer canvaskit \
  --dart-define=FIREBASE_API_KEY=$FIREBASE_API_KEY \
  --dart-define=FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN \
  --dart-define=FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID \
  --dart-define=FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET \
  --dart-define=FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID \
  --dart-define=FIREBASE_APP_ID=$FIREBASE_APP_ID

echo "✅ Build completed successfully!"
echo "📂 Build output: build/web"
