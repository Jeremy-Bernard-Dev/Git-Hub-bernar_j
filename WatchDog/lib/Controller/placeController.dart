import '../Controller/authController.dart';
import '../Model/placeModel.dart';

class PlaceService {
  final PlaceModel model = PlaceModel();
  final AuthService _auth = AuthService();

  createPlace(closure, opening, day, name, description, latitude, longitude,
      image) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.addPlace(
          closure, opening, day, name, description, latitude, longitude, image);
    }
  }
}
