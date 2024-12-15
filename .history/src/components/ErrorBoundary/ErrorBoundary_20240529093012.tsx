import React, { Component } from 'react';
import styled from 'styled-components';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string; // Добавляем поле для хранения сообщения об ошибке
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
    this.state = { hasError: false, errorMessage: undefined }; // Инициализируем errorMessage
    console.log('Вывод компанента ErrorBoundary');
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('ErrorBoundary caught an error:', error.message);
    let errorMessage = error.message;
    if (errorMessage.includes('404')) {
      errorMessage = 'Страница не найдена'; // Можно добавить более дружелюбное сообщение
    } else if (errorMessage.includes('city not found')) {
      errorMessage = 'Город не найден. Пожалуйста, уточните название города.';
    }
    return { hasError: true, errorMessage }; // Передаем сообщение об ошибке в состояние
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    console.log('Rendering ErrorBoundary, hasError =', this.state.hasError);
    if (this.state.hasError) {
      return (
        <Container>
          <div style={{ opacity: 0.8 }}>
            {this.state.errorMessage || 'Произошла непредвиденная ошибка.'}{' '}
            {/* Отображаем сообщение об ошибке */}
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
