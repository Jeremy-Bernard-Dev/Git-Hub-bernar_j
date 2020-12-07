import 'package:flutter/material.dart';
import '../Entity/infoPlace.dart';
import '../Entity/planning.dart';
import '../Entity/pet.dart';
import '../Entity/profile.dart';
import 'reservationScreen.dart';
import 'package:intl/intl.dart';
import '../Controller/petController.dart';
import '../Controller/profileController.dart';
import '../Controller/reservationController.dart';

class PlanningScreen extends StatefulWidget {
  final InfoPlace infoPlace;

  PlanningScreen({Key key, @required this.infoPlace}) : super(key: key);

  @override
  _PlanningState createState() => _PlanningState();
}

class _PlanningState extends State<PlanningScreen> {
  final PetService _pet = PetService();
  List<Pet> pet = [];
  final ProfileService _profile = ProfileService();
  final ReservationService _reservation = ReservationService();
  var today = new DateTime.now();

  List<Planning> plannings = [
    Planning(hour: '9h00', activity: ''),
    Planning(hour: '10h00', activity: ''),
    Planning(hour: '11h00', activity: ''),
    Planning(hour: '12h00', activity: ''),
    Planning(hour: '13h00', activity: ''),
    Planning(hour: '14h00', activity: ''),
    Planning(hour: '15h00', activity: ''),
    Planning(hour: '16h00', activity: ''),
    Planning(hour: '17h00', activity: ''),
    Planning(hour: '18h00', activity: ''),
  ];

  void petList(petlist, profile) {
    if (petlist.isEmpty) {
      setState(() {
        pet = [
          Pet(' ', ' ', profile.userID, ' ', ' ', ' ', ' '),
        ];
      });
    } else {
      setState(() {
        pet = petlist;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    var date = (DateFormat("dd-MM-yyyy").format(today)).toString();
    return new Scaffold(
      appBar: AppBar(
        title: Text(widget.infoPlace.name),
      ),
      body: Stack(
        children: <Widget>[
          ListView.builder(
              padding: EdgeInsets.symmetric(vertical: 60.0, horizontal: 00.0),
              itemCount: plannings.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding:
                      EdgeInsets.symmetric(vertical: 0.0, horizontal: 40.0),
                  child: Card(
                    child: ListTile(
                      onTap: () async {
                        List<Pet> petlist = await _pet.getPet();
                        List<Profile> profileList =
                            await _reservation.getPersonPlace(
                                widget.infoPlace.placeID,
                                plannings[index].hour,
                                date);
                        Profile profile = await _profile.getProfil();
                        Navigator.of(context).pop();
                        Navigator.push(
                            context,
                            new MaterialPageRoute(
                                builder: (BuildContext context) =>
                                    new ReservationScreen(
                                      infoPlace: widget.infoPlace,
                                      pet: pet,
                                      profile: profile,
                                      heure: plannings[index].hour,
                                      date: date,
                                      profilelist: profileList,
                                    )));
                        return this.petList(petlist, profile);
                      },
                      title: Text(plannings[index].hour,
                          // ignore: deprecated_member_use
                          style: Theme.of(context).textTheme.title),
                      subtitle: Text(plannings[index].activity,
                          // ignore: deprecated_member_use
                          style: Theme.of(context).textTheme.title),
                    ),
                  ),
                );
              }),
          Container(
            height: 60,
            color: Colors.white,
            child: Text(
              date,
              textAlign: TextAlign.center,
              style: TextStyle(height: 2.5, fontSize: 20),
            ),
            alignment: Alignment(0, -1.0),
          ),
          Container(
            child: IconButton(
              icon: Icon(Icons.arrow_right),
              color: Colors.blue,
              iconSize: 50,
              onPressed: () {
                addDate();
              },
            ),
            alignment: Alignment(0.5, -1),
          ),
          Container(
            child: IconButton(
              icon: Icon(Icons.arrow_left),
              color: Colors.blue,
              iconSize: 50,
              onPressed: () {
                removeDate();
              },
            ),
            alignment: Alignment(-0.5, -1),
          ),
        ],
      ),
    );
  }

  void addDate() {
    var fiftyDaysFromNow = today.add(new Duration(days: 1));
    setState(() {
      today = fiftyDaysFromNow;
    });
  }

  void removeDate() {
    var fiftyDaysFromNow = today.add(new Duration(days: -1));
    setState(() {
      today = fiftyDaysFromNow;
    });
  }
}

abstract class ListItem {
  Widget buildTitle(BuildContext context);
  Widget buildSubtitle(BuildContext context);
}

class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);

  Widget buildTitle(BuildContext context) {
    return Text(
      heading,
      style: Theme.of(context).textTheme.headline5,
    );
  }

  Widget buildSubtitle(BuildContext context) => null;
}
