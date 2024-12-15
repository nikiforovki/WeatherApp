import React, { Component, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    const error = useSelector((state) => state.error); // Предполагается, что у вас есть поле error в вашем Redux store
    if (error === 'Город не найден') {
      this.setState({
        hasError: true,
        errorMessage: 'Город не найден. Пожалуйста, уточните название города.',
      });
    }
  }

  componentDidUpdate(
    prevProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState,
  ) {
    const currentError = useSelector((state) => state.error);
    if (
      currentError !== prevProps.error &&
      currentError === 'Город не найден'
    ) {
      this.setState({
        hasError: true,
        errorMessage: 'Город не найден. Пожалуйста, уточните название города.',
      });
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Логика обработки ошибок
    return { hasError: true, errorMessage: 'Неизвестная ошибка' };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Логирование ошибок
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>{this.state.errorMessage}</h1>
          <StyledButton onClick={() => window.location.reload()}>
            Попробовать снова
          </StyledButton>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// import React, { Component, ReactNode } from 'react';
// import styled from 'styled-components';

// interface ErrorBoundaryProps {
//   children: ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
//   errorMessage?: string;
// }

// const StyledButton = styled.button`
//   position: fixed;
//   background-color: #4caf50; /* Зеленый */
//   border: none;
//   color: white;
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   margin: 4px 2px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
//     if (error.message.includes('город не найден в ErrorBoundary')) {
//       return {
//         hasError: true,
//         errorMessage: 'Город не найден. Пожалуйста, уточните название города.',
//       };
//     }
//     return { hasError: false };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
//     console.error('Uncaught error:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div>
//           <h1>{this.state.errorMessage}</h1>
//           {/* Замена кнопки на перенаправление */}
//           <button onClick={() => (window.location.href = '/название-страницы')}>
//             Перейти на страницу ошибки
//           </button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
