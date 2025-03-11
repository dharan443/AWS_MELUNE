import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Loader, Send } from "lucide-react";
import { useState } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';

const MessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const { user } = useUser();
	const { selectedUser, sendMessage } = useChatStore();


	

	const genAI = new GoogleGenerativeAI(
		import.meta.env.VITE_AI_API_KEY
	);
	const [aiLoading,setAiLoading] = useState(false);
	
  
	const model = genAI.getGenerativeModel({ model: "tunedModels/melune-fine-tuned-prompts-k65ck3x8xp2r" });

	const generateResp = async () => {
		try {
			const APIResult = await model.generateContent(newMessage);
			
			// Access the correct structure
			const aiResponse = APIResult.response?.candidates?.[0]?.content?.parts?.[0]?.text;
			
			if (!aiResponse) {
				console.error("No valid AI response found.");
				return;
			}
			
			sendMessage(user.id,import.meta.env.VITE_AI_ID, aiResponse.trim()); 
	
		} catch (error) {
			console.error("Error generating AI response:", error);
		}
	};

	const handleSend = async () => {
		setAiLoading(true);
		if (!selectedUser || !user || !newMessage.trim()) return;
		// Send user message
		sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
		setNewMessage("");
	
		// If talking to AI, get response
		if (selectedUser._id === import.meta.env.VITE_AI_ID) {
			await generateResp();
			setAiLoading(false);
		}
	};

	return (
		<div className='p-4 mt-auto border-t border-zinc-800'>
			<div className='flex gap-2'>
				<Input
					placeholder='Type a message'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='bg-zinc-800 border-none'
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>
				<Button size={"icon"} onClick={handleSend} disabled={!newMessage.trim()}>
					{aiLoading ? <Loader /> : <Send className='size-4' />}
				</Button>
			</div>
		</div>
	);
};
export default MessageInput;
