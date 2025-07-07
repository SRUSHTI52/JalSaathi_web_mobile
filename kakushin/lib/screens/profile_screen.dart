// leaderboard_screen.dart
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../services/mongo_service.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String userEmail = FirebaseAuth.instance.currentUser?.email ?? '';
  int userPoints = 0;
  int userDrives = 0;
  List<Map<String, dynamic>> leaderboard = [];
  List<Map<String, dynamic>> registered = [];

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    final userData = await MongoService.getVolunteerByEmail(userEmail);
    final leaders = await MongoService.getLeaderboard();
    final registers = await MongoService.getRegisteredDrives();

    setState(() {
      userPoints = userData['points'] ?? 0;
      userDrives = userData['drives_attended'] ?? 0;
      leaderboard = leaders;
      registered = registers;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                gradient: const LinearGradient(
                  colors: [Colors.blue, Colors.indigo],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text('$userPoints', style: const TextStyle(fontSize: 32, color: Colors.white, fontWeight: FontWeight.bold)),
                  const Text('Total Points', style: TextStyle(color: Colors.white)),
                  const SizedBox(height: 8),
                  Text('$userDrives Drives Completed', style: const TextStyle(color: Colors.white70)),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [BoxShadow(color: Colors.grey.shade300, blurRadius: 4)],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Leaderboard', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                  ...leaderboard.asMap().entries.map((entry) {
                    int index = entry.key;
                    final data = entry.value;
                    return ListTile(
                      leading: CircleAvatar(child: Text('${index + 1}')),
                      title: Text(data['name'] ?? 'No Name'),
                      subtitle: Text("${data['drives_attended']} "),
                      trailing: Text("${data['points']} pts", style: const TextStyle(fontWeight: FontWeight.bold)),
                    );
                  }).toList(),
                  const Text('Registered Drives', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  ...registered.asMap().entries.map((entry) {
                    int index = entry.key;
                    final data = entry.value;
                    return ListTile(
                      // leading: CircleAvatar(child: Text('${index + 1}')),
                      title: Text(data['name'] ?? 'No Name'),
                      subtitle: Text("${data['title']} "),
                      trailing: Text("${data['organizer']}", style: const TextStyle(fontWeight: FontWeight.bold)),
                    );
                  }).toList(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
