import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login_page_ui/Entity/reservation.dart';
import '../Entity/profile.dart';
import '../Controller/reservationController.dart';

class ReservationListScreen extends StatefulWidget {
  final Profile profile;
  final List<Reservation> reservation;

  ReservationListScreen(
      {Key key, @required this.profile, @required this.reservation})
      : super(key: key);

  @override
  _ReservationListState createState() => _ReservationListState();
}

class _ReservationListState extends State<ReservationListScreen> {
  final ReservationService _reservation = ReservationService();

  Stream<QuerySnapshot> reservationlist;


  @override
  void initState() {
    _reservation.getreservationlist().then((reservationl) {
      setState(() {
        reservationlist = reservationl;
      });
    });
    super.initState();
  }

  Widget reservationentempsreel() {
    return StreamBuilder(
    stream: reservationlist,
    builder: (context, snapshot) {
      return snapshot.hasData
          ? ListView.builder(
            itemCount: snapshot.data.documents.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: EdgeInsets.symmetric(vertical: 0.0, horizontal: 40.0),
                child: Card(
                  shape: new RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(10.0)),
                  child: ListTile(
                    title: Text(snapshot.data.documents[index].data['lieu'],
                        style: Theme.of(context).textTheme.title),
                    subtitle: Text(
                        snapshot.data.documents[index].data['date'] +
                            " " +
                            snapshot.data.documents[index].data['heure'] +
                            " " +
                            snapshot.data.documents[index].data['pet'],
                        style: Theme.of(context).textTheme.title),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () async {
                        return _showDialog(snapshot.data.documents[index].data['placeID'],
                            snapshot.data.documents[index].data['date'], snapshot.data.documents[index].data['heure']);
                      },
                    ),
                  ),
                ),
              );
            })
            : Container();
    });
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('Mes réservations'),
      ),
      body: Stack(children: <Widget>[
        reservationentempsreel(),
      ]),
    );
  }

  void _showDialog(placeID, date, heure) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: new Text("Supprimer"),
          content:
              new Text("Êtes-vous sure de vouloir annuler votre réservation ?"),
          actions: <Widget>[
            new FlatButton(
              child: new Text("Non"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            new FlatButton(
              child: new Text("Oui"),
              onPressed: () {
                _reservation.deleteReservation(placeID, date, heure);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
