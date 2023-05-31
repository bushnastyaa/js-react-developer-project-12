import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
/* eslint  no-param-reassign: 0 */

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter
  .getInitialState({ currentChannelId: null, defaultChannelId: 1 });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setChannelId: ((state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = state.defaultChannelId;
      }
    }),
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
