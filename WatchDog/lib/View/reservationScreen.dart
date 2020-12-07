import 'package:flutter/material.dart';
import 'package:flutter_login_page_ui/Controller/reservationController.dart';
import 'package:flutter_login_page_ui/Entity/profile.dart';
import 'changePetScreen.dart';
import '../Entity/infoPlace.dart';
import '../Entity/pet.dart';

class ReservationScreen extends StatefulWidget {
  final InfoPlace infoPlace;
  final Profile profile;
  final String heure;
  final String date;
  final List<Pet> pet;
  final List<Profile> profilelist;

  ReservationScreen(
      {Key key,
      @required this.infoPlace,
      @required this.pet,
      @required this.profile,
      @required this.heure,
      @required this.date,
      @required this.profilelist})
      : super(key: key);

  @override
  _Reservation createState() => _Reservation();
}

class _Reservation extends State<ReservationScreen> {
  int index = 0;
  List<Pet> pet = [];

  final ReservationService _reservation = ReservationService();

  void indexChange(result) {
    setState(() {
      index = result;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Rendez-Vous'),
      ),
      body: ListView(
        children: <Widget>[
          Column(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(left: 15.0),
              ),
              buildImages(),
              buildInfoDetail(),
              buildScroll(),
              Container(
                decoration: const BoxDecoration(
                  border: Border(
                    top: BorderSide(
                      width: 5,
                      color: Colors.blue,
                    ),
                    left: BorderSide(
                      width: 5,
                      color: Colors.blue,
                    ),
                    right: BorderSide(
                      width: 5,
                      color: Colors.blue,
                    ),
                    bottom: BorderSide(
                      width: 5,
                      color: Colors.blue,
                    ),
                  ),
                ),
                child: buildInfo(),
              ),
              Container(
                margin: const EdgeInsets.only(top: 20),
                width: 400.0,
                height: 40.0,
                child: RaisedButton(
                    shape: new RoundedRectangleBorder(
                        borderRadius: new BorderRadius.circular(10.0)),
                    color: Colors.blue[400],
                    child: Text(
                      'Confirmer',
                      style: TextStyle(color: Colors.white),
                    ),
                    onPressed: () {
                      _reservation.createReservation(
                          widget.pet[index].firstname,
                          widget.infoPlace.name,
                          widget.profile.firstname,
                          widget.profile.name,
                          widget.heure,
                          widget.date,
                          widget.infoPlace.placeID);
                      Navigator.of(context).pop();
                    }),
              ),
            ],
          )
        ],
      ),
    );
  }

  Widget buildImages() {
    return Padding(
      padding: EdgeInsets.only(top: 15.0, left: 15.0, right: 15.0),
      child: Container(
        height: 200.0,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15.0),
            image: DecorationImage(
                image: NetworkImage(widget.infoPlace.img), fit: BoxFit.cover)),
      ),
    );
  }

  Widget buildInfo() {
    return Padding(
      padding:
          EdgeInsets.only(top: 15.0, left: 15.0, right: 15.0, bottom: 15.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Text(
            "Votre animal",
            style: TextStyle(
                fontWeight: FontWeight.bold,
                fontFamily: 'Montserrat',
                fontSize: 30.0),
          ),
          SizedBox(
            height: 40.0,
            width: 20,
          ),
          Hero(
            tag: 'assets/background.jpg',
            child: Container(
              height: 125.0,
              width: 125.0,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(62.5),
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: NetworkImage(widget.pet[index].img),
                ),
              ),
            ),
          ),
          SizedBox(
            height: 5.0,
            width: 20,
          ),
          RaisedButton(
              shape: new RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(10.0)),
              color: Colors.blue[400],
              child: Text(
                'Change',
                style: TextStyle(color: Colors.white),
              ),
              onPressed: () async {
                var result = await Navigator.push(
                    context,
                    new MaterialPageRoute(
                      builder: (BuildContext context) => new ChangePetScreen(
                        pet: widget.pet,
                        profile: widget.profile,
                      ),
                    ));
                return this.indexChange(result);
              }),
          SizedBox(
            height: 5.0,
            width: 20,
          ),
          Text(
            "Nom : " + widget.pet[index].firstname,
            textAlign: TextAlign.left,
            overflow: TextOverflow.fade,
            style: TextStyle(
                color: Colors.black, fontFamily: 'Montserrat', fontSize: 15.0),
            softWrap: true,
          ),
          Text(
            "Race : " + widget.pet[index].race,
            textAlign: TextAlign.left,
            overflow: TextOverflow.fade,
            style: TextStyle(
                color: Colors.black, fontFamily: 'Montserrat', fontSize: 15.0),
            softWrap: true,
          ),
        ],
      ),
    );
  }

  Widget buildInfoDetail() {
    return Padding(
      padding:
          EdgeInsets.only(left: 25.0, right: 15.0, top: 30.0, bottom: 15.0),
      child: Row(
        children: <Widget>[
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                widget.infoPlace.name,
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Montserrat',
                    fontSize: 30.0),
              ),
              SizedBox(
                height: 40.0,
                width: 20,
              ),
              Container(
                width: 350,
                child: Text(
                  widget.infoPlace.description,
                  overflow: TextOverflow.ellipsis,
                  maxLines: 5,
                  style: TextStyle(
                      color: Colors.black,
                      fontFamily: 'Montserrat',
                      fontSize: 15.0),
                ),
              ),
              SizedBox(width: 4.0),
              Text(
                'Horraire :' +
                    " " +
                    widget.infoPlace.opening +
                    " " +
                    "-" +
                    " " +
                    widget.infoPlace.closure,
                style: TextStyle(
                    color: Colors.black,
                    fontFamily: 'Montserrat',
                    fontSize: 15.0),
              )
            ],
          ),
        ],
      ),
    );
  }

  Widget buildScroll() {
    return Container(
        height: 100.0,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: widget.profilelist.length,
          itemBuilder: (context, index) => Card(
            child: Container(
              width: 100.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  CircleAvatar(
                    backgroundImage:
                        NetworkImage(widget.profilelist[index].img),
                  ),
                  Text(widget.profilelist[index].firstname),
                ],
              ),
            ),
          ),
        ));
  }
}
