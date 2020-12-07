import 'package:flutter/material.dart';
import '../Controller/profileController.dart';
import '../Controller/contactController.dart';
import '../Controller/messengerController.dart';
import '../Entity/profile.dart';
import '../Entity/contact.dart';
import 'messageScreen.dart';

class MessengerScreen extends StatefulWidget {
  final Profile profile;

  MessengerScreen({Key key, @required this.profile}) : super(key: key);

  @override
  _MessengerScreenState createState() => _MessengerScreenState();
}

class _MessengerScreenState extends State<MessengerScreen> {
  final ProfileService _profile = ProfileService();
  final MessengerService _message = MessengerService();
  final ContactService _contact = ContactService();

  List<Contact> contactlist = [];

  List<Contact> profilelist = [];
  List<Contact> contact = [];
  List<Profile> img = [];

  String chatRoomId = "";

  @override
  void initState() {
    init();
    super.initState();
  }

  void init() async {
    String userID = widget.profile.userID;

    List<Contact> contactlist = await _contact.getContact();

    setState(() {
      contact = contactlist;
      contact.sort((a, b) => b.contactID.compareTo(a.contactID));
    });
    contact.forEach((element) async {
      Profile contactImg = await _profile.getProfilWithID(element.contactID);
      setState(() {
        img.add(contactImg);
        img.sort((a, b) => b.userID.compareTo(a.userID));
      });
    });

    contactlist.forEach((element) async {
      String contactID = element.contactID;
      if (userID.hashCode <= contactID.hashCode) {
        chatRoomId = '$userID-$contactID';
      } else {
        chatRoomId = '$contactID-$userID';
      }
      int contact = await _message.getMessage(chatRoomId);
      if (contact == 1) {
        setState(() {
          profilelist.add(element);
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    // final List<Contact> contact = widget.contact;

    return Scaffold(
      appBar: AppBar(
        title: Text("Messagerie"),
      ),
      body: Stack(
        children: <Widget>[
          Container(
            height: 100.0,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: contact.length,
              itemBuilder: (context, index) => InkWell(
                onTap: () async {
                  Profile contactProfil =
                      await _profile.getProfilWithID(contact[index].contactID);
                  Navigator.push(
                      context,
                      new MaterialPageRoute(
                          builder: (BuildContext context) => new MessageScreen(
                                profile: widget.profile,
                                contact: contactProfil,
                              )));
                },
                child: Container(
                  width: 100.0,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      CircleAvatar(
                        backgroundImage: NetworkImage(img[index].img),
                      ),
                      Text(contact[index].firstname),
                    ],
                  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 100.0),
            child: ListView.builder(
                itemCount: profilelist.length,
                itemBuilder: (context, index) {
                  return Padding(
                    padding:
                        EdgeInsets.symmetric(vertical: 0.0, horizontal: 40.0),
                    child: Card(
                      child: ListTile(
                        onTap: () async {
                          Profile contactProfil = await _profile
                              .getProfilWithID(profilelist[index].contactID);
                          Navigator.push(
                              context,
                              new MaterialPageRoute(
                                  builder: (BuildContext context) =>
                                      new MessageScreen(
                                        profile: widget.profile,
                                        contact: contactProfil,
                                      )));
                        },
                        title: Text(profilelist[index].firstname,
                            style: Theme.of(context).textTheme.title),
                        // subtitle: Text("message[index].message",
                        //     style: Theme.of(context).textTheme.title),
                      ),
                    ),
                  );
                }),
          ),
        ],
      ),
    );
  }
}

abstract class ListItem {
  Widget buildTitle(BuildContext context);
  Widget buildSubtitle(BuildContext context);
}

class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);

  Widget buildTitle(BuildContext context) {
    return Text(
      heading,
      style: Theme.of(context).textTheme.headline5,
    );
  }

  Widget buildSubtitle(BuildContext context) => null;
}

class MessageItem implements ListItem {
  final String sender;
  final String body;

  MessageItem(this.sender, this.body);

  Widget buildTitle(BuildContext context) => Text(sender);

  Widget buildSubtitle(BuildContext context) => Text(body);
}
