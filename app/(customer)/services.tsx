import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { SERVICES } from '@/constants/services';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '@/constants/colors';
import { TestImages, createSquareImageStyle, AspectRatio } from '@/constants/images';

export default function ServicesScreen() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const handleImageLoadStart = (serviceId: string) => {
    setLoadingImages(prev => ({ ...prev, [serviceId]: true }));
  };

  const handleImageLoadEnd = (serviceId: string) => {
    setLoadingImages(prev => ({ ...prev, [serviceId]: false }));
  };

  const handleImageError = (serviceId: string, error: any) => {
    console.warn(`Image load failed for service ${serviceId}:`, error?.nativeEvent?.error || error);
    setFailedImages(prev => ({ ...prev, [serviceId]: true }));
    setLoadingImages(prev => ({ ...prev, [serviceId]: false }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hizmetlerimiz</Text>
        <Text style={styles.subtitle}>Profesyonel bakım hizmetleri</Text>
      </View>

      {/* Services List */}
      {/* Quick test image to validate require() asset rendering */}
      <View style={styles.testImageRow}>
        <Text style={styles.testLabel}>Test Local Image:</Text>
        <Image
          source={TestImages.ICON}
          style={styles.testImage}
          fadeDuration={300}
          onError={(e) => console.warn('Test image failed:', e.nativeEvent?.error)}
          {...(Platform.OS === 'ios' ? {
            defaultSource: require('@/assets/icon.png'),
          } : {})}
        />
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {SERVICES.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            {service.image ? (
              // support local require() (number) or remote uri (string)
              typeof service.image === 'string' ? (
                !failedImages[service.id] ? (
                  <View style={styles.imageContainer}>
                    {loadingImages[service.id] && (
                      <View style={styles.loadingOverlay}>
                        <Ionicons name="image-outline" size={24} color="#c9a962" />
                      </View>
                    )}
                    <Image
                      source={{
                        uri: service.image,
                        cache: 'default',
                        headers: {
                          'Accept': 'image/*',
                          'User-Agent': 'Expo/1.0',
                        }
                      }}
                      style={styles.serviceImage}
                      resizeMode="cover"
                      fadeDuration={300}
                      onLoadStart={() => handleImageLoadStart(service.id)}
                      onLoadEnd={() => handleImageLoadEnd(service.id)}
                      onError={(e) => handleImageError(service.id, e)}
                    />
                  </View>
                ) : (
                  <View style={styles.serviceIcon}>
                    <Ionicons name="cut" size={28} color="#1a1a1a" />
                  </View>
                )
              ) : (
                !failedImages[service.id] ? (
                  <View style={styles.imageContainer}>
                    {loadingImages[service.id] && (
                      <View style={styles.loadingOverlay}>
                        <Ionicons name="image-outline" size={24} color="#c9a962" />
                      </View>
                    )}
                    <Image
                      source={service.image as any}
                      style={styles.serviceImage}
                      resizeMode="cover"
                      fadeDuration={300}
                      onLoadStart={() => handleImageLoadStart(service.id)}
                      onLoadEnd={() => handleImageLoadEnd(service.id)}
                      onError={(e) => handleImageError(service.id, e)}
                      {...(Platform.OS === 'ios' ? {
                        defaultSource: require('@/assets/icon.png'), // iOS fallback
                      } : {})}
                    />
                  </View>
                ) : (
                  <View style={styles.serviceIcon}>
                    <Ionicons name="cut" size={28} color="#1a1a1a" />
                  </View>
                )
              )
            ) : (
              <LinearGradient
                colors={Gradients.gold}
                style={styles.serviceIcon}
              >
                <Ionicons name="cut" size={28} color="#1a1a1a" />
              </LinearGradient>
            )}
            <Text style={styles.debugText}>{service.image ? (typeof service.image === 'string' ? 'remote' : 'local') : 'none'}</Text>
            <View style={styles.serviceInfo}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price} ₺</Text>
              </View>
              <View style={styles.serviceMeta}>
                <View style={styles.durationBadge}>
                  <Ionicons name="time-outline" size={14} color="#c9a962" />
                  <Text style={styles.durationText}>{service.duration} dk</Text>
                </View>
              </View>
              {service.description && (
                <Text style={styles.serviceDescription}>{service.description}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    zIndex: 1,
  },
  serviceImage: {
    width: 80,
    aspectRatio: AspectRatio.POSTER, // 2:3 uniform aspect ratio
    borderRadius: 12,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#c9a962',
  },
  serviceMeta: {
    marginBottom: 8,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#c9a96220',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  durationText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#c9a962',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
  },
  debugText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  testImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  testLabel: {
    color: '#999',
    marginRight: 8,
  },
  testImage: {
    ...createSquareImageStyle(), // Uniform 1:1 aspect ratio
    width: 48, // Slightly larger for better visibility
    height: undefined, // Let aspect ratio determine height
    borderRadius: 12, // Modern rounded corners
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#c9a962', // Gold accent border
  },
});
