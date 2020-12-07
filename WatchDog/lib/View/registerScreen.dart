import 'package:flutter/material.dart';
import '../Controller/authController.dart';
import '../Controller/profileController.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<RegisterScreen> {
  final AuthService _auth = AuthService();
  final ProfileService _profile = ProfileService();
  final _formkey = GlobalKey<FormState>();

  bool _value1 = false;
  bool _value2 = false;

  String firstname = '';
  String name = '';
  String age = '';
  String email = '';
  String password = '';
  String sexe = '';
  String error = '';

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
        backgroundColor: Colors.blue,
        elevation: 0.0,
        title: Text('Créer un compte'),
      ),
      body: Container(
          decoration: BoxDecoration(
              /*image: DecorationImage(
              image: AssetImage("assets/background.jpg"),
              fit: BoxFit.cover,
            ),*/
              ),
          padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
          child: Form(
            key: _formkey,
            child: SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  SizedBox(height: 20.0),
                  TextFormField(
                      decoration: InputDecoration(
                        labelText: 'Nom',
                        hintText: 'Entrez votre nom',
                      ),
                      validator: (val) =>
                          val.isEmpty ? 'Ce champs est requis' : null,
                      onChanged: (val) {
                        setState(() => name = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      decoration: InputDecoration(
                        labelText: 'Prénom',
                        hintText: 'Entrez votre prénom',
                      ),
                      validator: (val) =>
                          val.isEmpty ? 'Ce champs est requis' : null,
                      onChanged: (val) {
                        setState(() => firstname = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      decoration: InputDecoration(
                        labelText: 'Age',
                        hintText: 'Entrez votre âge',
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
                        labelText: 'Email',
                        hintText: 'Entrez votre email',
                      ),
                      keyboardType: TextInputType.emailAddress,
                      validator: (val) =>
                          val.isEmpty ? 'Ce champs est requis' : null,
                      onChanged: (val) {
                        setState(() => email = val);
                      }),
                  SizedBox(height: 20.0),
                  TextFormField(
                      decoration: InputDecoration(
                        labelText: 'Mot de passe',
                        hintText: 'Entrez votre Mot de passe',
                      ),
                      obscureText: true,
                      validator: (val) =>
                          val.isEmpty ? 'Ce champs est requis' : null,
                      onChanged: (val) {
                        setState(() => password = val);
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
                            'Confirmer',
                            style: TextStyle(color: Colors.white),
                          ),
                          onPressed: () async {
                            if (_formkey.currentState.validate()) {
                              dynamic result = await _auth.registerWithEmail(
                                  email, password);
                              if (result == true) {
                                _profile.createProfile(
                                    email, name, firstname, age, sexe);
                                Navigator.pop(context);
                              } else {
                                setState(() => error =
                                    'adresse mail ou mot de passe invalide');
                              }
                            }
                          })),
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
}
