import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const systemSlice = createSlice({
  name: 'system',
  initialState: {
    logo: "KE",
    extractionDetails: null,
    attributes: null,
    youtubeURL: "",
    frames: [],
    keyframes: [],
    totalVideoTime: 0,
    frameScriptTuple: null,
    owner: null,
    jobIsCompleted: false,
    extractionProgress: 0,
    loadedFramesNum: 600,
  },
  reducers: {
    setYoutubeURL: (state, action) => {
      state.youtubeURL = action.payload;
    },
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
    setFrames: (state, action) => {
      state.frames = action.payload;
    },
    setFrameScriptTuple: (state, action) => {
      state.frameScriptTuple = action.payload;
    },
    setAttributes: (state, action) => {
      state.attributes = action.payload;
    },
    setContents: (state, action) => {
      state.contents = action.payload;
    },
    addKeyframes: (state, action) => {
      state.keyframes = state.keyframes.concat(action.payload);
    },
    appendKeyFrame: (state, action) => {
      state.keyframes = [{ vid_time: action.payload.index, img_addr: action.payload.imgAddr, userCreated: true }, ...state.keyframes];
    },
    completesJob: (state, action) => {
      state.jobIsCompleted = true
    },
    setExtractionProgress: (state, action) => {
      state.extractionProgress = action.payload
    },
    addLoadedFramesNum: (state, action) => {
      state.loadedFramesNum = (state.loadedFramesNum + 600) > state.totalVideoTime ? state.totalVideoTime : (state.loadedFramesNum + 600)
    },
    setTotalVideoTime: (state, action) => {
      state.totalVideoTime = action.payload
    },
    setExtractionDetails: (state, action) => {
      state.extractionDetails = action.payload
    },
    setKeyFrames: (state, action) => {
      state.keyframes = action.payload
    },
    toggleKeyframeFromFrame: (state, action) => {
      state.frames = state.frames.map(
        (frame, i) => i === action.payload.index ? { ...frame, isKey: action.payload.status, imgAddr: action.payload.imgAddr } : frame);
    }
  },
});

export const { toggleKeyframeFromFrame, setKeyFrames, setExtractionDetails, setTotalVideoTime, addLoadedFramesNum, setExtractionProgress, completesJob, appendKeyFrame, addKeyframes, setOwner, setYoutubeURL, setFrames, setFrameScriptTuple, setAttributes, setContents } = systemSlice.actions;


export const postYoutubeSrc = (link, history) => dispatch => {

  console.log('SYSTEM/postYoutubeSrc')
  dispatch(setYoutubeURL(link));
  return axios.post(`http://ke.ddns.net/api/job`, { src: link })
    .then(res => {
      dispatch(setOwner(res.data.data.owner));
      history.push("/editor");
    })
    .catch(err => {
      console.log(err.status);
    });
};

export const getJobStatus = () => (dispatch, getState) => {

  const owner = getState().system.owner;
  const src = getState().system.youtubeURL;
  const attributes = getState().system.attributes;
  const frames = getState().system.frames;
  console.log('SYSTEM/getJobStatus')
  // console.log("frames: ", frames);

  return axios.get(`http://ke.ddns.net/api/job`, {
    params: {
      uuid: owner,
      src: src
    }
  })
    .then(res => {

      var attributesJSON = JSON.parse(res.data.data.job.attributes);
      if (attributes==null)
        dispatch(setAttributes(attributesJSON));
      dispatch(addKeyframes(res.data.data.outputs));
      dispatch(fetchKeyFrames(res.data.data.outputs[0].id))
      dispatch(setExtractionProgress(Math.round(res.data.data.outputs[res.data.data.outputs.length - 1].vid_time * 100 / attributesJSON.length)));

      if (res.data.data.job.status == "finished") {
        console.log('Job completed');
        dispatch(completesJob());
        dispatch(setExtractionProgress(100));
      }
    })
    .catch(err => {
      // console.log(err.status);
      // console.log(err.response);
    });
};

export const fetchKeyFrames = (start) => (dispatch, getState) => {

  console.log('SYSTEM/fetchKeyFrames')
  var frames = [];
  var newFrames = [...getState().system.frames];
  var keyframes = [...getState().system.keyframes];

  //array.copy 

  //only handles sub array 
  // state.frames = state.frames.map(
  //   (frame, i) => i === action.payload ? { ...frame, isExtracted: true, isKey: true } : frame);
  // console.log("keyframes a:", keyframes);
  // console.log("frames a:", newFrames);

  keyframes.map((keyframe, index) => {
    newFrames[keyframe.vid_time] = { ...newFrames[keyframe.vid_time], imgAddr: keyframe.img_addr, isExtracted: keyframe.userCreated ? false : true, isKey: true };
  });

  dispatch(setFrames(newFrames));
};

export const initializeFrames = (numOfFrames) => (dispatch, getState) => {

  dispatch(setTotalVideoTime(numOfFrames));

  // console.log(numOfFrames);
  var seconds = numOfFrames;
  var testFrames = Array.from({ length: seconds }, (v, k) => k).map(k => ({
    id: `init-${k}`,
    label: "",
    isExtracted: false,
    isKey: false
  }));
  dispatch(setFrames(testFrames));

};



export const processFrameScriptTuple = (n) => (dispatch, getState) => {

  console.log('SYSTEM/processFrameScriptTuple')
  var keyframes = [...getState().system.keyframes];
  keyframes.sort(compare);
  var youtubeURL = getState().system.youtubeURL;

  var timestampsStrings = "[0";
  keyframes.map((keyframe, index) => (
    timestampsStrings += ',' + keyframe.vid_time.toString()
  ));
  timestampsStrings += ']'

  const options = {
    method: 'GET',
    url: 'http://ke.ddns.net/api/transcript',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    params: { // was data: {
      src: youtubeURL,
      timestamps: timestampsStrings
    }
  };

  function getRows(text_length){
    var m_breakpoint = 280;
    var l_breakpoint = 700;
    var xl_breakpoint = 1200;

    if(text_length > xl_breakpoint)
    return 4
    else if (text_length > l_breakpoint)
    return 3
    else if (text_length > m_breakpoint)
    return 2
    else return 1;
    
  }

  axios.request(options).then(function (response) {
    var contents = Array.from({ length: keyframes.length }, (v, k) => k).map(k => ({
      id: `fsd-${k}`,
      frame: keyframes[k].img_addr,
      transcript: response.data.data[k].text,
      layoutTypeRows: getRows(response.data.data[k].text.length)
    }));

    // console.log(contents)
    dispatch(setContents(contents));
  }).catch(function (error) {
    console.log(error);
  });
};

export const fetchNewKeyFrame = (index, status) => (dispatch, getState) => {

  console.log('SYSTEM/fetchNewKeyFrame');
  var youtubeURL = getState().system.youtubeURL;
  var frameNum = parseInt(index) * 30;
  var addr = 'http://ke.ddns.net/api/frame?src=' + youtubeURL + ' &frame_no=' + frameNum;
  dispatch(toggleKeyframeFromFrame({ index: index, status: status, imgAddr: addr }));
  if (status) //add
    dispatch(appendKeyFrame({ index: index, status: status, imgAddr: addr }));
  else { //remove
    var keyframes = [...getState().system.keyframes].filter(keyframe => keyframe.vid_time != index);
    dispatch(setKeyFrames(keyframes));
  }
};

function compare(a, b) {
  if (a.vid_time < b.vid_time) {
    return -1;
  }
  if (a.vid_time > b.vid_time) {
    return 1;
  }
  return 0;
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const setLoadedFramesNum = state => state.system.loadedFramesNum;
export const selectJobIsCompleted = state => state.system.jobIsCompleted;
export const selectExtractionProgress = state => state.system.extractionProgress;
export const selectYoutubeURL = state => state.system.youtubeURL;
export const selectFrames = state => state.system.frames;
export const selectFrameScriptTuple = state => state.system.frameScriptTuple;
export const selectAttributes = state => state.system.attributes;
export const selectContents = state => state.system.contents;

export default systemSlice.reducer;
