# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check
out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate
TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### 11강. 리렌더링 원칙과 간단한 최적화(memo, useMemo, useCallback, React Compiler)

- 리렌더링은 다음 상황에 발생한다.
    - 내 상태가 바뀔 때 리렌더링이 된다.
    - 부모 컴포넌트가 다시 그려질 때 모든 자식 컴포넌트가 다시 그려진다.
        - 부모의 state 를 바꿔서 자식 컴포넌트에 전달하는 props 가 바뀌면 자식 컴포넌트가 리렌더링 된다.
- 부모가 바뀌었다고 해도 자식들이 다시 안 그려지게 하려면 자식 컴포넌트를 `memo`로 감싸면 된다.


- 부모가 바뀌었다고 해도 자식들이 다시 안 그려지게 하려면
    - 자식 컴포넌트에 memo 를 사용한다.
        - memo 는 props 가 바뀌지 않으면 리렌더링을 하지 않는다.
        - memo 는 shallow compare 를 한다.
            - 얕은 비교를 한다는 뜻이다. 즉, 객체의 주소값을 비교한다는 뜻이다.
            - 만약 객체의 주소값이 바뀌면 리렌더링이 된다.
    - useMemo 를 사용한다.
        - useMemo 는 메모이제이션을 한다는 뜻이다. 즉, 계산된 값을 기억해둔다는 뜻이다.
        - useMemo 는 의존성 배열을 받는다. 의존성 배열에 있는 값이 바뀌면 다시 계산한다는 뜻이다.
    - useCallback 을 사용한다.
        - useCallback 은 함수를 메모이제이션 한다는 뜻이다. 즉, 함수를 기억해둔다는 뜻이다.
        - useCallback 은 의존성 배열을 받는다. 의존성 배열에 있는 값이 바뀌면 다시 계산한다는 뜻이다.
