import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  loginWithEmail(String email, String password) async {
    AuthResult result = await _auth.signInWithEmailAndPassword(
        email: email, password: password);
    FirebaseUser user = result.user;
    return user != null;
  }

  registerWithEmail(String email, String password) async {
    AuthResult result = await _auth.createUserWithEmailAndPassword(
        email: email, password: password);
    FirebaseUser user = result.user;
    return user != null;
  }

  getUserId() async {
    final FirebaseAuth _auth = FirebaseAuth.instance;
    dynamic result = await _auth.currentUser();
    if (result != null) {
      return result.uid;
    } else {
      return null;
    }
  }

  logout() {
    _auth.signOut();
  }
}
