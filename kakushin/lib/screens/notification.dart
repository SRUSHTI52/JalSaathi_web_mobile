import 'package:flutter/material.dart';

class NotificationPage extends StatelessWidget {
  const NotificationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Notifications", style: TextStyle(fontWeight: FontWeight.bold)),
         // Deep green
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            const Text(
              "Drives",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            _buildDriveCard(
              title: "📢 New Drive Alert! ",
              // date: "29th June 2025",
              // time: "7:00 AM - 10:00 AM",
              location: "Juhu Beach, Mumbai",
            ),
            _buildDriveCard(
              title: "📢 New Drive Alert!",
              // date: "5th July 2025",
              // time: "9:00 AM - 12:00 PM",
              location: "Powai Lake, Mumbai",
            ),

            const SizedBox(height: 30),
            const Text(
              "Eco Facts",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            _buildFactCard(
              "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
            ),
            _buildFactCard(
              "Plastic takes over 400 years to degrade in the environment.",
            ),
            _buildFactCard(
              "Mangroves absorb 4x more carbon than rainforests.",
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDriveCard({required String title, required String location}) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(
                  0xFF091450)),
            ),
            const SizedBox(height: 6),
            // Row(
            //   children: [
            //     const Icon(Icons.calendar_today, size: 16, color: Colors.grey),
            //     const SizedBox(width: 6),
            //     Text(date),
            //   ],
            // ),
            // const SizedBox(height: 4),
            // Row(
            //   children: [
            //     const Icon(Icons.access_time, size: 16, color: Colors.grey),
            //     const SizedBox(width: 6),
            //     Text(time),
            //   ],
            // ),
            const SizedBox(height: 4),
            Row(
              children: [
                const Icon(Icons.location_on, size: 16, color: Colors.grey),
                const SizedBox(width: 6),
                Flexible(child: Text(location)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFactCard(String fact) {
    return Card(
      color: const Color(0xFFE8F3F5),
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      margin: const EdgeInsets.symmetric(vertical: 6),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.eco, color: Colors.green, size: 22),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                fact,
                style: const TextStyle(fontSize: 14),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
