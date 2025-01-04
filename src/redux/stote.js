import { configureStore } from "@reduxjs/toolkit";
import clickTextSlice from "./clickTextSlice";
import clickURLSlice from "./clickURLSlice";
import clickImageSlice from "./clickImageSlice";
import clickVideoSlice from "./clickVideoSlice";
import clickRecordSlice from "./clickRecordSlice";
import clickAudioSlice from "./clickAudioSlice";
import typeModelSlice from "./typeModelSlice";
import clickDeleteSlice from "./clickDeletefile";
import clickDataIdTypeSlice from "./clickDataIdType";
import clickSelectData from "./clickSelectData";
import activeToolbox from "./activeToolboxSlice";
import activeCustomize from "./activeCustomizeSlice";
import activeTools from "./activeToolsSlice";
import GloabalDefaultValue from "./GloabalDefaultValue";
export const store = configureStore({
  reducer: {
    clickText: clickTextSlice,
    clickUrl: clickURLSlice,
    clickImage: clickImageSlice,
    clickVideo: clickVideoSlice,
    clickRecord: clickRecordSlice,
    clickAudio: clickAudioSlice,
    typeModel: typeModelSlice,
    clickDelete: clickDeleteSlice,
    toolbox: activeToolbox,
    customize: activeCustomize,
    tools: activeTools,
    clickIdType: clickDataIdTypeSlice,
    clickSelect: clickSelectData,
    globalDefaultValue: GloabalDefaultValue,
  },
});
