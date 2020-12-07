import 'package:flutter/widgets.dart';
import 'package:image_picker/image_picker.dart';

import 'package:flutter/material.dart';
import '../Entity/pet.dart';
import '../Controller/petController.dart';
import '../Controller/profileController.dart';

class SettingsPetScreen extends StatefulWidget {
  final Pet pet;

  SettingsPetScreen({
    Key key,
    @required this.pet,
  }) : super(key: key);

  @override
  _SettingsPetState createState() => new _SettingsPetState();
}

class _SettingsPetState extends State<SettingsPetScreen> {
  final PetService _pet = PetService();
  final ProfileService _profile = ProfileService();
  final _formkey = GlobalKey<FormState>();

  var textfirstname = TextEditingController();
  var textage = TextEditingController();
  var textrace = TextEditingController();
  var textdescription = TextEditingController();

  DecorationImage pp;

  String _image = "";

  String firstname = '';
  String age = '';
  String race = '';
  String description = '';
  String error = '';

  @override
  void initState() {
    init();
    super.initState();
  }

  void init() async {
    setState(() {
      this._image = widget.pet.img;
      this.firstname = widget.pet.firstname;
      this.age = widget.pet.age;
      this.race = widget.pet.race;
      this.description = widget.pet.description;
      textfirstname.text = firstname;
      textage.text = age;
      textrace.text = race;
      textdescription.text = description;
      this.pp = DecorationImage(image: NetworkImage(_image), fit: BoxFit.cover);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue[400],
        elevation: 0.0,
        title: Text(widget.pet.firstname),
      ),
      body: Container(
          padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
          child: Form(
            key: _formkey,
            child: SingleChildScrollView(
              child: Column(
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
                      image: pp,
                    ),
                  ),
                  SizedBox(height: 20.0),
                  TextFormField(
                      controller: textfirstname,
                      decoration: InputDecoration(
                        labelText: 'Prénom',
                      ),
                      onChanged: (val) {
                        setState(() => firstname = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      controller: textage,
                      decoration: InputDecoration(
                        labelText: 'Age',
                      ),
                      keyboardType: TextInputType.number,
                      onChanged: (val) {
                        setState(() => age = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      controller: textrace,
                      decoration: InputDecoration(
                        labelText: 'Race',
                      ),
                      onChanged: (val) {
                        setState(() => race = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      controller: textdescription,
                      decoration: InputDecoration(
                        labelText: 'Description (facultatif)',
                      ),
                      onChanged: (val) {
                        setState(() => description = val);
                      }),
                  Container(
                    margin: const EdgeInsets.only(top: 50),
                    width: 400.0,
                    height: 40.0,
                    child: RaisedButton(
                        shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(10.0)),
                        color: Colors.blue[400],
                        child: Text(
                          'Enregistrer',
                          style: TextStyle(color: Colors.white),
                        ),
                        onPressed: () async {
                          if (_formkey.currentState.validate()) {
                            _pet.changePet(widget.pet.petID, firstname, age,
                                race, description, _image, widget.pet.img);
                            Navigator.pop(context);
                          }
                        }),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 20),
                    width: 400.0,
                    height: 40.0,
                    child: RaisedButton(
                        shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(10.0)),
                        color: Colors.red,
                        child: Text(
                          'Supprimer',
                          style: TextStyle(color: Colors.white),
                        ),
                        onPressed: () async {
                          return _showDialog();
                        }),
                  ),
                  SizedBox(height: 12.0),
                  Text(
                    error,
                    style: TextStyle(color: Colors.red, fontSize: 14.0),
                  ),
                ],
              ),
            ),
          )),
    );
  }

  uploadImage() async {
    final _picker = ImagePicker();
    PickedFile image;

    image = await _picker.getImage(source: ImageSource.gallery);

    if (image != null) {
      setState(() {
        pp = DecorationImage(
          image: new AssetImage(image.path),
          fit: BoxFit.cover,
        );
        _image = image.path;
      });
    } else {
      print('No Path Received');
    }
  }

  void _showDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: new Text("Supprimer"),
          content: new Text(
              "Êtes-vous sure de vouloir enlever cet animal de votre liste ?"),
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
                _pet.deletepet(widget.pet.petID);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
