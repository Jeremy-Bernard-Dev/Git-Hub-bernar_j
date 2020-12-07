import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong/latlong.dart';
import '../Entity/infoPlace.dart';
import '../View/planningScreen.dart';

class MapModel {
  final database = Firestore.instance;

  initMarker() async {
    List<Marker> map = [];

    await database.collection("Map").getDocuments().then((querySnapshot) {
      querySnapshot.documents.forEach((queryResult) {
        InfoPlace infoPlace = InfoPlace();
        infoPlace.name = queryResult.data["name"];
        infoPlace.lat = queryResult.data["latitude"];
        infoPlace.lon = queryResult.data["longitude"];
        infoPlace.opening = queryResult.data["opening"];
        infoPlace.closure = queryResult.data["closure"];
        infoPlace.day = queryResult.data["day"];
        infoPlace.description = queryResult.data["description"];
        infoPlace.placeID = queryResult.data["placeID"];
        infoPlace.img = queryResult.data["img"];
        map.add(new Marker(
            width: 45.0,
            height: 45.0,
            point: new LatLng(double.parse(queryResult.data["latitude"]),
                double.parse(queryResult.data["longitude"])),
            builder: (context) => new Container(
                  child: IconButton(
                      icon: Icon(Icons.location_on),
                      color: Colors.red,
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (BuildContext context) =>
                                    PlanningScreen(infoPlace: infoPlace)));
                      }),
                )));
      });
    });
    return (map);
  }
}
