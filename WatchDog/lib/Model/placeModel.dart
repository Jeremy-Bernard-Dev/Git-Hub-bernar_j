import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';

class PlaceModel {
  final database = Firestore.instance;
  final _storage = FirebaseStorage.instance;

  addPlace(closure, opening, day, name, description, latitude, longitude,
      image) async {
    DocumentReference documentReference = database.collection("Map").document();

    var file = File(image.path);

    var snapshot = await _storage
        .ref()
        .child("Place/" + documentReference.documentID + '/Image')
        .putFile(file)
        .onComplete;

    var downloadUrl = await snapshot.ref.getDownloadURL();

    String img = downloadUrl;

    documentReference.setData({
      'closure': closure,
      'opening': opening,
      'day': day,
      'name': name,
      'description': description,
      'latitude': latitude,
      'longitude': longitude,
      'placeID': documentReference.documentID,
      'img': img,
    });
  }
}
