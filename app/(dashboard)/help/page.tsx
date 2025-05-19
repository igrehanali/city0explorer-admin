"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";

interface ChatUser {
  id: string;
  email: string;
  userEmail: string;
}

interface Message {
  id: string;
  sender: "admin" | "user";
  text: string;
  createdAt: any;
}

export default function AdminChatPage() {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const usersData: ChatUser[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email ?? "",
          userEmail: data.userEmail ?? "",
        };
      });
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);
  // Fetch real-time messages for selected user
  useEffect(() => {
    if (!selectedUser) return;

    const messagesRef = collection(db, "chats", selectedUser.id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const messagesRef = collection(db, "chats", selectedUser.id, "messages");
    try {
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        createdAt: serverTimestamp(),
        fromAdmin: true,
        senderEmail: "",
        senderId: "",
      });

      await setDoc(
        doc(db, "chats", selectedUser.id),
        {
          email: selectedUser.email,
          lastUpdated: serverTimestamp(),
        },
        { merge: true }
      );

      setNewMessage("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    }
  };
  console.log("users", users);
  return (
    <div className="flex h-[calc(100vh-5rem)] mt-20">
      {/* Sidebar - Users */}
      <aside className="w-64 border-r bg-white">
        <Card className="h-full rounded-none">
          <CardHeader>
            <CardTitle className="text-xl">Users</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[80%]">
            <CardContent className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-2 rounded cursor-pointer ${
                    selectedUser?.id === user.id
                      ? "bg-purple-100 text-purple-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {user.userEmail}
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>
      </aside>

      {/* Chat Window */}
      <main className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <Card className="rounded-none border-l-0 border-r-0">
              <CardHeader>
                <CardTitle>Chat with {selectedUser.email}</CardTitle>
              </CardHeader>
            </Card>

            <ScrollArea className="flex-1 px-6 py-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 text-sm max-w-xs ${
                        msg.sender === "admin"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {msg.text}
                      <div className="text-[10px] text-right mt-1 opacity-60">
                        {msg.createdAt?.toDate
                          ? new Date(
                              msg.createdAt.toDate()
                            ).toLocaleTimeString()
                          : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />
            <div className="flex items-center gap-2 p-4 border-t">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting.
          </div>
        )}
      </main>
    </div>
  );
}
