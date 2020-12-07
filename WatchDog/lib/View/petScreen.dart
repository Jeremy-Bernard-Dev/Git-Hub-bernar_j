import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login_page_ui/Entity/pet.dart';
import '../Entity/profile.dart';
import '../Controller/petController.dart';
import '../Controller/petController.dart';
import 'addPetScreen.dart';
import 'settingsPet.dart';

class PetScreen extends StatefulWidget {
  final Profile profile;

  PetScreen({
    Key key,
    @required this.profile,
  }) : super(key: key);

  @override
  _PetState createState() => _PetState();
}

class _PetState extends State<PetScreen> {
  final PetService _pet = PetService();

  Stream<QuerySnapshot> pet;

  @override
  void initState() {
    _pet.getpetlist().then((val) {
      setState(() {
        pet = val;
      });
    });
    super.initState();
  }

  Widget petList() {
    return StreamBuilder(
      stream: pet,
      builder: (context, snapshot) {
        return snapshot.hasData
            ? ListView.builder(
                itemCount: snapshot.data.documents.length,
                itemBuilder: (context, index) {
                  return Padding(
                    padding:
                        EdgeInsets.symmetric(vertical: 0.0, horizontal: 40.0),
                    child: Card(
                      shape: new RoundedRectangleBorder(
                          borderRadius: new BorderRadius.circular(10.0)),
                      child: ListTile(
                        title: Text(
                            snapshot.data.documents[index].data['firstname'],
                            style: Theme.of(context).textTheme.title),
                        subtitle: Text(
                            snapshot.data.documents[index].data['race'],
                            style: Theme.of(context).textTheme.title),
                        leading: CircleAvatar(
                          backgroundImage: NetworkImage(
                              snapshot.data.documents[index].data['img']),
                        ),
                        trailing: IconButton(
                          icon: Icon(Icons.create),
                          onPressed: () async {
                            Pet pet = await _pet.getPetlWithID(
                                snapshot.data.documents[index].data['petID']);
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (BuildContext context) =>
                                        SettingsPetScreen(pet: pet)));
                          },
                        ),
                      ),
                    ),
                  );
                })
            : Container();
      },
    );
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mes animaux'),
      ),
      body: Stack(children: <Widget>[
        petList(),
        Column(
          mainAxisAlignment: MainAxisAlignment.end,
          crossAxisAlignment: CrossAxisAlignment.values[3],
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(top: 20, left: 30, bottom: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  FloatingActionButton.extended(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (BuildContext context) =>
                                  AddPetScreen()));
                    },
                    icon: Icon(Icons.pets),
                    label: Text("Ajouter un animal"),
                  ),
                ],
              ),
            ),
          ],
        )
      ]),
    );
  }
}
