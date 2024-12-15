import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import IconError from '../../../public/assets/images/IconError';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

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
//   left: 600px;
//   top: 500px;
// `;
const StyledFullPageContainer = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  left: 260px;
  top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
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
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
    if (error.message.includes('Город не найден')) {
      this.setState({ hasError: true });
    }
  }
  render() {
    if (this.state.hasError) {
      console.log('ErrorBoundary caught an error');
      return (
        <StyledFullPageContainer>
          {/* <InputSearch /> */}
          {/* <TemperatureScaleToggle /> */}
          <StyledCenteredIconError />
          <div>Что то пошло не так </div>
          {/* <StyledButton onClick={refreshPage}>Перезагрузить</StyledButton> */}
          <StyledButton onClick={() => window.location.reload()}>
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

// interface ErrorBoundaryChildrenProps {
//   children: ReactNode;
// }

// interface ErrorBoundaryAdditionalProps {
//   onError: (message: string) => void;
// }

// interface ErrorBoundaryProps
//   extends ErrorBoundaryChildrenProps,
//     ErrorBoundaryAdditionalProps {}

// interface ErrorBoundaryState {
//   hasError: boolean;
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

// class ErrorBoundary extends Component<ErrorBoundaryProps> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: true };
//   }

//   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
//     if (error.message.includes('город не найден')) {
//       this.props.onError(
//         'Город не найден. Пожалуйста, уточните название города.',
//       );
//       return { hasError: true };
//     }
//     return { hasError: false };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
//     console.error('Caught an error:', error, errorInfo);
//     this.props.onError(error.message);
//     this.setState({ hasError: true });
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div>
//           <h1>Произошла ошибка</h1>
//           <p>Город не найден. Пожалуйста, уточните название города.</p>{' '}
//           {/* Используйте сообщение об ошибке напрямую */}
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
