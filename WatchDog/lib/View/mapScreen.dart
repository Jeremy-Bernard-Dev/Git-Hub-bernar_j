import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong/latlong.dart';
import '../Entity/profile.dart';
import 'menuScreen.dart';

class MapScreen extends StatefulWidget {
  final List<Marker> map;
  final Profile profile;

  MapScreen({Key key, @required this.profile, @required this.map})
      : super(key: key);

  @override
  _MapState createState() => _MapState();
}

class _MapState extends State<MapScreen> {
  int counter = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MenuScreen(profile: widget.profile),
      appBar: new AppBar(
        title: new Text('Map'),
        actions: <Widget>[
          /*IconButton(icon: Icon(Icons.notifications), onPressed: () {
          setState(() {
             counter++;
          });
        }),
          Container(
            width: 15,
            height: 15,
            alignment: Alignment.topRight,
            margin: EdgeInsets.only(top: 5),
            child: Container(
              width: 15,
              height: 25,
              decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Color(0xffc32c37),
                  border: Border.all(color: Colors.white, width: 1)),
              child: Padding(
                padding: const EdgeInsets.all(0.0),
                child: Center(
                  child: Text(
                    counter.toString(),
                    style: TextStyle(fontSize: 10),
                  ),
                ),
              ),
            ),
          ),*/
        ],
      ),
      body: new FlutterMap(
          options: new MapOptions(
            center: new LatLng(48.8534, 2.3488),
            zoom: 11.0,
          ),
          layers: [
            new TileLayerOptions(
                urlTemplate:
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                subdomains: ['a', 'b', 'c']),
            new MarkerLayerOptions(markers: widget.map)
          ]),
    );
  }
}
