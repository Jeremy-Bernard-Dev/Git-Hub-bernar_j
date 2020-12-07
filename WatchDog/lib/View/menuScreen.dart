import 'package:flutter/material.dart';
import 'package:flutter_login_page_ui/Entity/reservation.dart';
import '../Controller/authController.dart';
import '../Controller/reservationController.dart';
import '../Controller/petController.dart';
import '../Controller/profileController.dart';
import '../Entity/profile.dart';
import '../Entity/pet.dart';
import 'loginScreen.dart';
import 'profileScreen.dart';
import 'contactScreen.dart';
import 'petScreen.dart';
import 'reservationListScreen.dart';
import 'messengerScreen.dart';

class MenuScreen extends StatefulWidget {
  final Profile profile;

  MenuScreen({Key key, @required this.profile}) : super(key: key);

  @override
  _MenuState createState() => _MenuState();
}

class _MenuState extends State<MenuScreen> {
  final PetService _pet = PetService();
  final ReservationService _reservation = ReservationService();
  final AuthService _auth = AuthService();
  final ProfileService _profile = ProfileService();

  @override
  void initState() {
    init();
    super.initState();
  }

  void init() async {
    Profile getprofile = await _profile.getProfil();
    setState(() {
      img = getprofile.img;
    });
  }

  String img = '';

  Widget _buildDrawerList() {
    return ListView(
      children: <Widget>[
        new ListTile(
          title: new Text('Profil'),
          leading: Icon(
            Icons.person,
            semanticLabel: 'Profil',
            color: Colors.blue,
          ), //face //tagfaces
          onTap: () async {
            Navigator.of(context).pop();
            Navigator.push(
                context,
                new MaterialPageRoute(
                    builder: (BuildContext context) => new ProfileScreen(
                          profile: widget.profile,
                        )));
          },
        ),
        new ListTile(
          title: new Text('Animaux'),
          leading: Icon(
            Icons.pets,
            semanticLabel: 'Animaux',
            color: Colors.blue,
          ),
          onTap: () async {
            List<Pet> pet = await _pet.getPet();
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (BuildContext context) => PetScreen(
                          profile: widget.profile,
                        )));
          },
        ),
        new ListTile(
          title: new Text('Réservations'),
          leading: Icon(
            Icons.assignment,
            semanticLabel: 'Réservations',
            color: Colors.blue,
          ), 
          onTap: () async {
            List<Reservation> reservation = await _reservation.getReservation();
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (BuildContext context) => ReservationListScreen(
                          profile: widget.profile,
                          reservation: reservation,
                        )));
          },
        ),
        new ListTile(
          title: new Text('Messagerie'),
          leading: Icon(
            Icons.chat,
            semanticLabel: 'Messagerie',
            color: Colors.blue,
          ),
          onTap: () async {
            Navigator.of(context).pop();
            Navigator.push(
                context,
                new MaterialPageRoute(
                    builder: (BuildContext context) => new MessengerScreen(
                          profile: widget.profile,
                        )));
          },
        ),
        new ListTile(
          title: new Text('Contacts'),
          leading: Icon(
            Icons.contacts,
            semanticLabel: 'Contacts',
            color: Colors.blue,
          ),
          onTap: () async {
            Navigator.of(context).pop();
            Navigator.push(
                context,
                new MaterialPageRoute(
                    builder: (BuildContext context) => new ContactScreen(
                          profile: widget.profile,
                        )));
          },
        ),
        new ListTile(
          title: new Text('Déconnexion'),
          leading: Icon(Icons.dashboard),
          onTap: () {
            _auth.logout();
            Navigator.of(context).pop();
            Navigator.of(context).pop();
            Navigator.push(
                context,
                new MaterialPageRoute(
                    builder: (BuildContext context) => new LoginScreen()));
          },
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(children: [
        UserAccountsDrawerHeader(
          currentAccountPicture: new CircleAvatar(
            backgroundImage: NetworkImage(img),
          ),
          accountName:
              Text(widget.profile.firstname + " " + widget.profile.name),
          accountEmail: Text(widget.profile.email),
        ),
        Expanded(child: _buildDrawerList())
      ]),
    );
  }
}
