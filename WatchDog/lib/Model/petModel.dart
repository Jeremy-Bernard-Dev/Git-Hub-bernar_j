import 'dart:io';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../Controller/authController.dart';
import '../Controller/profileController.dart';
import '../Entity/pet.dart';
import '../Entity/profile.dart';

class PetModel {
  final AuthService _auth = AuthService();
  final ProfileService _profile = ProfileService();
  final database = Firestore.instance;
  final _storage = FirebaseStorage.instance;

  addPet(firstname, age, race, description, image) async {
    Profile profile = await _profile.getProfil();
    dynamic userID = await _auth.getUserId();
    DocumentReference documentReference = database
        .collection("Animaux")
        .document(userID)
        .collection("Pet")
        .document();
    var file = File(image);

    var snapshot = await _storage
        .ref()
        .child(userID + '/Pets/' + documentReference.documentID)
        .putFile(file)
        .onComplete;

    var downloadUrl = await snapshot.ref.getDownloadURL();

    await documentReference.setData({
      'ownerID': userID,
      'firstname': firstname,
      'age': age,
      'race': race,
      'description': description,
      'petID': documentReference.documentID,
      'img': downloadUrl,
    });
    await database
        .collection("user")
        .document(userID)
        .updateData({'petNumber': profile.petNumber + 1});
  }

  initPet() async {
    dynamic userID = await _auth.getUserId();
    List<Pet> pet = [];
    await database
        .collection("Animaux")
        .document(userID)
        .collection("Pet")
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        Pet result = new Pet(
          queryResult.data["firstname"],
          queryResult.data["description"],
          queryResult.data["ownerID"],
          queryResult.data["age"],
          queryResult.data["race"],
          queryResult.data["petID"],
          queryResult.data["img"],
        );
        pet.add(result);
      });
    });
    return (pet);
  }

  initPetContact(userID) async {
    List<Pet> pet = [];
    await database
        .collection("Animaux")
        .document(userID)
        .collection("Pet")
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        Pet result = new Pet(
          queryResult.data["firstname"],
          queryResult.data["description"],
          queryResult.data["ownerID"],
          queryResult.data["age"],
          queryResult.data["race"],
          queryResult.data["petID"],
          queryResult.data["img"],
        );
        pet.add(result);
      });
    });
    return (pet);
  }

  initPetlWithID(petID) async {
    dynamic userID = await _auth.getUserId();
    dynamic result;
    await database
        .collection("Animaux")
        .document(userID)
        .collection("Pet")
        .where('petID', isEqualTo: petID)
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        result = queryResult.data;
      });
    });
    Pet pet = new Pet(
        result["firstname"],
        result["description"],
        result["ownerID"],
        result["age"],
        result["race"],
        result["petID"],
        result["img"]);
    return (pet);
  }

  updatePet(petID, firstname, age, race, description, image, imgBase) async {
    dynamic userID = await _auth.getUserId();
    var file = File(image);

    if (image != imgBase) {
      var snapshot = await _storage
          .ref()
          .child(userID + '/Pets/' + petID)
          .putFile(file)
          .onComplete;

      var downloadUrl = await snapshot.ref.getDownloadURL();

      await database
          .collection("Animaux")
          .document(userID)
          .collection("Pet")
          .document(petID)
          .updateData({
        'img': downloadUrl,
      });
    }
    await database
        .collection("Animaux")
        .document(userID)
        .collection("Pet")
        .document(petID)
        .updateData({
      'firstname': firstname,
      'age': age,
      'race': race,
      'description': description,
    });
  }

  deletepet(petID) async {
    dynamic userID = await _auth.getUserId();
    Profile profile = await _profile.getProfil();
    await database
        .collection("Animaux")
        .document(userID)
        .collection("Pet")
        .document(petID)
        .delete();
    await database
        .collection("user")
        .document(userID)
        .updateData({'petNumber': profile.petNumber - 1});
    final StorageReference firebaseStorageRef =
        _storage.ref().child(userID + '/Pets/' + petID);
    try {
      await firebaseStorageRef.delete();
      return true;
    } catch (e) {
      return e.toString();
    }
  }
    getpetlist() async {
    dynamic userID = await _auth.getUserId();
    return database
        .collection("Animaux")
        .document(userID)
        .collection("Pet")
        .snapshots();
  }
}
