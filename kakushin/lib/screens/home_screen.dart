// // screens/home_screen.dart
// import 'package:flutter/material.dart';
// import 'package:kakushin/screens/waste_classification.dart';
// import '../services/mongo_service.dart';
// import '../models/drive.dart';
//
// class HomeScreen extends StatefulWidget {
//   const HomeScreen({super.key});
//
//   @override
//   State<HomeScreen> createState() => _HomeScreenState();
// }
//
// class _HomeScreenState extends State<HomeScreen> {
//   late Future<List<Drive>> drivesFuture;
//
//   @override
//   void initState() {
//     super.initState();
//     drivesFuture = MongoService.getDrives();
//   }
//   int _selectedIndex = 0;
//
//   final List<Widget> _pages = [
//     HomeScreen(),
//     WasteClassifierPage(),
//    // ChatbotPage(),
//    // ProfilePage(),
//   ];
//
//   void _onItemTapped(int index) {
//     setState(() {
//       _selectedIndex = index;
//     });
//   }
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: _pages[_selectedIndex],
//       bottomNavigationBar: BottomNavigationBar(
//         currentIndex: _selectedIndex,
//         onTap: _onItemTapped,
//         items: const [
//           BottomNavigationBarItem(icon: Icon(Icons.event), label: "Drives"),
//           BottomNavigationBarItem(icon: Icon(Icons.category), label: "Waste Classification"),
//           BottomNavigationBarItem(icon: Icon(Icons.chat), label: "Chatbot"),
//           BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
//         ],
//       ),
//       body: SafeArea(
//         child: Padding(
//           padding: const EdgeInsets.symmetric(horizontal: 16),
//           child: ListView(
//             children: [
//               const SizedBox(height: 16),
//               Row(
//                 children: [
//                   const CircleAvatar(
//                     backgroundColor: Colors.white,
//                     child: Icon(Icons.waves, color: Colors.blue),
//                   ),
//                   const SizedBox(width: 10),
//                   const Text(
//                     'Jal Saathi',
//                     style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
//                   ),
//                   const Spacer(),
//                   Stack(
//                     children: const [
//                       Icon(Icons.notifications, size: 30),
//                       Positioned(
//                         right: 0,
//                         child: CircleAvatar(
//                           radius: 8,
//                           backgroundColor: Colors.red,
//                           child: Text('3', style: TextStyle(color: Colors.white, fontSize: 10)),
//                         ),
//                       ),
//                     ],
//                   ),
//                 ],
//               ),
//               const SizedBox(height: 8),
//               const Text("Hey Priya! 👋", style: TextStyle(fontSize: 16, color: Colors.grey)),
//               const SizedBox(height: 16),
//               const TextField(
//                 decoration: InputDecoration(
//                   hintText: "Search by name, location...",
//                   prefixIcon: Icon(Icons.search),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(30))),
//                 ),
//               ),
//               const SizedBox(height: 16),
//               Container(
//                 padding: const EdgeInsets.all(12),
//                 decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(12)),
//                 child: Column(
//                   mainAxisAlignment: MainAxisAlignment.center,
//                   children: [
//                     const Text("Want to know the best recommended drives?", style: TextStyle(fontSize: 14)),
//                     ElevatedButton(
//                       onPressed: () {
//                         Navigator.pushNamed(context, '/recommendations');
//                       },
//                       child: const Text("GET"),
//                     ),
//                   ],
//                 ),
//               ),
//               const SizedBox(height: 16),
//               FutureBuilder<List<Drive>>(
//                 future: drivesFuture,
//                 builder: (context, snapshot) {
//                   if (snapshot.connectionState == ConnectionState.waiting) {
//                     return const Center(child: CircularProgressIndicator());
//                   } else if (snapshot.hasError) {
//                     print(snapshot);
//                     return const Center(child: Text("Error fetching drives"));
//                   }
//
//                   final drives = snapshot.data!;
//                   return Column(
//                     children: drives.map((drive) => DriveCard(drive)).toList(),
//                   );
//                 },
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
//
//   Widget DriveCard(Drive drive) {
//     return Container(
//       margin: const EdgeInsets.symmetric(vertical: 8),
//       padding: const EdgeInsets.all(16),
//       decoration: BoxDecoration(
//         color: Colors.white,
//         borderRadius: BorderRadius.circular(12),
//         boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 4)],
//       ),
//       child: Column(
//         crossAxisAlignment: CrossAxisAlignment.start,
//         children: [
//           Text(drive.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
//           const SizedBox(height: 8),
//           Row(
//             children: [
//               const Icon(Icons.location_on, size: 16, color: Colors.blue),
//               const SizedBox(width: 4),
//               Text(drive.location),
//             ],
//           ),
//           Row(
//             children: [
//               const Icon(Icons.calendar_today, size: 16, color: Colors.blue),
//               const SizedBox(width: 4),
//               Text(drive.date),
//             ],
//           ),
//           Row(
//             children: [
//               const Icon(Icons.access_time, size: 16, color: Colors.blue),
//               const SizedBox(width: 4),
//               Text(drive.time),
//             ],
//           ),
//         ],
//       ),
//     );
//   }
// }
// screens/home_screen.dart
import 'package:flutter/material.dart';
import 'package:kakushin/screens/chatbot_screen.dart';
import 'package:kakushin/screens/profile_screen.dart';
import 'package:kakushin/screens/waste_classification.dart';
import '../services/mongo_service.dart';
import '../models/drive.dart';
import '../widgets/app_header.dart';
import 'drive_details_page.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<Drive>> drivesFuture;
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    drivesFuture = MongoService.getDrives();
  }

  final List<Widget> _pages = [
    const Placeholder(), // This will be replaced with Home page content
    const WasteClassifierPage(),
    const ChatScreen(),// ChatbotPage(),
    const ProfileScreen(),// ProfilePage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  Widget buildHomePage() {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: ListView(
          children: [
            const AppHeader(),
            const TextField(
              decoration: InputDecoration(
                hintText: "Search by name, location...",
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(30)),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Want to know the best recommended drives?", style: TextStyle(fontSize: 14)),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/recommendations');
                    },
                    child: const Text("GET", style: TextStyle(color: Color(
                        0xFF091450)),),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            FutureBuilder<List<Drive>>(
              future: drivesFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  print(snapshot);
                  return const Center(child: Text("Error fetching drives"));
                }

                final drives = snapshot.data!;
                return Column(
                  children: drives.map((drive) => DriveCard(context, drive)).toList(),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _selectedIndex == 0 ? buildHomePage() : _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.event) ,label: "Drives"),
          BottomNavigationBarItem(icon: Icon(Icons.category), label: "Waste Classification"),
          BottomNavigationBarItem(icon: Icon(Icons.chat), label: "Chatbot"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }

  Widget DriveCard(BuildContext context, Drive drive) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => DriveDetailsPage(drive: drive),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 8),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 4)],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(drive.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.location_on, size: 16, color: Color(0xFF091450)),
                const SizedBox(width: 4),
                Text(drive.location),
              ],
            ),
            Row(
              children: [
                const Icon(Icons.calendar_today, size: 16, color: Color(0xFF091450)),
                const SizedBox(width: 4),
                Text(drive.date),
              ],
            ),
            Row(
              children: [
                const Icon(Icons.access_time, size: 16, color: Color(0xFF091450)),
                const SizedBox(width: 4),
                Text(drive.organization),
              ],
            ),
          ],
        ),
      ),
    );
  }

}
