import ChatModal from "./ChatModal";
import NotificationsModal from "./NotificationsModal";
import UserSettingsModal from "./UserSettingsModal";

interface RenderHeaderModalContentProps {
  content: string | null;
}

const RenderHeaderModalContent: React.FC<RenderHeaderModalContentProps> = ({
  content,
}) => {
  switch (content) {
    case "notifications":
      return <NotificationsModal />;
    case "chat":
      return <ChatModal />;
    case "settings":
      return <UserSettingsModal />;
    default:
      return null;
  }
};

export default RenderHeaderModalContent;
