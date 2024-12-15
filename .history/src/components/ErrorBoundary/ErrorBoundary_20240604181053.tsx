import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import IconError from '../../../public/assets/images/IconError';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const StyledFullPageContainer = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  left: 260px;
  top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  bakground-color: linear-gradient(
    180deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
`;

const StyledCenteredIconError = styled(IconError)`
  top: 150px;
  width: 400px;
  height: 400px;
  left: 500px;
  transform: translate(-50%, -50%);
  //z-index: 100;
`;

const StyledButton = styled.button`
  position: fixed;
  width: 120px;
  height: 40px;
  left: 600px;
  top: 500px;
  color: #6c63ff;
  background-color: #ffffff;
  border-color: black;
  border-radius: 5px;
  cursor: pointer;
`;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error.message.includes('город не найден')) {
      return { hasError: false };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }
  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    if (this.state.hasError) {
      return (
        <StyledFullPageContainer>
          <InputSearch />
          <TemperatureScaleToggle />
          <StyledCenteredIconError />
          <div>Что-то пошло не так </div>
          <StyledButton onClick={() => this.refreshPage()}>
            Перезагрузить
          </StyledButton>
        </StyledFullPageContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// import React, { Component, ReactNode } from 'react';
// import styled from 'styled-components';

// interface ErrorBoundaryProps {
//   onError: (errorMessage: string) => void;
//   children: React.ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
//   errorMessage: string | null;
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
// `;

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: true, errorMessage: null };
//   }

//   static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
//     console.error('ErrorBoundary getDerivedStateFromError:', error);
//     return { hasError: true, errorMessage: error.message };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
//     console.log('componentDidCatch triggered'); // Добавлен для отладки
//     console.error('Caught an error:', error, errorInfo);

//     // Передача ошибки в родительский компонент
//     this.props.onError(error.message);

//     this.setState({ hasError: true, errorMessage: error.message }, () => {
//       console.log('State updated to hasError: true'); // Добавлен для отладки
//     });
//   }

//   render() {
//     if (
//       this.state.hasError &&
//       this.state.errorMessage?.includes('город не найден')
//     ) {
//       return (
//         <div>
//           <h1>Произошла ошибка</h1>
//           <p>Город не найден. Пожалуйста, уточните название города.</p>
//           <StyledButton onClick={() => window.location.reload()}>
//             Перезагрузить
//           </StyledButton>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
