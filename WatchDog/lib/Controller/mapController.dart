import '../Controller/authController.dart';
import 'package:flutter_map/flutter_map.dart';
import '../Model/mapModel.dart';

class MapService {
  final MapModel model = MapModel();
  final AuthService _auth = AuthService();

  getMarker() async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      List<Marker> map = await model.initMarker();
      return (map);
    }
  }
}
