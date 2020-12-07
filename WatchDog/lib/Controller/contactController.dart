import '../Controller/authController.dart';
import '../Entity/profile.dart';
import '../Entity/contact.dart';
import '../Model/contactModel.dart';

class ContactService {
  final ContactModel model = ContactModel();
  final AuthService _auth = AuthService();

  createContact(firstname, name, contactID) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.addContact(firstname, name, contactID);
    }
  }

  getContact() async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      List<Contact> contact = await model.initContact();
      return (contact);
    }
  }

  getContactProfil(firstname, name) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      List<Profile> contactProfile =
          await model.initContactProfil(firstname, name);
      return (contactProfile);
    }
  }

    getcontactlist() async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      return model.initcontactlist();
    }
  }
}
