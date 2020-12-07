import '../Controller/authController.dart';
import '../Entity/pet.dart';
import '../Model/petModel.dart';

class PetService {
  final PetModel model = PetModel();
  final AuthService _auth = AuthService();

  createPet(firstname, age, race, description, image) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.addPet(firstname, age, race, description, image);
    }
  }

  getPet() async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      List<Pet> pet = await model.initPet();
      return (pet);
    }
  }

  getPetContact(userID) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      List<Pet> pet = await model.initPetContact(userID);
      return (pet);
    }
  }

  getPetlWithID(petID) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      Pet pet = await model.initPetlWithID(petID);
      return (pet);
    }
  }

  changePet(petID, firstname, age, race, description, image, imgBase) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.updatePet(
          petID, firstname, age, race, description, image, imgBase);
    }
  }

  deletepet(petID) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      return model.deletepet(petID);
    }
  }

  getpetlist() async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      return model.getpetlist();
    }
  }
}
