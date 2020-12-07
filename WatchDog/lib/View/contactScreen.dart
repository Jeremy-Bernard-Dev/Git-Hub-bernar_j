import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login_page_ui/View/messageScreen.dart';
import 'addContactScreen.dart';
import 'contactProfileScreen.dart';
import '../Entity/profile.dart';
import '../Entity/contact.dart';
import '../Controller/profileController.dart';
import '../Controller/contactController.dart';

class ContactScreen extends StatefulWidget {
  final Profile profile;
  // final List<Contact> contact;

  ContactScreen({
    Key key,
    @required this.profile,
  }) : super(key: key);

  @override
  _ContactState createState() => _ContactState();
}

class _ContactState extends State<ContactScreen> {
  final ProfileService _profile = ProfileService();
  final ContactService _contact = ContactService();

  Stream<QuerySnapshot> contactlist;
  // Stream<QuerySnapshot> img;

  String chatRoomId = "";

  String circle = "";

  List<Contact> contact = [];
  List<Profile> img = [];

  Widget contactl() {
    return StreamBuilder(
      stream: contactlist,
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
                    onTap: () async {
                      Profile profile = await _profile
                          .getProfilWithID(snapshot.data.documents[index].data["contactID"]);
                      Navigator.push(
                          context,
                          new MaterialPageRoute(
                              builder: (BuildContext context) =>
                                  new ContactProfileScreen(profile: profile)));
                    },
                    title: Text(snapshot.data.documents[index].data["firstname"],
                        // ignore: deprecated_member_use
                        style: Theme.of(context).textTheme.title),
                    subtitle: Text(snapshot.data.documents[index].data["name"],
                        // ignore: deprecated_member_use
                        style: Theme.of(context).textTheme.title),
                    leading: CircleAvatar(
                      backgroundImage: (imageprofilequiexistepasencore(index)),
                    ),
                    trailing: IconButton(
                      icon: Icon(Icons.chat_bubble_outline),
                      onPressed: () async {
                        Profile contactProfil = await _profile
                            .getProfilWithID(snapshot.data.documents[index].data["contactID"]);
                        Navigator.push(
                            context,
                            new MaterialPageRoute(
                                builder: (BuildContext context) =>
                                    new MessageScreen(
                                      profile: widget.profile,
                                      contact: contactProfil,
                                    )));
                      },
                    ),
                  ),
                ),
              );
            }
        )
            : Container();
      },
    );
  }

  imageprofilequiexistepasencore(index) {
    
    if (index < img.length) {
        return (NetworkImage(img[index].img));
    } else {
      return (NetworkImage("https://firebasestorage.googleapis.com/v0/b/watchdog-b2c02.appspot.com/o/ProfilBase?alt=media&token=ede0b7d0-e526-46de-920e-52cab6687f10"));
    }
  }

  @override
  void initState() {
    _contact.getcontactlist().then((val) {
      setState(() {
        contactlist = val;
        print(val.data.documents[0].data["contactID"]);
      });
    });
    init();
    super.initState();
  }

  void init() async {
    List<Contact> getcontact = await _contact.getContact();
    getcontact.forEach((element) async {
      Profile contactImg = await _profile.getProfilWithID(element.contactID);
      setState(() {
        img.add(contactImg);
        img.sort((a, b) => b.userID.compareTo(a.userID));
      });
    });
  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('Mes Contacts'),
      ),
      body: Stack(children: <Widget>[
        contactl(),
        Column(
          mainAxisAlignment: MainAxisAlignment.end,
          crossAxisAlignment: CrossAxisAlignment.values[3],
          children: <Widget>[
            RaisedButton(
              padding: const EdgeInsets.all(20.0),
              textColor: Colors.white,
              color: Colors.blue,
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => AddContactScreen(
                            profile: widget.profile,
                          )),
                );
              },
              child: new Text("Add"),
            ),
          ],
        )
      ]
    ),
    );
  }
}
