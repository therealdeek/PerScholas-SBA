interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-wrapper" role="alert">
      {/* role="alert" tells screen readers to announce this immediately */}
      <p className="error-message">⚠️ {message}</p>
    </div>
  );
}

export default ErrorMessage;
