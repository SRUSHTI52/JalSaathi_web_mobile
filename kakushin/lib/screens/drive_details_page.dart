// screens/drive_details_page.dart
import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../models/drive.dart';
import '../services/mongo_service.dart';

class DriveDetailsPage extends StatelessWidget {
  final Drive drive;

  const DriveDetailsPage({super.key, required this.drive});

  // void _openMap(String location) async {
  //   final query = Uri.encodeComponent(location);
  //   print(location);
  //   print(query);
  //   //final googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=$query';
  //   final url = Uri.parse('https://www.google.com/maps/search/?api=1&query=$query');
  //
  //   if (await canLaunchUrl(url)) {
  //     await launchUrl(url, mode: LaunchMode.externalApplication);
  //   } else {
  //     throw 'Could not open the map.';
  //   }
  // }

  Future<void> _registerDrive(BuildContext context) async {
    final success = await MongoService.registerVolunteer(volunteerName : 'Srushti Poriwade', drive : drive);
    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Successfully registered for the drive!')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Registration failed.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(drive.title),
         // Navy Blue
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Organizer & Date Section
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Color(0xFFE8F3F5),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Organizer",
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.grey[700])),
                  Text(drive.organization ?? 'N/A',
                      style: const TextStyle(fontSize: 16)),

                  const SizedBox(height: 12),
                  Text("Date",
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.grey[700])),
                  Text(drive.date, style: const TextStyle(fontSize: 16)),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Location Section
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Color(0xFFE8F3F5),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.location_on),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(drive.location, style: const TextStyle(fontSize: 16)),
                        const SizedBox(height: 8),
                        TextButton.icon(
                          onPressed: () async {
                            await MongoService.openMap(drive.location);
                          },
                          icon: const Icon(Icons.map),
                          label: const Text("Open in Maps"),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // QR Code
            Center(
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey.shade300),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: QrImageView(
                  data: drive.title,
                  version: QrVersions.auto,
                  size: 180,
                ),
              ),
            ),

            const SizedBox(height: 30),

            // Register Button
            ElevatedButton.icon(
              onPressed: () => _registerDrive(context),
              icon: const Icon(Icons.check_circle_outline, color: Colors.white,),
              label: const Text("Register for Drive"),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 14),
                backgroundColor: const Color(0xFF14267C), // Navy blue
                textStyle: const TextStyle(fontSize: 16, color: Colors.white),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

}
