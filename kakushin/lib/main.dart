// main.dart
import 'package:flutter/material.dart';
import 'package:kakushin/screens/login_screen.dart';
import 'package:kakushin/screens/notification.dart';
import 'package:kakushin/screens/qr_scan_page.dart';
import 'package:kakushin/screens/splash_screen.dart';
import 'package:kakushin/services/notification_service.dart';
import 'screens/home_screen.dart';
import 'screens/recommendations.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
//  await dotenv.load(fileName: ".env");
  await Firebase.initializeApp();
  await NotificationService.init(); //
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jal Saathi',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
     // home: const HomeScreen(),
      home: SplashScreen(),
      routes: {
        '/home': (context) => const HomeScreen(),
        '/recommendations': (context) => const RecommendationsPage(),
        '/qr-scan' : (context) => const QRScanPage(),
        '/notifications' : (context) => const NotificationPage(),
      },
    );
  }
}



// import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'package:image_picker/image_picker.dart';
// import 'dart:convert';
// import 'dart:io';
//
// void main() {
//   runApp(MyApp());
// }
//
// class MyApp extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Waste Classifier',
//       theme: ThemeData(primarySwatch: Colors.green),
//       home: ImageClassifierPage(),
//     );
//   }
// }
//
// class ImageClassifierPage extends StatefulWidget {
//   @override
//   _ImageClassifierPageState createState() => _ImageClassifierPageState();
// }
//
// class _ImageClassifierPageState extends State<ImageClassifierPage> {
//   String resultText = 'No prediction yet.';
//   File? selectedImage;
//
//   Future<void> predictImageClassification() async {
//     final picker = ImagePicker();
//     final pickedFile = await picker.pickImage(source: ImageSource.gallery);
//
//     if (pickedFile != null) {
//       setState(() {
//         selectedImage = File(pickedFile.path);
//         resultText = 'Processing...';
//       });
//
//       var request = http.MultipartRequest(
//         'POST',
//         Uri.parse('http://192.168.131.171:8000/classify'),
//       );
//       request.files.add(await http.MultipartFile.fromPath('file', pickedFile.path));
//
//       var response = await request.send();
//       if (response.statusCode == 200) {
//         var responseBody = await response.stream.bytesToString();
//         var result = json.decode(responseBody);
//         setState(() {
//           // resultText = 'Predicted Label: ${result['label']}';
//           resultText = 'Predicted Label: ${result['prediction']}';
//
//         });
//       } else {
//         setState(() {
//           resultText = 'Prediction failed: ${response.statusCode}';
//         });
//       }
//     } else {
//       setState(() {
//         resultText = 'No image selected.';
//       });
//     }
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: Text('Waste Classifier')),
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             selectedImage != null
//                 ? Image.file(selectedImage!, height: 200)
//                 : Icon(Icons.image, size: 100),
//             SizedBox(height: 20),
//             ElevatedButton(
//               onPressed: predictImageClassification,
//               child: Text('Pick and Classify Image'),
//             ),
//             SizedBox(height: 20),
//             Text(resultText, textAlign: TextAlign.center),
//           ],
//         ),
//       ),
//     );
//   }
// }
//
//
//
