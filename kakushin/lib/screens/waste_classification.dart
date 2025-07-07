// waste_classifier.dart
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;

class WasteClassifierPage extends StatefulWidget {
  const WasteClassifierPage({super.key});

  @override
  State<WasteClassifierPage> createState() => _WasteClassifierPageState();
}

class _WasteClassifierPageState extends State<WasteClassifierPage> {
  String resultText = 'No prediction yet.';
  File? selectedImage;
  List<String> tips = [];

  Future<void> pickAndClassifyImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile == null) {
      setState(() => resultText = 'No image selected.');
      return;
    }

    setState(() {
      selectedImage = File(pickedFile.path);
      resultText = 'Processing...';
      tips = [];
    });

    var request = http.MultipartRequest(
      'POST',
      Uri.parse('http://192.168.131.171:8000/classify'),
    );
    request.files.add(await http.MultipartFile.fromPath('file', pickedFile.path));

    var response = await request.send();
    if (response.statusCode == 200) {
      var responseBody = await response.stream.bytesToString();
      var result = json.decode(responseBody);
      final label = result['prediction'];

      setState(() {
        resultText = 'Predicted: $label';
        tips = getDisposalTips(label);
      });
    } else {
      setState(() => resultText = 'Prediction failed: ${response.statusCode}');
    }
  }

  List<String> getDisposalTips(String label) {
    switch (label.toLowerCase()) {
      case 'cardboard':
        return [
          'Flatten the cardboard before disposing.',
          'Keep it dry and clean.',
          'Place in recycling bin or compost if allowed.'
        ];
      case 'plastic':
        return [
          'Rinse containers before disposal.',
          'Remove labels and caps.',
          'Recycle only marked plastics (1, 2, 5).'
        ];
      case 'glass':
        return [
          'Do not break the glass.',
          'Rinse before recycling.',
          'Sort by color if required.'
        ];
      default:
        return ['No specific disposal tips available.'];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Waste Classifier')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              selectedImage != null
                  ? Image.file(selectedImage!, height: 200)
                  : const Icon(Icons.image, size: 100),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: pickAndClassifyImage,
                child: const Text('Pick and Classify Image', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
              const SizedBox(height: 20),
              Text(resultText, textAlign: TextAlign.start,  style: TextStyle(fontSize: 20)),
              const SizedBox(height: 10),
              ...tips.map((tip) => Text('• $tip')).toList(),
            ],
          ),
        ),
      ),
    );
  }
}
