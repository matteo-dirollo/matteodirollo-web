import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalType, modalProps } = action.payload;
      return { modalType, modalProps };
    },
    closeModal: () => null,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
