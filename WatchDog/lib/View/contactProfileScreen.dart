import 'package:flutter/material.dart';
import '../Controller/petController.dart';
import '../Controller/reservationController.dart';
import '../Entity/profile.dart';
import '../Entity/pet.dart';
import '../Entity/reservation.dart';

class ContactProfileScreen extends StatefulWidget {
  final Profile profile;

  ContactProfileScreen({
    Key key,
    @required this.profile,
  }) : super(key: key);

  @override
  _ContactProfileState createState() => new _ContactProfileState();
}

class _ContactProfileState extends State<ContactProfileScreen> {
  final PetService _pet = PetService();
  final ReservationService _reservation = ReservationService();

  List<Pet> petlist = [];
  List<Reservation> reservationlist = [];

  @override
  void initState() {
    init();
    super.initState();
  }

  void init() async {
    List<Pet> getPet = await _pet.getPetContact(widget.profile.userID);
    List<Reservation> getReservation =
        await _reservation.getReservationWithId(widget.profile.userID);
    setState(() {
      this.petlist = getPet;
      this.reservationlist = getReservation;
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
      ),
      body: ListView(
        children: <Widget>[
          SizedBox(height: 10),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Container(
                height: 125.0,
                width: 125.0,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(62.5),
                    image: DecorationImage(
                        image: NetworkImage(widget.profile.img),
                        fit: BoxFit.cover)),
              ),
              SizedBox(height: 25.0),
              Text(
                widget.profile.firstname +
                    ", " +
                    widget.profile.age +
                    " " +
                    widget.profile.sexe,
                style: TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 4.0),
              Text(
                'Animaux : ' + widget.profile.petNumber.toString(),
                style: TextStyle(fontFamily: 'Montserrat', color: Colors.grey),
              ),
              buildContenus("Animaux"),
              buildScrollAnimal(),
              buildContenus("Réservation"),
              buildScrollReservation(),
            ],
          )
        ],
      ),
    );
  }

  Widget buildScrollAnimal() {
    return Container(
        height: 160.0,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: petlist.length,
          itemBuilder: (context, index) => Card(
            child: Container(
              width: 160.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  CircleAvatar(
                    backgroundImage: NetworkImage(petlist[index].img),
                  ),
                  Text('Name : ' + petlist[index].firstname),
                  Text('Race: ' + petlist[index].race),
                  Text('Age : ' + petlist[index].age),
                ],
              ),
            ),
          ),
        ));
  }

  Widget buildScrollReservation() {
    return Container(
        height: 140.0,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: reservationlist.length,
          itemBuilder: (context, index) => Card(
            child: Container(
              width: 160.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Text('Park : ' + reservationlist[index].lieu),
                  Text('Date: ' + reservationlist[index].date),
                  Text('Heure : ' + reservationlist[index].heure),
                ],
              ),
            ),
          ),
        ));
  }

  Widget buildContenus(pcontext) {
    return Padding(
      padding:
          EdgeInsets.only(left: 25.0, right: 25.0, top: 10.0, bottom: 15.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                pcontext + ":",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Montserrat',
                    fontSize: 15.0),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
