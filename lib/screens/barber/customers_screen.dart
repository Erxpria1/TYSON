import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../constants/colors.dart';

class CustomersScreen extends StatefulWidget {
  const CustomersScreen({super.key});

  @override
  State<CustomersScreen> createState() => _CustomersScreenState();
}

class _CustomersScreenState extends State<CustomersScreen> {
  final _searchController = TextEditingController();
  String _searchQuery = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> _getMockCustomers() {
    return [
      {
        'name': 'Ali Yılmaz',
        'phone': '555 123 4567',
        'totalAppointments': 12,
        'lastVisit': DateTime.now().subtract(const Duration(days: 5)),
      },
      {
        'name': 'Mehmet Demir',
        'phone': '555 987 6543',
        'totalAppointments': 8,
        'lastVisit': DateTime.now().subtract(const Duration(days: 10)),
      },
      {
        'name': 'Ahmet Kaya',
        'phone': '555 222 3344',
        'totalAppointments': 15,
        'lastVisit': DateTime.now().subtract(const Duration(days: 2)),
      },
      {
        'name': 'Can Öztürk',
        'phone': '555 666 7788',
        'totalAppointments': 6,
        'lastVisit': DateTime.now().subtract(const Duration(days: 20)),
      },
    ];
  }

  List<Map<String, dynamic>> _getFilteredCustomers() {
    final customers = _getMockCustomers();
    if (_searchQuery.isEmpty) return customers;

    return customers.where((customer) {
      final name = (customer['name'] as String).toLowerCase();
      final phone = (customer['phone'] as String).toLowerCase();
      final query = _searchQuery.toLowerCase();
      return name.contains(query) || phone.contains(query);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final customers = _getFilteredCustomers();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Müşteriler'),
        automaticallyImplyLeading: false,
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'İsim veya telefon ile ara...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchQuery.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          setState(() => _searchQuery = '');
                        },
                      )
                    : null,
              ),
              onChanged: (value) {
                setState(() => _searchQuery = value);
              },
            ),
          ),
          // Customers List
          Expanded(
            child: customers.isEmpty
                ? _buildEmptyState()
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: customers.length,
                    itemBuilder: (context, index) {
                      return _CustomerCard(customer: customers[index]);
                    },
                  ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 2,
        onTap: (index) {
          switch (index) {
            case 0:
              context.go('/barber');
              break;
            case 1:
              context.go('/barber/appointments');
              break;
            case 2:
              context.go('/barber/customers');
              break;
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Panel'),
          BottomNavigationBarItem(icon: Icon(Icons.event_note), label: 'Randevular'),
          BottomNavigationBarItem(icon: Icon(Icons.people), label: 'Müşteriler'),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.people_outline,
            size: 80,
            color: AppColors.textSecondary.withOpacity(0.5),
          ),
          const SizedBox(height: 16),
          Text(
            'Müşteri bulunamadı',
            style: Theme.of(context).textTheme.headlineMedium,
          ),
        ],
      ),
    );
  }
}

class _CustomerCard extends StatelessWidget {
  final Map<String, dynamic> customer;

  const _CustomerCard({required this.customer});

  String _getInitials(String name) {
    final parts = name.split(' ');
    if (parts.length >= 2) {
      return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    }
    return name[0].toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd MMM yyyy', 'tr_TR');

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            CircleAvatar(
              radius: 30,
              backgroundColor: AppColors.secondary,
              child: Text(
                _getInitials(customer['name'] as String),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    customer['name'] as String,
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.phone, size: 14, color: AppColors.textSecondary),
                      const SizedBox(width: 4),
                      Text(
                        customer['phone'] as String,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: AppColors.info.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          '${customer['totalAppointments']} randevu',
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.info,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Son: ${dateFormat.format(customer['lastVisit'] as DateTime)}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
