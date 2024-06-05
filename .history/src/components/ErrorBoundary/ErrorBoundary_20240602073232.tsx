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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: true };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так!</h1>;
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
