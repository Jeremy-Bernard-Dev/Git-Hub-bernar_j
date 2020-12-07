import 'package:cloud_firestore/cloud_firestore.dart';
import '../Controller/authController.dart';
import '../Controller/profileController.dart';
import '../Entity/profile.dart';
import '../Entity/reservation.dart';

class ReservationModel {
  final AuthService _auth = AuthService();
  final ProfileService _profile = ProfileService();
  final database = Firestore.instance;

  addReservation(pet, lieu, firstname, name, heure, date, placeID) async {
    dynamic userID = await _auth.getUserId();
    await database
        .collection("Réservation")
        .document(userID)
        .collection("Réservation")
        .document(placeID + heure + date)
        .setData({
      'userID': userID,
      'pet': pet,
      'lieu': lieu,
      'placeID': placeID,
      'firstname': firstname,
      'name': name,
      'heure': heure,
      'date': date,
    });
    await database
        .collection("Place")
        .document(placeID)
        .collection("PersonPlace")
        .document(userID + placeID + heure + date)
        .setData({
      'userID': userID,
      'placeID': placeID,
      'heure': heure,
      'date': date,
    });
  }

  deleteReservation(placeID, date, heure) async {
    dynamic userID = await _auth.getUserId();
    await database
        .collection("Réservation")
        .document(userID)
        .collection("Réservation")
        .document(placeID + heure + date)
        .delete();
    await database
        .collection("Place")
        .document(placeID)
        .collection("PersonPlace")
        .document(userID + placeID + heure + date)
        .delete();
  }

  initPersonPlace(placeID, heure, date) async {
    List<Profile> profilePersonPlace = [];
    await database
        .collection("Place")
        .document(placeID)
        .collection("PersonPlace")
        .where('heure', isEqualTo: heure)
        .where('date', isEqualTo: date)
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) async {
        PersonLieu result = new PersonLieu(
          queryResult.data["userID"],
          queryResult.data["placeID"],
          queryResult.data["heure"],
          queryResult.data["date"],
        );
        Profile personProfile = await _profile.getProfilWithID(result.userID);
        profilePersonPlace.add(personProfile);
      });
    });
    return (profilePersonPlace);
  }

  initReservation() async {
    dynamic userID = await _auth.getUserId();
    List<Reservation> contact = [];
    await database
        .collection("Réservation")
        .document(userID)
        .collection("Réservation")
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        Reservation result = new Reservation(
          queryResult.data["userID"],
          queryResult.data["pet"],
          queryResult.data["lieu"],
          queryResult.data["placeID"],
          queryResult.data["firstname"],
          queryResult.data["name"],
          queryResult.data["heure"],
          queryResult.data["date"],
        );
        contact.add(result);
      });
    });
    return (contact);
  }

  initReservationWithId(userID) async {
    List<Reservation> contact = [];
    await database
        .collection("Réservation")
        .document(userID)
        .collection("Réservation")
        .getDocuments()
        .then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        Reservation result = new Reservation(
          queryResult.data["userID"],
          queryResult.data["pet"],
          queryResult.data["lieu"],
          queryResult.data["placeID"],
          queryResult.data["firstname"],
          queryResult.data["name"],
          queryResult.data["heure"],
          queryResult.data["date"],
        );
        contact.add(result);
      });
    });
    return (contact);
  }

  getreservationlist() async {
    dynamic userID = await _auth.getUserId();
    return database
        .collection("Réservation")
        .document(userID)
        .collection("Réservation")
        .snapshots();
  }
}
