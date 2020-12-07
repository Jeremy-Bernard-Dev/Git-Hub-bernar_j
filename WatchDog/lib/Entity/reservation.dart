class Reservation {
  final String userID;
  final String pet;
  final String lieu;
  final String placeID;
  final String firstname;
  final String name;
  final String heure;
  final String date;

  Reservation(this.userID, this.pet, this.lieu, this.placeID, this.firstname, this.name, this.heure, this.date);
}

class PersonLieu {
  final String userID;
  final String placeID;
  final String heure;
  final String date;

  PersonLieu(this.userID, this.placeID, this.date, this.heure);
}
