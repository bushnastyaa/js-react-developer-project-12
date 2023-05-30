import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
/* eslint  no-param-reassign: 0 */

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannel: (state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = action.payload;
      }
    },
  },
});
  
export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
