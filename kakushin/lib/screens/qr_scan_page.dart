// import 'package:flutter/material.dart';
// import 'package:mobile_scanner/mobile_scanner.dart';
// import 'attendance_result_page.dart';
//
// class QRScanPage extends StatelessWidget {
//   const QRScanPage({super.key});
//
//   void _onDetect(BarcodeCapture capture, BuildContext context) {
//     final String? code = capture.barcodes.first.rawValue;
//
//     if (code != null && code.isNotEmpty) {
//       Navigator.pushReplacement(
//         context,
//         MaterialPageRoute(
//           builder: (context) => AttendanceResultPage(qrData: code),
//         ),
//       );
//     }
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: const Text('Scan QR Code')),
//       body: MobileScanner(
//       // allowDuplicates: false,
//         onDetect: (capture) => _onDetect(capture, context),
//       ),
//     );
//   }
// }




import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'attendance_result_page.dart';

class QRScanPage extends StatefulWidget {
  const QRScanPage({super.key});

  @override
  State<QRScanPage> createState() => _QRScanPageState();
}

class _QRScanPageState extends State<QRScanPage> {
  bool _isScanning = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Scan QR Code'),
        backgroundColor: Color(0xFF14267C),
      ),
      body: Stack(
        children: [
          MobileScanner(
            controller: MobileScannerController(
              formats: [BarcodeFormat.qrCode],
              facing: CameraFacing.back,
            ),
            onDetect: (capture) {
              if (!_isScanning) return;

              final List<Barcode> barcodes = capture.barcodes;
              if (barcodes.isNotEmpty) {
                final String? code = barcodes.first.rawValue;

                if (code != null) {
                  setState(() {
                    _isScanning = false;
                  });


                  showDialog(
                    context: context,
                    builder: (_) => AlertDialog(
                      title: Text('QR Code Found!'),
                      content: Text(code),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.pop(context);
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => AttendanceResultPage(qrData: code),
                              ),
                            );
                          },
                          child: Text('Mark Attendance'),
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => AttendanceResultPage(qrData: code),
                              ),
                            );                          },
                          child: Text('Cancel'),
                        ),
                      ],
                    ),
                  );
                }
              }
            },
          ),

          Align(
            alignment: Alignment.topCenter,
            child: Container(
              margin: EdgeInsets.all(20),
              child: Text(
                'Align QR code within the box',
                style: TextStyle(color: Colors.white, fontSize: 16),
              ),
            ),
          ),
        ],
      ),
    );
  }
}