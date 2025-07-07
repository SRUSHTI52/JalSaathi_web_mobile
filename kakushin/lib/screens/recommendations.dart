import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import '../services/location_service.dart';
import '../services/mongo_service.dart';

class RecommendationsPage extends StatefulWidget {
  const RecommendationsPage({super.key});

  @override
  State<RecommendationsPage> createState() => _RecommendationsPageState();
}

class _RecommendationsPageState extends State<RecommendationsPage> {
  List<Map<String, dynamic>> nearbyDrives = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchNearbyDrives();
  }

  Future<void> fetchNearbyDrives() async {
    try {
      final Position userPos = await LocationService.getCurrentLocation();
      print(userPos);
      final allDrives = await MongoService.getDrives();
      print(allDrives);
      List<Map<String, dynamic>> nearby = [];

      for (var drive in allDrives) {
        final driveLocation = await LocationService.getLatLngFromAddress(drive.location);
        print('drivelocation $driveLocation');
        if (driveLocation == null) continue;

        double distance = Geolocator.distanceBetween(
          userPos.latitude,
          userPos.longitude,
          driveLocation['latitude']!,
          driveLocation['longitude']!,
        );

        if (distance <= 5000) { // within 5 km
          nearby.add({
            'drive': drive,
            'distance': distance,
          });

        }
      }

      nearby.sort((a, b) => (a['distance'] as double).compareTo(b['distance'] as double));


      setState(() {
        nearbyDrives = nearby;
        loading = false;
      });
      print(nearbyDrives);
    } catch (e) {
      print('Error fetching drives: $e');
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Recommended Drives")),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : nearbyDrives.isEmpty
          ? const Center(child: Text("No nearby drives found."))
          : ListView.builder(
        itemCount: nearbyDrives.length,
        itemBuilder: (context, index) {
          final driveData = nearbyDrives[index];
          final drive = driveData['drive'];
//          final distance = driveData['distance'];
          return Card(
            margin: const EdgeInsets.all(8),
            child: ListTile(
              title: Text(drive.title ?? 'Untitled'),
              subtitle: Text(drive.location ?? 'Unknown location'),
             // trailing: Text("${(distance / 1000).toStringAsFixed(2)} km"),
            ),
          );
        },
      ),
    );
  }
}
