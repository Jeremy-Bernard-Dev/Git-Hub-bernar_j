import '../Controller/authController.dart';
import '../Entity/reservation.dart';
import '../Entity/profile.dart';
import '../Model/reservationModel.dart';

class ReservationService {
  final ReservationModel model = ReservationModel();
  final AuthService _auth = AuthService();

  createReservation(pet, lieu, firstname, name, heure, date, placeID) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.addReservation(
          pet, lieu, firstname, name, heure, date, placeID);
    }
  }

  deleteReservation(placeID, date, heure) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.deleteReservation(placeID, date, heure);
    }
  }

  getPersonPlace(placeID, heure, date) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      List<Profile> profilePersonPlace =
          await model.initPersonPlace(placeID, heure, date);
      return (profilePersonPlace);
    }
  }

  getReservation() async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      List<Reservation> contact = await model.initReservation();
      return (contact);
    }
  }

  getReservationWithId(userID) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      List<Reservation> contact = await model.initReservationWithId(userID);
      return (contact);
    }
  }

  getreservationlist() async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      return model.getreservationlist();
    }
  }
}
