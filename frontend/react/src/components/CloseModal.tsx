interface CloseModalProps {
  onClose: () => void;
}

const CloseModal: React.FC<CloseModalProps> = ({ onClose }) => {
  return (
    <div
      className=" 
      modal-content 
      w-10 
      h-10 
      bg-white 
      absolute 
      top-2 
      right-2 
      rounded-full
      "
    >
      <div
        className="w-full h-full flex items-center justify-center cursor-pointer"
        onClick={onClose}
      >
        <span className="text-4xl md:text-2xl">&times;</span>
      </div>
    </div>
  );
};

export default CloseModal;
