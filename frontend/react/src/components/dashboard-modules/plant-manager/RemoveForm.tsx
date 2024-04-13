interface RemoveFormProps {
  onClose: () => void;
}

const RemoveForm: React.FC<RemoveFormProps> = ({ onClose }) => {
  return (
    <div>
      <div>RemoveForm</div>
      <button onClick={onClose}>Confirm</button>
    </div>
  );
};
export default RemoveForm;
