import styled from "styled-components";

const Loader = () => {
  return (
    <Spinner>
      <Loading>
        <div />
        <div />
        <div />
      </Loading>
    </Spinner>
  );
};

export default Loader;

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10;
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  > div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: gray;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    :nth-child(1) {
      left: 8px;
      animation-delay: -0.24s;
    }
    :nth-child(2) {
      left: 32px;
      animation-delay: -0.12s;
    }
    :nth-child(3) {
      left: 56px;
      animation-delay: 0;
    }
    @keyframes lds-facebook {
      0% {
        top: 8px;
        height: 64px;
      }
      50%,
      100% {
        top: 24px;
        height: 32px;
      }
    }
  }
`;
