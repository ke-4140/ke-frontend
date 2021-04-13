import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const systemSlice = createSlice({
  name: 'system',
  initialState: {
    logo: "KE",
    pdfTotalPages: null,
    youtubeURL: "",
    frames: [],
    keyframes: [],
    frameScriptDuple: null,
    owner: null,
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
    setFrameScriptDuple: (state, action) => {
      state.frameScriptDuple = action.payload;
    },
    setPdfTotalPages: (state, action) => {
      state.pdfTotalPages = action.payload;
    },
    setContents: (state, action) => {
      state.contents = action.payload;
    },
    addKeyframes: (state, action) => {
      state.keyframes = state.keyframes.concat(action.payload);
    },
    loadKeyframe: (state, action) => {
      state.frames = state.frames.map(
        (frame, i) => i === action.payload ? { ...frame, isExtracted: true, isKey: true } : frame);
    },
  },
});

export const { loadKeyframe, addKeyframes, setOwner, setYoutubeURL, setFrames, setFrameScriptDuple, setPdfTotalPages, setContents } = systemSlice.actions;


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
      // console.log(res.data.data);
      // console.log(res.data.data.outputs.length);
      var attributesJSON = JSON.parse(res.data.data.job.attributes);
      if (res.data.data.outputs.length == 0 && res.data.data.job.status == "running") {
        console.log('length:', attributesJSON.length);
        // also add other important data about the video 
        dispatch(initilizeFrames(attributesJSON.length));
      }
      else if (res.data.data.job.status == "finished") {
        console.log('thanks im done');
      }
      else {
        console.log(res.data.data.outputs[0].id);
        dispatch(addKeyframes(res.data.data.outputs));
        dispatch(fetchKeyFrames(res.data.data.outputs[0].id))
      }
    })
    .catch(err => {
      console.log(err.status);
      console.log(err.response);
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
    console.log(index, ":",keyframe);
    // dispatch(loadKeyframe(keyframe.vid_time));
    newFrames[keyframe.vid_time] = {...newFrames[keyframe.vid_time],  isExtracted: true, isKey: true  };
  });

  // newFrames[1].isExtracted = true;
  // newFrames[1].isKey = true;
  dispatch(setFrames(newFrames));
};

export const initilizeFrames = (numOfFrames) => (dispatch, getState) => {

  console.log('SYSTEM/initilizeFrames')
  var seconds = numOfFrames;
  var testFrames = Array.from({ length: seconds }, (v, k) => k).map(k => ({
    id: `init-${k}`,
    label: "",
    isExtracted: false,
    isKey: false
  }));

  dispatch(setFrames(testFrames));

};

export const processFrameScriptDuple = (n) => dispatch => {

  //fetch from server
  var TestFrameScriptDuple = Array.from({ length: 16 }, (v, k) => k).map(k => ({
    id: `fsd-${k}`,
    frame: (k % 2 == 0) ? "http://ke.ddns.net/api/image?src=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DVlSK3W4fWK8&uuid=d943362f-41e2-4332-84aa-591f9010a72f&name=99_270_20210406T085336.jpg" : "https://images.unsplash.com/photo-1478915765319-04e68e890018?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1636&q=80",
    transcript: `test script ${k}`
  }));

  var contents = TestFrameScriptDuple.reduce(function (contents, key, index) {
    return (index % n == 0 ? contents.push([key])
      : contents[contents.length - 1].push(key)) && contents;
  }, []);

  console.log(TestFrameScriptDuple);
  console.log(contents);

  dispatch(setContents(contents));
  dispatch(setPdfTotalPages(TestFrameScriptDuple.length / n));
  dispatch(setFrameScriptDuple(TestFrameScriptDuple));
};


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectYoutubeURL = state => state.system.youtubeURL;
export const selectFrames = state => state.system.frames;
export const selectFrameScriptDuple = state => state.system.frameScriptDuple;
export const selectPdfTotalPages = state => state.system.pdfTotalPages;
export const selectContents = state => state.system.contents;

export default systemSlice.reducer;
