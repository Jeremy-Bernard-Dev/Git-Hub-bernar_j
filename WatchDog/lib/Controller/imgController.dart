import '../Controller/authController.dart';
import '../Model/imgModel.dart';

class ImgService {
  final ImgModel model = ImgModel();
  final AuthService _auth = AuthService();

  changeImgProfile(path) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.updateImgProfile(path);
    }
  }
}
