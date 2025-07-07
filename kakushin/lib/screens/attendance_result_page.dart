import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import '../services/location_service.dart';
import '../services/mongo_service.dart';

class AttendanceResultPage extends StatefulWidget {
  final String qrData;
  const AttendanceResultPage({super.key, required this.qrData});

  @override
  State<AttendanceResultPage> createState() => _AttendanceResultPageState();
}

class _AttendanceResultPageState extends State<AttendanceResultPage> {
  String message = 'marking attendance...';

  @override
  void initState() {
    super.initState();
    _verifyAttendance();
  }

  Future<void> _verifyAttendance() async {
    try {
      final drive = await MongoService.getDriveByTitle(widget.qrData);
print(drive);
      if (drive == null) {
        if (!mounted) return;
        setState(() => message = 'Drive not found.');
        return;
      }

      final Position position = await LocationService.getCurrentLocation();
      print(position);
      print(drive['location']);
      final driveLatLng = await LocationService.getLatLngFromAddress(drive['location']);

      final userLatLng = {
        'latitude': position.latitude,
        'longitude': position.longitude,
      };
      double distance = Geolocator.distanceBetween(
        driveLatLng!['latitude']!,
        driveLatLng!['longitude']!,
        userLatLng!['latitude']!,
        userLatLng!['longitude']!,
      );
print(distance);
      if (distance <= 5000) {
        await MongoService.markAttendance(
          driveTitle: drive['title'],
          driveLocation: drive['location'],
          driveDate: drive['date'],
        );
        setState(() => message = 'Attendance marked successfully!');
      } else {
        setState(() => message = 'You are not at the correct location.');
      }
    } catch (e) {
      setState(() => message = 'Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Attendance Result')),
      body: Center(child: Text(message)),
    );
  }
}
