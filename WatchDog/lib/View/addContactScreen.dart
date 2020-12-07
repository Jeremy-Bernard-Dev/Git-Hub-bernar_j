import 'package:flutter/material.dart';
import 'package:flutter_login_page_ui/Entity/contact.dart';
import '../Controller/contactController.dart';
import '../Entity/profile.dart';
import '../Controller/profileController.dart';
import 'contactProfileScreen.dart';

class AddContactScreen extends StatefulWidget {
  final Profile profile;
  // final List<Contact> contactlist;

  AddContactScreen({Key key, @required this.profile})
      : super(key: key);

  @override
  _AddContact createState() => _AddContact();
}

class _AddContact extends State<AddContactScreen> {
  final ProfileService _profile = ProfileService();

  List<Profile> contact = [];
  List<Contact> contactlist = [];
  final ContactService _contact = ContactService();
  final _formkey = GlobalKey<FormState>();

  String firstname = '';
  String name = '';
  String error = '';
  String validation = '';

  bool valid = true;

  void contactList(profile) {
    setState(() {
      contact = profile;
    });
  }

  void revalid() {
    setState(() {
      valid = true;
    });
  }

  void init() async{
    List<Contact> getcontact = await _contact.getContact();
    setState(() {
      contactlist = getcontact;
    });
  }

  @override
  void initState() {
    init();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.blue[400],
        elevation: 0.0,
        title: Text('Ajouter un contact'),
      ),
      body: Container(
          padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
          child: Form(
            key: _formkey,
            child: Column(
              children: <Widget>[
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
                      hintText: 'Nom',
                    ),
                    validator: (val) =>
                        val.isEmpty ? 'Ce champs est requis' : null,
                    onChanged: (val) {
                      setState(() => name = val);
                    }),
                RaisedButton(
                    color: Colors.blue[400],
                    child: Text(
                      'Rechercher',
                      style: TextStyle(color: Colors.white),
                    ),
                    onPressed: () async {
                      if (_formkey.currentState.validate()) {
                        List<Profile> profile =
                            await _contact.getContactProfil(firstname, name);
                        if (profile.isEmpty) {
                          setState(() => error = 'Nom ou Prénom incorrect');
                        } else {
                          setState(() => error = '');
                          return contactList(profile);
                        }
                      }
                    }),
                SizedBox(height: 12.0),
                Text(
                  error,
                  style: TextStyle(color: Colors.red, fontSize: 14.0),
                ),
                Text(
                  validation,
                  style: TextStyle(color: Colors.green, fontSize: 14.0),
                ),
                SizedBox(
                  height: 520.0,
                  child: new ListView.builder(
                      itemCount: contact.length,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: EdgeInsets.symmetric(
                              vertical: 0.0, horizontal: 0.0),
                          child: Card(
                            shape: new RoundedRectangleBorder(
                                borderRadius: new BorderRadius.circular(10.0)),
                            child: ListTile(
                              onTap: () async {
                                Profile profile = await _profile
                                    .getProfilWithID(contact[index].userID);
                                Navigator.push(
                                    context,
                                    new MaterialPageRoute(
                                        builder: (BuildContext context) =>
                                            new ContactProfileScreen(
                                                profile: profile)));
                              },
                              title: Text(contact[index].name,
                                  style: Theme.of(context).textTheme.title),
                              subtitle: Text(contact[index].firstname,
                                  style: Theme.of(context).textTheme.title),
                              leading: CircleAvatar(
                                backgroundImage:
                                    NetworkImage(contact[index].img),
                              ),
                              trailing: IconButton(
                                icon: Icon(Icons.person_add),
                                onPressed: () async {
                                  contactlist.forEach((element) {
                                    if (element.contactID == contact[index].userID) {
                                      setState(() => error = 'Ami déjà enregistré');
                                      setState(() {
                                        valid = false;
                                      });
                                    }
                                  });
                                  if (widget.profile.userID == contact[index].userID) {
                                    setState(() => error =
                                        'Ne peut pas être son propre ami');
                                  } else if (valid == true){
                                    await _contact.createContact(
                                        firstname, name, contact[index].userID);
                                    setState(() => validation = 'Ami ajouté');
                                    setState(() => error = '');
                                  }
                                  revalid();
                                },
                              ),
                            ),
                          ),
                        );
                      }),
                ),
              ],
            ),
          )),
    );
  }
}
