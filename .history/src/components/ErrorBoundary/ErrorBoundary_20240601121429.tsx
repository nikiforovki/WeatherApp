import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

interface ErrorBoundaryProps {
  children: ReactNode;
}

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

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: true };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error.message.includes('город не найден')) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Caught an error:', error, errorInfo);
    // Дополнительное логирование для диагностики
    console.log('Stack trace:', error.stack);
  }

  render() {
    if (this.state.hasError) {
      // Отображение запасного UI
      return (
        <div>
          <h1>Город не найден. Пожалуйста, уточните название города.</h1>
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
