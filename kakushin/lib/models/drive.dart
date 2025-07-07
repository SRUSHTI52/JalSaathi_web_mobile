// models/drive.dart
class Drive {
  final String title;
  final String location;
  final String date;
  final String organization;

  Drive({
    required this.title,
    required this.location,
    required this.date,
    required this.organization,
  });

  factory Drive.fromJson(Map<String, dynamic> json) {
    return Drive(
      title: json['title'],
      location: json['location'],
      date: json['date'],
      organization: json['organization'],
    );
  }
  @override
  String toString() {
    return 'Drive(title: $title, location: $location, date: $date)';
  }
}
