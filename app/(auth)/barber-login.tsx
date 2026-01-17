import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Gradients } from '@/constants/colors';
import { BARBER_NAME } from '@/constants/services';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function BarberLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifre giriniz');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Barber rolünü kontrol et
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData?.role !== 'barber') {
        Alert.alert('Yetki Hatası', 'Bu alana sadece yetkili berberler girebilir');
        await auth.signOut();
        setLoading(false);
        return;
      }

      // Barber dashboard tab'a navigasyon - AuthContext otomatik güncellenecek
      router.replace('/(barber)/dashboard' as any);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorCode = error.code;
      let errorMessage = 'Giriş başarısız';

      if (errorCode === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi';
      } else if (errorCode === 'auth/user-disabled') {
        errorMessage = 'Hesabınız devre dışı bırakılmış';
      } else if (errorCode === 'auth/user-not-found') {
        errorMessage = 'Kullanıcı bulunamadı';
      } else if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Hatalı şifre';
      } else if (errorCode === 'auth/invalid-credential') {
        errorMessage = 'Geçersiz e-posta veya şifre';
      }

      Alert.alert('Hata', errorMessage);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Shield Icon */}
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={['#c9a962', '#d4af37']}
            style={styles.iconGradient}
          >
            <Ionicons name="shield-checkmark" size={48} color="#1a1a1a" />
          </LinearGradient>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Berber Girişi</Text>
          <Text style={styles.subtitle}>{BARBER_NAME}</Text>
          <Text style={styles.description}>Randevularınızı yönetin</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="E-posta"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#999"
                />
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={loading ? ['#666', '#666'] : Gradients.gold}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Text>
            </LinearGradient>
          </Pressable>

          {/* Security Notice */}
          <View style={styles.notice}>
            <Ionicons name="information-circle" size={16} color="#666" />
            <Text style={styles.noticeText}>Bu alan sadece yetkili berber içindir</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c9a962',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#c9a962',
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#999',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  button: {
    height: 56,
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  noticeText: {
    fontSize: 12,
    color: '#666',
  },
});
