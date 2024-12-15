import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

interface ErrorBoundaryChildrenProps {
  children: ReactNode;
}

interface ErrorBoundaryAdditionalProps {
  onError: (message: string) => void;
}

interface ErrorBoundaryProps
  extends ErrorBoundaryChildrenProps,
    ErrorBoundaryAdditionalProps {}

interface ErrorBoundaryState {
  hasError: boolean;
}

const StyledButton = styled.button`
  position: fixed;
  background-color: #4caf50; /* Зеленый */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: true }; // Инициализация состояния hasError
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error.message.includes('город не найден')) {
      this.props.onError(
        'Город не найден. Пожалуйста, уточните название города.',
      );
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Caught an error:', error, errorInfo);
    this.props.onError(error.message); // Передача сообщения об ошибке через onError
    this.setState({ hasError: true }); // Установка hasError в true при любых других ошибках
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Произошла ошибка</h1>
          <p>{this.props.onError}</p> {/* Используйте props.onError здесь */}
          <StyledButton onClick={() => window.location.reload()}>
            Перезагрузить
          </StyledButton>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
