import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase_auth;
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';

class AuthProvider extends ChangeNotifier {
  static const String _userKey = 'user_data';
  final SharedPreferences _prefs;
  final firebase_auth.FirebaseAuth _auth = firebase_auth.FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  firebase_auth.User? _firebaseUser;
  User? _userData;
  bool _loading = true;
  bool _initialCheckDone = false;

  AuthProvider(this._prefs) {
    _init();
  }

  firebase_auth.User? get firebaseUser => _firebaseUser;
  User? get userData => _userData;
  bool get loading => _loading;
  bool get isAuthenticated => _firebaseUser != null;
  bool get initialCheckDone => _initialCheckDone;
  UserRole? get role => _userData?.role;

  Future<void> _init() async {
    // Load cached user data
    await _loadUserData();

    // Listen to auth state changes
    _auth.authStateChanges().listen(_onAuthStateChanged);
  }

  Future<void> _onAuthStateChanged(firebase_auth.User? user) async {
    _firebaseUser = user;
    _loading = true;
    notifyListeners();

    if (user != null) {
      // Fetch user data from Firestore
      await _fetchUserData(user.uid);
    } else {
      // Clear user data
      _userData = null;
      await _clearUserData();
    }

    _loading = false;
    _initialCheckDone = true;
    notifyListeners();
  }

  Future<void> _fetchUserData(String uid) async {
    try {
      final doc = await _firestore.collection('users').doc(uid).get();
      if (doc.exists) {
        _userData = User.fromFirestore(doc);
        await _saveUserData();
      }
    } catch (e) {
      debugPrint('Error fetching user data: $e');
    }
  }

  Future<void> _loadUserData() async {
    try {
      final data = _prefs.getString(_userKey);
      if (data != null) {
        final json = jsonDecode(data);
        // Note: This is a simplified version. You might want to implement
        // User.fromJson() method for proper deserialization
        // For now, we'll let the auth state listener fetch the real data
      }
    } catch (e) {
      debugPrint('Error loading user data: $e');
    }
  }

  Future<void> _saveUserData() async {
    if (_userData != null) {
      try {
        // Note: You might want to implement User.toJson() method
        await _prefs.setString(_userKey, jsonEncode({
          'uid': _userData!.uid,
          'email': _userData!.email,
          'name': _userData!.name,
          'phone': _userData!.phone,
          'role': _userData!.role == UserRole.barber ? 'barber' : 'customer',
        }));
      } catch (e) {
        debugPrint('Error saving user data: $e');
      }
    }
  }

  Future<void> _clearUserData() async {
    await _prefs.remove(_userKey);
  }

  // Sign up with email and password
  Future<String?> signUp({
    required String email,
    required String password,
    required String name,
    required String phone,
  }) async {
    try {
      // Create user in Firebase Auth
      final credential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      // Create user document in Firestore
      final now = DateTime.now();
      final user = User(
        uid: credential.user!.uid,
        email: email,
        name: name,
        phone: phone,
        role: UserRole.customer,
        createdAt: now,
        updatedAt: now,
      );

      await _firestore.collection('users').doc(user.uid).set(user.toFirestore());

      return null; // Success
    } on firebase_auth.FirebaseAuthException catch (e) {
      return _getErrorMessage(e.code);
    } catch (e) {
      return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  }

  // Sign in with email and password
  Future<String?> signIn({
    required String email,
    required String password,
  }) async {
    try {
      await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return null; // Success
    } on firebase_auth.FirebaseAuthException catch (e) {
      return _getErrorMessage(e.code);
    } catch (e) {
      return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  }

  // Sign in as barber (with role check)
  Future<String?> signInAsBarber({
    required String email,
    required String password,
  }) async {
    try {
      final credential = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      // Check if user is a barber
      final doc = await _firestore.collection('users').doc(credential.user!.uid).get();
      if (doc.exists) {
        final user = User.fromFirestore(doc);
        if (user.role != UserRole.barber) {
          await _auth.signOut();
          return 'Bu hesap berber hesabı değil.';
        }
      } else {
        await _auth.signOut();
        return 'Kullanıcı bulunamadı.';
      }

      return null; // Success
    } on firebase_auth.FirebaseAuthException catch (e) {
      return _getErrorMessage(e.code);
    } catch (e) {
      return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  }

  // Sign out
  Future<void> signOut() async {
    await _auth.signOut();
    _userData = null;
    await _clearUserData();
    notifyListeners();
  }

  String _getErrorMessage(String code) {
    switch (code) {
      case 'user-not-found':
        return 'Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.';
      case 'wrong-password':
        return 'Hatalı şifre.';
      case 'email-already-in-use':
        return 'Bu e-posta adresi zaten kullanılıyor.';
      case 'weak-password':
        return 'Şifre en az 6 karakter olmalıdır.';
      case 'invalid-email':
        return 'Geçersiz e-posta adresi.';
      case 'user-disabled':
        return 'Bu hesap devre dışı bırakılmış.';
      case 'too-many-requests':
        return 'Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin.';
      default:
        return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  }
}
