import 'package:flutter/widgets.dart';
import 'package:image_picker/image_picker.dart';
import '../../Controller/placeController.dart';

import 'package:flutter/material.dart';

class AddPlaceScreen extends StatefulWidget {
  @override
  _AddPlaceState createState() => _AddPlaceState();
}

class _AddPlaceState extends State<AddPlaceScreen> {
  final PlaceService _market = PlaceService();
  final _formkey = GlobalKey<FormState>();

  String closure = '';
  String opening = '';
  String day = '';
  String name = '';
  String description = '';
  String latitude = '';
  String longitude = '';
  PickedFile image;
  String error = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        elevation: 0.0,
        title: Text('Ajouter un lieu'),
      ),
      body: Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/background.jpg"),
              fit: BoxFit.cover,
            ),
          ),
          padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
          child: Form(
            key: _formkey,
            child: Column(
              children: <Widget>[
                SizedBox(height: 20.0),
                TextFormField(
                    decoration: InputDecoration(
                      labelText: 'day',
                    ),
                    validator: (val) =>
                        val.isEmpty ? 'Ce champs est requis' : null,
                    onChanged: (val) {
                      setState(() => day = val);
                    }),
                SizedBox(height: 20.0),
                TextFormField(
                    decoration: InputDecoration(
                      labelText: 'closure',
                    ),
                    validator: (val) =>
                        val.isEmpty ? 'Ce champs est requis' : null,
                    onChanged: (val) {
                      setState(() => closure = val);
                    }),
                SizedBox(height: 20.0),
                TextFormField(
                    decoration: InputDecoration(
                      labelText: 'opening',
                    ),
                    validator: (val) =>
                        val.isEmpty ? 'Ce champs est requis' : null,
                    onChanged: (val) {
                      setState(() => opening = val);
                    }),
                SizedBox(height: 20.0),
                TextFormField(
                    decoration: InputDecoration(
                      labelText: 'name',
                    ),
                    keyboardType: TextInputType.number,
                    validator: (val) =>
                        val.isEmpty ? 'Ce champs est requis' : null,
                    onChanged: (val) {
                      setState(() => name = val);
                    }),
                SizedBox(height: 20.0),
                TextFormField(
                    decoration: InputDecoration(
                      labelText: 'description',
                    ),
                    validator: (val) =>
                        val.isEmpty ? 'Ce champs est requis' : null,
                    onChanged: (val) {
                      setState(() => description = val);
                    }),
                SizedBox(height: 20.0),
                TextFormField(
                    decoration: InputDecoration(
                      labelText: 'latitude',
                    ),
                    validator: (val) =>
                        val.isEmpty ? 'Ce champs est requis' : null,
                    onChanged: (val) {
                      setState(() => latitude = val);
                    }),
                SizedBox(height: 20.0),
                TextFormField(
                    decoration: InputDecoration(
                      labelText: 'longitude',
                    ),
                    validator: (val) =>
                        val.isEmpty ? 'Ce champs est requis' : null,
                    onChanged: (val) {
                      setState(() => longitude = val);
                    }),
                SizedBox(height: 20.0),
                Container(
                    margin: const EdgeInsets.only(top: 20),
                    width: 400.0,
                    height: 40.0,
                    child: RaisedButton(
                        shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(10.0)),
                        color: Colors.blue[400],
                        child: Text(
                          'Add',
                          style: TextStyle(color: Colors.white),
                        ),
                        onPressed: () async {
                          if (_formkey.currentState.validate()) {
                            _market.createPlace(closure, opening, day, name,
                                description, latitude, longitude, image);
                          }
                        })),
                Container(
                    margin: const EdgeInsets.only(top: 20),
                    width: 400.0,
                    height: 40.0,
                    child: RaisedButton(
                        shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(10.0)),
                        color: Colors.blue[400],
                        child: Text(
                          'Choose picture',
                          style: TextStyle(color: Colors.white),
                        ),
                        onPressed: () async {
                          uploadImage();
                        })),
                SizedBox(height: 12.0),
                Text(
                  error,
                  style: TextStyle(color: Colors.red, fontSize: 14.0),
                ),
              ],
            ),
          )),
    );
  }

  uploadImage() async {
    final _picker = ImagePicker();
    PickedFile getimage;

    getimage = await _picker.getImage(source: ImageSource.gallery);

    if (getimage != null) {
      setState(() {
        image = getimage;
      });
    } else {
      print('No Path Received');
    }
  }
}
