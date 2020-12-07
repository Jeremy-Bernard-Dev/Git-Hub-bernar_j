import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import '../Controller/authController.dart';
import '../Controller/profileController.dart';
import '../Controller/mapController.dart';
import '../Entity/profile.dart';
import 'registerScreen.dart';
import 'mapScreen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<LoginScreen> {
  final AuthService _auth = AuthService();
  final ProfileService _profile = ProfileService();
  final MapService _map = MapService();
  final _formkey = GlobalKey<FormState>();

  String email = '';
  String password = '';
  String error = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          decoration: BoxDecoration(
              /*image: DecorationImage(
              image: ExactAssetImage("assets/background2.jpg"),
              fit: BoxFit.cover,
            ),*/
              ),
          padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
          child: Form(
            key: _formkey,
            child: SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  Hero(
                    tag: 'assets/logo.png',
                    child: Container(
                      margin: const EdgeInsets.only(top: 100),
                      height: 125.0,
                      width: 125.0,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(62.5),
                          image: DecorationImage(
                              fit: BoxFit.cover,
                              image: AssetImage('assets/logo.png'))),
                    ),
                  ),
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
                        hintText: 'Entrez votre mot de passe',
                      ),
                      obscureText: true,
                      validator: (val) =>
                          val.isEmpty ? 'Ce champs est requis' : null,
                      onChanged: (val) {
                        setState(() => password = val);
                      }),
                  SizedBox(height: 20.0),
                  Container(
                    margin: const EdgeInsets.only(top: 50),
                    width: 400.0,
                    height: 40.0,
                    child: RaisedButton(
                        shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(10.0)),
                        color: Colors.blue[400],
                        child: Text(
                          'Se connecter',
                          style: TextStyle(color: Colors.white),
                        ),
                        onPressed: () async {
                          if (_formkey.currentState.validate()) {
                            dynamic result =
                                await _auth.loginWithEmail(email, password);
                            if (result == true) {
                              Profile profile = await _profile.getProfil();
                              List<Marker> map = await _map.getMarker();
                              Navigator.pop(context);
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (BuildContext context) =>
                                          MapScreen(
                                              profile: profile, map: map)));
                            } else {
                              setState(() =>
                                  error = 'email ou mot de passe incorrect');
                            }
                          }
                        }),
                  ),
                  SizedBox(height: 12.0),
                  Container(
                    margin: const EdgeInsets.only(top: 20),
                    width: 400.0,
                    height: 40.0,
                    child: RaisedButton(
                        shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(10.0)),
                        color: Colors.blue[400],
                        child: Text(
                          'Créer un compte',
                          style: TextStyle(color: Colors.white),
                        ),
                        onPressed: () async {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (BuildContext context) =>
                                      RegisterScreen()));
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
}
