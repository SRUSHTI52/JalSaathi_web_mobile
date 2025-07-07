// import 'package:flutter/material.dart';
// import 'Onboarding/onboarding_screen.dart'; // Import the correct file
//
// class SplashScreen extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     // Navigate to OnboardingScreen after a 3-second delay
//     Future.delayed(Duration(seconds: 3), () {
//       Navigator.pushReplacement(
//         context,
//         MaterialPageRoute(builder: (context) => OnboardingScreen()),
//       );
//     });
//
//     return Scaffold(
//       backgroundColor: Colors.white,
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             // Include your image here
//             Image.asset(
//               'assets/images/logo.png', // Path to your image
//               width: 250, // Adjust size as needed
//               height: 250,
//             ),
//             SizedBox(height: 20),
//           ],
//         ),
//       ),
//     );
//   }
// }
import 'package:flutter/material.dart';
import 'package:kakushin/screens/login_screen.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotateAnimation;

  @override
  void initState() {
    super.initState();

    // Initialize the animation controller
    _controller = AnimationController(
      duration: Duration(seconds: 2), // Duration of the animations
      vsync: this,
    );

    // Define the scaling animation, scaling from 0.5 to 1.0 (50% to full size)
    _scaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    // Define the rotation animation, rotating from 0 to 360 degrees
    _rotateAnimation = Tween<double>(begin: 0, end: 2 * 3.14159).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    // Start the animation
    _controller.forward();

    // Navigate to OnboardingScreen after a 3-second delay
    Future.delayed(Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => LoginPage()),
      );
    });
  }

  @override
  void dispose() {
    // Dispose the animation controller when the widget is destroyed
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: AnimatedBuilder(
          animation: _controller,
          child: Image.asset(
            'assets/images/logo.png', // Path to your image
            width: 250, // Adjust size as needed
            height: 250,
          ),
          builder: (context, child) {
            return Transform(
              transform: Matrix4.identity()
                ..scale(_scaleAnimation.value) // Scaling animation
                ..rotateZ(_rotateAnimation.value), // Rotation animation
              alignment: Alignment.center,
              child: child,
            );
          },
        ),
      ),
    );
  }
}

