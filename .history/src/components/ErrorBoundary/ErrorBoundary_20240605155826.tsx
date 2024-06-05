// import React, { Component, ReactNode } from 'react';
// import styled from 'styled-components';
// import IconError from '../../../public/assets/images/IconError';
// import { InputSearch } from '../InputSearch/InputSearch';
// import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

// interface ErrorBoundaryProps {
//   children: ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
// }

// const StyledFullPageContainer = styled.div`
//   position: fixed;
//   width: 500px;
//   height: 500px;
//   left: 260px;
//   top: 150px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   bakground-color: blue;
// `;

// const StyledCenteredIconError = styled(IconError)`
//   top: 150px;
//   width: 400px;
//   height: 400px;
//   left: 500px;
//   transform: translate(-50%, -50%);
//   //z-index: 100;
// `;

// const StyledButton = styled.button`
//   position: fixed;
//   width: 120px;
//   height: 40px;
//   left: 600px;
//   top: 500px;
//   color: #6c63ff;
//   background-color: #ffffff;
//   border-color: black;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }
//   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
//     if (error.message.includes('город не найден')) {
//       return { hasError: false };
//     }
//     return { hasError: false };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
//     console.error('Uncaught error:', error, errorInfo);
//   }
//   refreshPage = () => {
//     window.location.reload(false);
//   };

//   render() {
//     if (this.state.hasError) {
//       return (
//         <StyledFullPageContainer>
//           <InputSearch />
//           <TemperatureScaleToggle />
//           <StyledCenteredIconError />
//           <div>Что-то пошло не так </div>
//           <StyledButton onClick={() => this.refreshPage()}>
//             Перезагрузить
//           </StyledButton>
//         </StyledFullPageContainer>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
