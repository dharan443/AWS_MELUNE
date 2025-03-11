import Topbar from "@/components/TopBar";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


const parseGeminiResponse = (response: string) => {
  const lines = response.split("\n").filter((line) => line.trim() !== "");
  return lines.map((line, index) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <h2 key={index} className="text-lg font-bold">
          {line.replace(/\*\*/g, "")}
        </h2>
      );
    } else if (line.startsWith("* **") && line.includes(":**")) {
      return (
        <p key={index} className="mt-2">
          <strong>{line.replace(/\*\*/g, "")}</strong>
        </p>
      );
    } else if (line.startsWith("* ")) {
      return (
        <li key={index} className="ml-5 list-disc">
          {line.replace("* ", "")}
        </li>
      );
    } else {
      return (
        <p key={index} className="mt-2">
          {line}
        </p>
      );
    }
  });
};

const ChatMessage = ({ message, user, selectedUser }) => {
  return (
    <div className={`flex items-start gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}>
      <Avatar className="size-8">
        <AvatarImage
          src={message.senderId === user?.id ? user.imageUrl : selectedUser.imageUrl}
        />
        <AvatarFallback>{message.senderId === user?.id ? "U" : "AI"}</AvatarFallback>
      </Avatar>

      <div className={`rounded-lg p-3 max-w-[70%] ${message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"}`}>
        {parseGeminiResponse(message.content)}
        <span className="text-xs text-zinc-300 mt-1 block">{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
};

const scrollToBottom = (container: HTMLElement | null, smooth = false) => {
  container?.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "end",
  });
};

const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  useEffect(() => {
    if(lastMessageRef.current){
      scrollToBottom(lastMessageRef.current,true);
    }
  },[messages])

  const uniqueMessages = Array.from(new Map(messages.map(msg => [msg._id, msg])).values());


  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />
      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UsersList />
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="p-4 space-y-4">
                  {uniqueMessages.map((message) => (
                    <ChatMessage key={message._id} message={message} user={user} selectedUser={selectedUser} />
                  ))}
                  <div ref={lastMessageRef} />
                </div>
              </ScrollArea>
              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src="/melune.png" alt="Melune" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">No conversation selected</h3>
      <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
);
