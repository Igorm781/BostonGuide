import { ChatContainer } from '@/components/chat/ChatContainer';

export default function Home() {
  return (
    <main className="flex flex-col flex-1 h-[calc(100vh-4rem)] w-full">
      <ChatContainer />
    </main>
  );
}
