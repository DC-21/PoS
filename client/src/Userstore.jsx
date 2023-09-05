import {create} from 'zustand';

const useUserStore = create((set) => ({
  userName: '',
  setUserName: (name) => set({ userName: name }),
  resetUserName: () => set({ userName: '' }),
}));

export default useUserStore;
