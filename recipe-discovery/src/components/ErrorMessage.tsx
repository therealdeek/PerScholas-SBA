interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-wrapper" role="alert">
      <p className="error-message">⚠️ {message}</p>
    </div>
  );
}

export default ErrorMessage;
