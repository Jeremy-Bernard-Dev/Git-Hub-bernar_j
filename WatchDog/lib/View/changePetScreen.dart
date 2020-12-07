import 'package:flutter/material.dart';
import 'package:flutter_login_page_ui/Entity/pet.dart';
import '../Entity/profile.dart';

class ChangePetScreen extends StatefulWidget {
  final Profile profile;
  final List<Pet> pet;

  ChangePetScreen({Key key, @required this.pet, @required this.profile})
      : super(key: key);

  @override
  _ChangePetState createState() => _ChangePetState();
}

class _ChangePetState extends State<ChangePetScreen> {
  List<Color> _color = [Colors.white, Colors.white, Colors.white];

  int petindex = 0;

  void _toggleColor(_index) {
    setState(() {
      if (_color[_index] == Colors.green) {
        _color[_index] = Colors.white;
      } else {
        _color[_index] = Colors.green;
        setState(() {
          petindex = _index;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<Pet> pet = widget.pet;

    return Scaffold(
      // appBar: AppBar(
      //   title: Text('Mes animaux'),
      // ),
      body: Stack(children: <Widget>[
        ListView.builder(
            itemCount: pet.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: EdgeInsets.symmetric(vertical: 0.0, horizontal: 40.0),
                child: Card(
                  color: this._color[index],
                  shape: new RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(10.0)),
                  child: ListTile(
                    onTap: () {
                      return this._toggleColor(index);
                    },
                    title: Text(pet[index].firstname,
                        style: Theme.of(context).textTheme.title),
                    subtitle: Text(pet[index].race,
                        style: Theme.of(context).textTheme.title),
                    leading: CircleAvatar(
                      backgroundImage: NetworkImage(pet[index].img),
                    ),
                  ),
                ),
              );
            }),
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
                      Navigator.pop(context, petindex);
                      // Navigator.push(
                      // context,
                      // MaterialPageRoute(
                      //   builder: (BuildContext context) =>
                      //     ReservationScreen(infoPlace: widget.infoPlace , pet: widget.pet, index: widget.index, profile: widget.profile,))
                      // );
                    },
                    icon: Icon(Icons.check),
                    label: Text("Confirmer"),
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
