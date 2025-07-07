import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../services/mongo_service.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> _signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

      if (googleUser == null) return; // Cancelled

      final GoogleSignInAuthentication googleAuth = await googleUser.authentication;

      final AuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      await _auth.signInWithCredential(credential);
      await MongoService.addUser(
        name: googleUser.displayName??'ANONYMOUS',
        email: googleUser.email,
      );

      // Navigate to home page after login
      Navigator.pushReplacementNamed(context, '/home');
    } catch (e, stackTrace) {
      print('Google Sign-In error: $e');
      print('Stack trace: $stackTrace');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Login failed: $e')),
      );
    }

  }

  @override
  // Widget build(BuildContext context) {
  //   return Scaffold(
  //     appBar: AppBar(title: const Text('Login')),
  //     body: Center(
  //       child: ElevatedButton.icon(
  //         icon: const Icon(Icons.login),
  //         label: const Text('Sign in with Google'),
  //         onPressed: _signInWithGoogle,
  //       ),
  //     ),
  //   );
  // }

  Widget build(BuildContext context) {
    final navyBlue = const Color(0xFF14267C);

    return Scaffold(
      backgroundColor: Color(0xFFE8F3F5),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 20,
                  offset: Offset(0, 10),
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // App Logo
                Container(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Column(
                    children: [
                      Image.asset(
                  'assets/images/logo.png', width: 50, // Adjust size as needed
                          height: 50),
                      const SizedBox(height: 12),
                      Text(
                        'Welcome to JalSaathi ',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: navyBlue,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Volunteer for change!',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[700],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton.icon(
                  icon: Image.asset(
                    'assets/images/google-logo.png',
                    height: 24,
                  ),
                  label: const Text(
                    'Continue with Google',
                    style: TextStyle(fontSize: 16),
                  ),
                  onPressed: _signInWithGoogle,
                  style: ElevatedButton.styleFrom(
                    foregroundColor: navyBlue,
                    backgroundColor: Colors.white,
                    side: BorderSide(color: navyBlue),
                    minimumSize: const Size(double.infinity, 48),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 2,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
