import React, { Component } from 'react';
import styled from 'styled-components';

interface ErrorBoundaryState {
  hasError: boolean;
  cityNotFoundError: boolean; // Новое состояние для отслеживания ошибки "город не найден"
}

const Container = styled.div`
  position: relative;
`;

const StyledButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(76, 175, 80, 0.7); /* Зеленый с прозрачностью */
  border: none;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
`;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error.message.includes('город не найден')) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Ошибку отловил:', error, errorInfo);
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Отображение запасного UI поверх текущего содержимого
      return (
        <Container>
          <div style={{ opacity: 0.8 }}>
            Город не найден. Пожалуйста, уточните название города.
          </div>
          <StyledButton onClick={() => window.location.reload()}>
            Перезагрузить
          </StyledButton>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
