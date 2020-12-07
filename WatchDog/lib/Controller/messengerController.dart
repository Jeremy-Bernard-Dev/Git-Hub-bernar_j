import '../Controller/authController.dart';
import '../Model/messengerModel.dart';

class MessengerService {
  final MessengerModel model = MessengerModel();
  final AuthService _auth = AuthService();

  createMessage(String chatRoomId, chatMessageData) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      await model.addMessage(chatRoomId, chatMessageData);
    }
  }

  getChats(String chatRoomId) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      return model.initChats(chatRoomId);
    }
  }

  getMessage(chatRoomId) async {
    dynamic security = await _auth.getUserId();
    if (security != null) {
      if (model.initMessage(chatRoomId) == 0) {
        return 0;
      } else {
        return 1;
      }
    }
  }
}
