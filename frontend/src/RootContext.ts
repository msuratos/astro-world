import { createContext } from 'react';

const initialValue = { accessToken: '' };
const RootContext = createContext(initialValue);

export default RootContext;