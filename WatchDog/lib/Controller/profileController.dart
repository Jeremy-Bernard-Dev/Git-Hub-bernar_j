import '../Controller/authController.dart';
import '../Entity/profile.dart';
import '../Model/profileModel.dart';

class ProfileService {
  final ProfileModel model = ProfileModel();
  final AuthService _auth = AuthService();

  createProfile(email, name, firstname, age, sexe) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.addProfile(email, name, firstname, age, sexe);
    }
  }

  getProfil() async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      Profile profile = await model.initProfil();
      return (profile);
    }
  }

  getProfilWithID(userID) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      Profile profile = await model.initProfilWithID(userID);
      return (profile);
    }
  }

  getProfilWithID2(userID) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      Profile profile = await model.initProfilWithID2(userID);
      return (profile);
    }
  }
}
