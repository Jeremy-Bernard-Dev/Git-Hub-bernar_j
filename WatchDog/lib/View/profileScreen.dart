import 'dart:io';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/widgets.dart';
import 'package:image_picker/image_picker.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:flutter/material.dart';
import 'package:flutter_login_page_ui/Controller/reservationController.dart';
import '../Entity/profile.dart';
import '../Entity/reservation.dart';
import '../Controller/petController.dart';
import '../Controller/profileController.dart';
import '../Controller/imgController.dart';
import '../Controller/reservationController.dart';
import 'reservationListScreen.dart';
import 'petScreen.dart';

///////////////////////////////////////////////////
import 'AdminPage/addPlace.dart';
//////////////////////////////////////////////////

class ProfileScreen extends StatefulWidget {
  final Profile profile;

  ProfileScreen(
      {Key key,
      @required this.profile})
      : super(key: key);

  @override
  _ProfileState createState() => new _ProfileState();
}

class _ProfileState extends State<ProfileScreen> {
  final ProfileService _profile = ProfileService();
  final PetService _pet = PetService();
  final ImgService _img = ImgService();
  final ReservationService _reservation = ReservationService();

  @override
  void initState() {
    init();
    _pet.getpetlist().then((petl) {
      setState(() {
        petlist = petl;
      });
    });
    _reservation.getreservationlist().then((reservationl) {
      setState(() {
        reservationlist = reservationl;
      });
    });
    super.initState();
  }

  void init() async {
    Profile getprofile = await _profile.getProfil();
    setState(() {
      this._image = getprofile.img;
      this.petnb = getprofile.petNumber;
    });
  }

  Stream<QuerySnapshot> petlist;
  Stream<QuerySnapshot> reservationlist;


  String _image = "";
  int petnb = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
      ),
      // appBar: new AppBar(
      //   title: new Text('Profil'),
      //   actions: <Widget>[
      //     IconButton(
      //         icon: Icon(Icons.settings),
      //         onPressed: () {
      //           Navigator.of(context).pop();
      //           Navigator.push(
      //               context,
      //               new MaterialPageRoute(
      //                   builder: (BuildContext context) =>
      //                       new AddPlaceScreen()));
      //         }),
      //     Container(
      //       width: 15,
      //       height: 15,
      //       alignment: Alignment.topRight,
      //       margin: EdgeInsets.only(top: 5),
      //     ),
      //   ],
      // ),
      body: ListView(
        children: <Widget>[
          SizedBox(height: 10),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.photo_camera),
                onPressed: () => uploadImage(),
              ),
              Container(
                height: 125.0,
                width: 125.0,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(62.5),
                    image: DecorationImage(
                        image: NetworkImage(_image), fit: BoxFit.cover)),
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
                'Animaux : ' + petnb.toString(),
                style: TextStyle(fontFamily: 'Montserrat', color: Colors.grey),
              ),
              buildAddAnimal(),
              buildContenus("Animaux"),
              buildScrollAnimal(),
              buildContenus("Réservation(s)"),
              buildScrollReservation(),
            ],
          )
        ],
      ),
    );
  }

  Widget buildScrollAnimal() {
    return StreamBuilder(
      stream: petlist,
      builder: (context, snapshot) {
        return snapshot.hasData
            ? Container(
        height: 160.0,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: snapshot.data.documents.length,
          itemBuilder: (context, index) => Card(
            child: Container(
              width: 160.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  CircleAvatar(
                    backgroundImage: NetworkImage(snapshot.data.documents[index].data['img']),
                  ),
                  Text('Name : ' + snapshot.data.documents[index].data['firstname']),
                  Text('Race: ' + snapshot.data.documents[index].data['race']),
                  Text('Age : ' + snapshot.data.documents[index].data['age']),
                ],
              ),
            ),
          ),
        ))
        : Container();
      });
  }

  Widget buildScrollReservation() {
    return StreamBuilder(
      stream: reservationlist,
      builder: (context, snapshot) {
        return snapshot.hasData
            ? Container(
        height: 140.0,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: snapshot.data.documents.length,
          itemBuilder: (context, index) => Card(
            child: Container(
              width: 160.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Text('Park : ' + snapshot.data.documents[index].data['lieu']),
                  Text('Date: ' + snapshot.data.documents[index].data['date']),
                  Text('Heure : ' + snapshot.data.documents[index].data['heure']),
                ],
              ),
            ),
          ),
        ))
        : Container();
      });
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

  Widget buildAddAnimal() {
    return Padding(
      padding: EdgeInsets.only(top: 20, left: 50, right: 50, bottom: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Material(
            color: Colors.lightBlue,
            borderRadius: BorderRadius.circular(30.0),
            child: InkWell(
              splashColor: Colors.blue,
              onTap: () async {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (BuildContext context) => PetScreen(
                              profile: widget.profile,
                            )));
              },
              borderRadius: BorderRadius.circular(30.0),
              child: SizedBox(width: 56, height: 56, child: Icon(Icons.pets)),
            ),
          ),
          Material(
            color: Colors.lightBlue,
            borderRadius: BorderRadius.circular(30.0),
            child: InkWell(
              splashColor: Colors.blue,
              onTap: () async {
                List<Reservation> reservation =
                    await _reservation.getReservation();
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (BuildContext context) =>
                            ReservationListScreen(
                              profile: widget.profile,
                              reservation: reservation,
                            )));
              },
              borderRadius: BorderRadius.circular(30.0),
              child: SizedBox(
                  width: 56, height: 56, child: Icon(Icons.assignment)),
            ),
          ),
        ],
      ),
    );
  }

  uploadImage() async {
    final _storage = FirebaseStorage.instance;
    final _picker = ImagePicker();
    PickedFile image;

    image = await _picker.getImage(source: ImageSource.gallery);
    var file = File(image.path);

    if (image != null) {
      var snapshot = await _storage
          .ref()
          .child(widget.profile.userID + '/Profil')
          .putFile(file)
          .onComplete;

      var downloadUrl = await snapshot.ref.getDownloadURL();

      setState(() {
        _image = downloadUrl;
      });

      _img.changeImgProfile(downloadUrl);
    } else {
      print('No Path Received');
    }
  }
}
