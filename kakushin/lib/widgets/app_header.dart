// widgets/app_header.dart
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
class AppHeader extends StatelessWidget {
  const AppHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;
    print(user);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 16),
        Row(
          children: [
            Image.asset(
              'assets/images/logo.png', // Path to your image
              width: 50, // Adjust size as needed
              height: 50,
            ),
            const SizedBox(width: 10),
            const Text(
              'Jal Saathi',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const Spacer(),
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.qr_code_scanner, size: 30),
                  onPressed: () {
                    Navigator.pushNamed(context, '/qr-scan');
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.notifications, size: 30),
                  onPressed: () {
                    Navigator.pushNamed(context, '/notifications');
                  },
                ),
              ],
            )
          ],
        ),
        const SizedBox(height: 8),
       // const Text("Hey Priya! 👋", style: TextStyle(fontSize: 16, color: Colors.grey)),
        Text(
          "Hey ${user?.displayName}! ",
          style: const TextStyle(fontSize: 16, color: Colors.grey),
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}
