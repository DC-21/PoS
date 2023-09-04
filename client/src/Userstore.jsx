import create from 'zustand';

const useUserStore = create((set) => ({
  userName: '',
  setUserName: (name) => set({ userName: name }),
}));

export default useUserStore;
