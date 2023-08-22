import { create } from 'zustand';
import axios from 'axios';

const useTransactionStore = create((set) => ({
  transactions: [],
  updateClosedStatusInDB: async (transactionId) => {
    try {
      const response = await axios.put(`http://localhost:3006/transactions/${transactionId}`);

      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === transactionId ? { ...t, closed: true } : t
        ),
      }));
    } catch (error) {
      console.error('Error updating closed status:', error);
    }
  },
  markAllAsClosed: () =>
    set((state) => ({
      transactions: state.transactions.map((t) => ({ ...t, closed: true })),
    })),
}));

export default useTransactionStore;
