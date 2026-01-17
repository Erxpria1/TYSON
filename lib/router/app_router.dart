import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../models/user.dart';

// Screens
import '../screens/welcome_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/register_screen.dart';
import '../screens/auth/barber_login_screen.dart';
import '../screens/customer/customer_dashboard_screen.dart';
import '../screens/customer/customer_appointments_screen.dart';
import '../screens/customer/new_appointment_screen.dart';
import '../screens/customer/services_screen.dart';
import '../screens/customer/whatsapp_booking_screen.dart';
import '../screens/customer/profile_screen.dart';
import '../screens/barber/barber_dashboard_screen.dart';
import '../screens/barber/barber_appointments_screen.dart';
import '../screens/barber/customers_screen.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);

      // Wait for initial auth check
      if (!authProvider.initialCheckDone) {
        return null;
      }

      final isAuthenticated = authProvider.isAuthenticated;
      final role = authProvider.role;
      final currentPath = state.uri.path;

      // If not authenticated and trying to access protected routes
      if (!isAuthenticated) {
        if (currentPath.startsWith('/customer') || currentPath.startsWith('/barber')) {
          return '/';
        }
        return null;
      }

      // If authenticated, redirect based on role and current path
      if (isAuthenticated) {
        // If on auth screens, redirect to appropriate dashboard
        if (currentPath == '/' || currentPath.startsWith('/auth')) {
          if (role == UserRole.barber) {
            return '/barber';
          } else {
            return '/customer';
          }
        }

        // Check role access
        if (currentPath.startsWith('/barber') && role != UserRole.barber) {
          return '/customer';
        }
        if (currentPath.startsWith('/customer') && role == UserRole.barber) {
          return '/barber';
        }
      }

      return null;
    },
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const WelcomeScreen(),
      ),
      GoRoute(
        path: '/auth/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/auth/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/auth/barber-login',
        builder: (context, state) => const BarberLoginScreen(),
      ),
      GoRoute(
        path: '/customer',
        builder: (context, state) => const CustomerDashboardScreen(),
      ),
      GoRoute(
        path: '/customer/appointments',
        builder: (context, state) => const CustomerAppointmentsScreen(),
      ),
      GoRoute(
        path: '/customer/new-appointment',
        builder: (context, state) => const NewAppointmentScreen(),
      ),
      GoRoute(
        path: '/customer/services',
        builder: (context, state) => const ServicesScreen(),
      ),
      GoRoute(
        path: '/customer/whatsapp',
        builder: (context, state) => const WhatsAppBookingScreen(),
      ),
      GoRoute(
        path: '/customer/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/barber',
        builder: (context, state) => const BarberDashboardScreen(),
      ),
      GoRoute(
        path: '/barber/appointments',
        builder: (context, state) => const BarberAppointmentsScreen(),
      ),
      GoRoute(
        path: '/barber/customers',
        builder: (context, state) => const CustomersScreen(),
      ),
    ],
  );
}
