import 'package:cloud_firestore/cloud_firestore.dart';

class MessengerModel {
  final database = Firestore.instance;

  addMessage(String chatRoomId, chatMessageData) async {
    await database
        .collection("Messages")
        .document(chatRoomId)
        .collection("chats")
        .add(chatMessageData)
        .catchError((e) {
    });
  }

  initChats(String chatRoomId) async {
    return database
        .collection("Messages")
        .document(chatRoomId)
        .collection("chats")
        .orderBy('time')
        .snapshots();
  }

  initMessage(chatRoomId) async {
    final snapshot = await Firestore.instance
        .collection("Messages")
        .document(chatRoomId)
        .collection("chats")
        .getDocuments();
    if (snapshot.documents.length == 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
