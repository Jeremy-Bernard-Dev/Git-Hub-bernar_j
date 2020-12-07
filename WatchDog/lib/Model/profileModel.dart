import 'package:cloud_firestore/cloud_firestore.dart';
import '../Controller/authController.dart';
import '../Entity/profile.dart';

class ProfileModel {
  final AuthService _auth = AuthService();
  final database = Firestore.instance;

  addProfile(email, name, firstname, age, sexe) async {
    dynamic userID = await _auth.getUserId();
    await database.collection("user").document(userID).setData({
      'userID': userID,
      'email': email,
      'name': name,
      'firstname': firstname,
      'age': age,
      'sexe': sexe,
      'petNumber': 0,
      'img':
          "https://firebasestorage.googleapis.com/v0/b/watchdog-b2c02.appspot.com/o/ProfilBase?alt=media&token=ede0b7d0-e526-46de-920e-52cab6687f10"
    });
  }

  initProfil() async {
    dynamic userID = await _auth.getUserId();
    dynamic result;
    await database
        .collection("user")
        .where('userID', isEqualTo: userID)
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        result = queryResult.data;
      });
    });
    Profile profile = new Profile(
        result["name"],
        result["firstname"],
        result["email"],
        result["sexe"],
        result["age"],
        result["petNumber"],
        result["userID"],
        result["img"]);
    return (profile);
  }

  initProfilWithID(userID) async {
    dynamic result;
    await database
        .collection("user")
        .where('userID', isEqualTo: userID)
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        result = queryResult.data;
      });
    });
    Profile profile = new Profile(
        result["name"],
        result["firstname"],
        result["email"],
        result["sexe"],
        result["age"],
        result["petNumber"],
        result["userID"],
        result["img"]);
    return (profile);
  }

  initProfilWithID2(userID) async {
    dynamic result;
    await database
        .collection("user")
        .orderBy('name')
        .where('userID', isEqualTo: userID)
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        result = queryResult.data;
      });
    });
    Profile profile = new Profile(
        result["name"],
        result["firstname"],
        result["email"],
        result["sexe"],
        result["age"],
        result["petNumber"],
        result["userID"],
        result["img"]);
    return (profile);
  }
}
