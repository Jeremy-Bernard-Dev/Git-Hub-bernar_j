import 'package:cloud_firestore/cloud_firestore.dart';
import '../Controller/authController.dart';
import '../Controller/profileController.dart';
import '../Entity/profile.dart';
import '../Entity/contact.dart';

class ContactModel {
  final AuthService _auth = AuthService();
  final database = Firestore.instance;
  final ProfileService _profile = ProfileService();

  addContact(firstname, name, contactID) async {
    dynamic userID = await _auth.getUserId();
    Profile profile = await _profile.getProfil();
    await database
        .collection("Contact")
        .document(userID)
        .collection("Friend")
        .add({
      'userID': userID,
      'firstname': firstname,
      'name': name,
      'contactID': contactID,
    });
    await database
        .collection("Contact")
        .document(contactID)
        .collection("Friend")
        .add({
      'userID': contactID,
      'firstname': profile.firstname,
      'name': profile.name,
      'contactID': userID,
    });
  }

  initContact() async {
    dynamic userID = await _auth.getUserId();
    List<Contact> contact = [];
    await database
        .collection("Contact")
        .document(userID)
        .collection("Friend")
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        Contact result = new Contact(
          queryResult.data["contactID"],
          queryResult.data["name"],
          queryResult.data["firstname"],
          queryResult.data["userID"],
        );
        contact.add(result);
      });
    });
    return (contact);
  }

  initContactProfil(firstname, name) async {
    List<Profile> contactProfile = [];
    await database
        .collection("user")
        .where('firstname', isEqualTo: firstname)
        .where('name', isEqualTo: name)
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        Profile result = new Profile(
            queryResult.data["name"],
            queryResult.data["firstname"],
            queryResult.data["email"],
            queryResult.data["sexe"],
            queryResult.data["age"],
            queryResult.data["petNumber"],
            queryResult.data["userID"],
            queryResult.data["img"]);
        contactProfile.add(result);
      });
    });
    return (contactProfile);
  }

    initcontactlist() async {
    dynamic userID = await _auth.getUserId();
    return database
        .collection("Contact")
        .document(userID)
        .collection("Friend")
        .orderBy('contactID', descending: true)
        .snapshots();
  }
  
}
