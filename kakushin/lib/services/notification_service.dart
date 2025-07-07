import 'package:firebase_messaging/firebase_messaging.dart';

class NotificationService {
  static final _firebaseMessaging = FirebaseMessaging.instance;

  static Future<void> init() async {
    // Request permission (iOS only)
    NotificationSettings settings = await _firebaseMessaging.requestPermission();

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('Notification permission granted');

      // Get device token
      final token = await _firebaseMessaging.getToken();
      print('FCM Token: $token');

      // Listen for foreground messages
      FirebaseMessaging.onMessage.listen((message) {
        print(' Foreground Notification: ${message.notification?.title}');
      });

      // Notification when app opened from terminated state
      FirebaseMessaging.onMessageOpenedApp.listen((message) {
        print('App opened from notification: ${message.notification?.title}');
      });
    } else {
      print(' Notification permission denied');
    }
  }
}
