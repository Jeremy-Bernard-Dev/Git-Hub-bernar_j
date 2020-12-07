import 'package:flutter/widgets.dart';
import 'package:image_picker/image_picker.dart';

import 'package:flutter/material.dart';
import '../Entity/pet.dart';
import '../Entity/profile.dart';
import '../Controller/petController.dart';
import '../Controller/profileController.dart';

class SettingsProfileScreen extends StatefulWidget {
  final Profile profile;

  SettingsProfileScreen({
    Key key,
    @required this.profile,
  }) : super(key: key);

  @override
  _SettingsProofileState createState() => new _SettingsProofileState();
}

class _SettingsProofileState extends State<SettingsProfileScreen> {
  final PetService _pet = PetService();
  final ProfileService _profile = ProfileService();
  final _formkey = GlobalKey<FormState>();

  var textfirstname = TextEditingController();
  var textname = TextEditingController();
  var textage = TextEditingController();
  var textsexe = TextEditingController();

  DecorationImage pp;

  String _image = "";

  String firstname = '';
  String name = '';
  String age = '';
  String sexe = '';
  String error = '';

  bool _value1 = false;
  bool _value2 = false;

  @override
  void initState() {
    init();
    super.initState();
  }

  void init() async {
    setState(() {
      this._image = widget.profile.img;
      this.firstname = widget.profile.firstname;
      this.name = widget.profile.name;
      this.age = widget.profile.age;
      this.sexe = widget.profile.sexe;
      textfirstname.text = firstname;
      textname.text = name;
      textage.text = age;
      textsexe.text = sexe;
      this.pp = DecorationImage(image: NetworkImage(_image), fit: BoxFit.cover);
      genredef();
    });
  }

  void genredef(){
    if (widget.profile.sexe == '♂') {
      _value1 = true;
    } else if (widget.profile.sexe == '♀') {
      _value2 = true;
    }
  }

  void sexeMale(bool value) {
    setState(() {
      _value1 = value;
      sexe = "♂";
      _value2 = false;
    });
  }

  void sexeFemelle(bool value) {
    setState(() {
      _value2 = value;
      sexe = "♀";
      _value1 = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue[400],
        elevation: 0.0,
        title: Text(widget.profile.firstname),
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
                      controller: textname,
                      decoration: InputDecoration(
                        labelText: 'Nom',
                      ),
                      onChanged: (val) {
                        setState(() => name = val);
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
                  Text(
                    'Sexe :',
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 15.0),
                  ),
                  Row(children: [
                    Checkbox(value: _value1, onChanged: sexeMale),
                    Text("Homme"),
                    Checkbox(value: _value2, onChanged: sexeFemelle),
                    Text("Femme"),
                  ]),
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
                          // if (_formkey.currentState.validate()) {
                          //   _pet.changePet(widget.pet.petID, firstname, age,
                          //       race, description, _image, widget.pet.img);
                          //   Navigator.pop(context);
                          // }
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
}
