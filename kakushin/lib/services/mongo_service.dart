// services/mongo_service.dart
import 'package:mongo_dart/mongo_dart.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../models/drive.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:firebase_auth/firebase_auth.dart';

class MongoService {

  static const mongo_url = 'mongodb+srv://srushtiporiwade02:happy49@cluster0.qa50c0v.mongodb.net/nomura?retryWrites=true&w=majority';


  static Future<List<Drive>> getDrives() async {
    final db = await Db.create(mongo_url);
    await db.open();
    final collection = db.collection('drives_pending');
    final results = await collection.find().toList();
    await db.close();
    return results.map((doc) => Drive.fromJson(doc)).toList();
  }

  static Future<bool> registerVolunteer({
    required String volunteerName,
    required Drive drive,
  }) async {
    try {
      final db = await Db.create(mongo_url);
      await db.open();
      final collection = db.collection('registered_volunteers');
      await collection.insertOne({
        'name': volunteerName,
        'title': drive.title,
        'organizer': drive.organization ?? 'N/A',
      });
      await db.close();
      return true;
    } catch (e) {
      print('Registration Error: \$e');
      return false;
    }
  }

  static Future<void> addUser({required String name, required String email}) async{
    try {
      final db = await Db.create(mongo_url);
      await db.open();
      final collection = db.collection('volunteers');
      final user = await collection.findOne({'email': email});
      if (user != null)
      {return;}
      else{
      await collection.insertOne({
        'name': name,
        'email': email,
        'points': 0,
        'drives_attended': 0,
      });}
      await db.close();
      return ;
    } catch (e) {
      print('Database Update Error: \$e');
      return;
    }
  }

  static Future<void> openMap(String location) async {
    final encodedLocation = Uri.encodeComponent(location);
    final url = Uri.parse('https://www.google.com/maps/search/?api=1&query=$encodedLocation');

    try {
      if (await canLaunchUrl(url)) {
        await launchUrl(url, mode: LaunchMode.externalApplication);
      } else {
        print('Could not open the map: $url');
      }
    } catch (e) {
      print('Error while launching map: $e');
    }
  }

  static Future<Map<String, dynamic>> getVolunteerByEmail(String email) async {
    final db = await Db.create(mongo_url);
    await db.open();
    final collection = db.collection('volunteers');
    final user = await collection.findOne({'email': email});
    await db.close();
    return user ?? {};
  }

  static Future<List<Map<String, dynamic>>> getLeaderboard() async {
    final db = await Db.create(mongo_url);
    await db.open();
    final collection = db.collection('volunteers');
    final results = await collection
        .find(where.sortBy('points', descending: true))
        .toList();
    await db.close();
    return results;
  }

  static Future<List<Map<String, dynamic>>> getRegisteredDrives() async {
    final db = await Db.create(mongo_url);
    await db.open();
    final collection = db.collection('registered_volunteers');
    final results = await collection.find().toList();
    await db.close();
    return results;
  }

  static Future<void> markAttendance({
    required String driveTitle,
    required String driveLocation,
    required String driveDate
  }) async {
    final user = FirebaseAuth.instance.currentUser;
    final name = user?.displayName ?? 'Anonymous';
    final db = await Db.create(mongo_url);
    await db.open();
    final collection = db.collection('attended_drives');
    await collection.insertOne({
      'volunteer_name': name,
      'drive_title': driveTitle,
      'drive_location': driveLocation,
      'date': driveDate,
    });
    await db.close();
  }

  /// Fetch drive by title (used in your AttendanceResultPage)
  static Future<Map<String, dynamic>?> getDriveByTitle(String title) async {
    final db = await Db.create(mongo_url);
    await db.open();
    final collection = db.collection('registered_volunteers');
    final result = await collection.findOne({'title': title});
    await db.close();
    return result;
  }

}
