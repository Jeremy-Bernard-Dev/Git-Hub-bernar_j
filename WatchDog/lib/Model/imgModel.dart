import 'package:cloud_firestore/cloud_firestore.dart';
import '../Controller/authController.dart';

class ImgModel {
  final AuthService _auth = AuthService();
  final database = Firestore.instance;

  updateImgProfile(path) async {
    dynamic userID = await _auth.getUserId();
    await database
        .collection("user")
        .document(userID)
        .updateData({'img': path});
  }
}
