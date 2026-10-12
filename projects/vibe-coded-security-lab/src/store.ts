import { create } from 'zustand';

export type AppState =
  | 'LANDING'
  | 'FEEDBACK_APP'
  | 'FEEDBACK_SUBMITTED'
  | 'ADMIN'
  | 'SECURITY_LAB_TRANSITION'
  | 'SECURITY_LAB'
  | 'SQL_INVESTIGATION'
  | 'SQL_ATTACK'
  | 'SQL_EXPLANATION'
  | 'SQL_FIX'
  | 'SQL_VERIFIED'
  | 'XSS_INVESTIGATION'
  | 'XSS_ATTACK'
  | 'XSS_EXPLANATION'
  | 'XSS_FIX'
  | 'XSS_VERIFIED'
  | 'SECRET_INVESTIGATION'
  | 'SECRET_FOUND'
  | 'SECRET_FIXED'
  | 'AUTH_INVESTIGATION'
  | 'AUTH_ATTACK'
  | 'AUTH_FIXED'
  | 'LAB_COMPLETE'
  | 'PLAYBOOK'
  | 'AI_REVIEW'
  | 'SECURITY_PROMPT'
  | 'SECURITY_PIPELINE'
  | 'FINAL_VERIFICATION'
  | 'BEFORE_AFTER'
  | 'FINAL_JOURNEY'
  | 'FINALE';

export type ModuleStatus = 'UNVERIFIED' | 'VERIFIED';

interface PresentationStore {
  state: AppState;
  presentationMode: boolean;
  soundEnabled: boolean;
  setState: (newState: AppState) => void;
  setPresentationMode: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  reset: () => void;
  
  sqlStatus: ModuleStatus;
  xssStatus: ModuleStatus;
  secretStatus: ModuleStatus;
  authStatus: ModuleStatus;
  
  setSqlStatus: (status: ModuleStatus) => void;
  setXssStatus: (status: ModuleStatus) => void;
  setSecretStatus: (status: ModuleStatus) => void;
  setAuthStatus: (status: ModuleStatus) => void;
}

export const useStore = create<PresentationStore>()((set) => ({
  state: 'LANDING',
  presentationMode: false,
  soundEnabled: false,
  setState: (state) => set({ state }),
  setPresentationMode: (presentationMode) => set({ presentationMode }),
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  reset: () => set({ 
    state: 'LANDING',
    sqlStatus: 'UNVERIFIED',
    xssStatus: 'UNVERIFIED',
    secretStatus: 'UNVERIFIED',
    authStatus: 'UNVERIFIED'
  }),
  
  sqlStatus: 'UNVERIFIED',
  xssStatus: 'UNVERIFIED',
  secretStatus: 'UNVERIFIED',
  authStatus: 'UNVERIFIED',
  
  setSqlStatus: (sqlStatus) => set({ sqlStatus }),
  setXssStatus: (xssStatus) => set({ xssStatus }),
  setSecretStatus: (secretStatus) => set({ secretStatus }),
  setAuthStatus: (authStatus) => set({ authStatus })
}));
