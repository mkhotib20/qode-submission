import { createContext } from 'react';

import type { AuthContextType } from './models/types';

const AuthContext = createContext<AuthContextType>({});

export default AuthContext;
