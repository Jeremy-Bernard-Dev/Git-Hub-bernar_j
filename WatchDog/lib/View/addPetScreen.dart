import 'package:flutter/widgets.dart';
import 'package:image_picker/image_picker.dart';

import 'package:flutter/material.dart';
import '../Controller/petController.dart';

class AddPetScreen extends StatefulWidget {
  @override
  _AddPetState createState() => _AddPetState();
}

class _AddPetState extends State<AddPetScreen> {
  final PetService _pet = PetService();
  final _formkey = GlobalKey<FormState>();

  DecorationImage pp;
  String _image =
      "https://firebasestorage.googleapis.com/v0/b/watchdog-b2c02.appspot.com/o/background.jpg?alt=media&token=564f26fb-9852-44ef-bd3c-f2d51628d443";

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
      this.pp = DecorationImage(image: NetworkImage(_image), fit: BoxFit.cover);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue[400],
        elevation: 0.0,
        title: Text('Ajouter un animal'),
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
                      decoration: InputDecoration(
                        hintText: 'Prénom',
                      ),
                      validator: (val) =>
                          val.isEmpty ? 'Ce champs est requis' : null,
                      onChanged: (val) {
                        setState(() => firstname = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      decoration: InputDecoration(
                        hintText: 'Age',
                      ),
                      keyboardType: TextInputType.number,
                      validator: (val) =>
                          val.isEmpty ? 'Ce champs est requis' : null,
                      onChanged: (val) {
                        setState(() => age = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      decoration: InputDecoration(
                        hintText: 'Race',
                      ),
                      validator: (val) =>
                          val.isEmpty ? 'Ce champs est requis' : null,
                      onChanged: (val) {
                        setState(() => race = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      decoration: InputDecoration(
                        hintText: 'Description (facultatif)',
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
                          'Ajouter',
                          style: TextStyle(color: Colors.white),
                        ),
                        onPressed: () async {
                          if (_formkey.currentState.validate()) {
                            _pet.createPet(
                                firstname, age, race, description, _image);
                            Navigator.pop(context);
                          } else {
                            setState(
                                () => error = 'Certains champs sont requis');
                          }
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
        _image = image.path;
        pp = DecorationImage(
          image: new AssetImage(image.path),
          fit: BoxFit.cover,
        );
      });
    } else {
      print('No Path Received');
    }
  }
}
