interface NotificationProps {
    message: string | null;
  }
  
  const Notification = ({ message }: NotificationProps) => {
    if (!message) {
      return null;
    }
  
    const style = {
      color: 'red',
      border: '1px solid red',
      padding: '10px',
      marginBottom: '10px'
    };
  
    return <div style={style}>{message}</div>;
  };
  
  export default Notification;