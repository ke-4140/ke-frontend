import { createSlice } from '@reduxjs/toolkit';

export const systemSlice = createSlice({
  name: 'system',
  initialState: {
    logo: "KE",
    pdfTotalPages: null,
    youtubeURL: "",
    frames: null,
    frameScriptDuple: null,
  },
  reducers: {
    setYoutubeURL: (state, action) => {
      state.youtubeURL = action.payload;
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
    setContents:(state, action) => {
      state.contents = action.payload;
    }
  },
});

export const { setYoutubeURL, setFrames, setFrameScriptDuple, setPdfTotalPages, setContents} = systemSlice.actions;

export const fetchKeyFrames = (x) => dispatch => {

  var seconds = 1000;
  var testFrames = Array.from({length: seconds}, (v, k) => k).map(k => ({
    id: `f-${k}`,
    label: "",
    isExtracted: false,
    isKey: false
  }));

  for (var i = 0; i < seconds; i + 5) {
    testFrames[i].isExtracted = true;
    testFrames[i].isKey = true;
  }
  console.log(testFrames);
  //fetch from server
  dispatch(setFrames(testFrames));
};

export const processFrameScriptDuple = (n) => dispatch => {

    //fetch from server
  var TestFrameScriptDuple = Array.from({ length: 16 }, (v, k) => k).map(k => ({
    id: `fsd-${k}`,
    frame: (k % 2 == 0) ? "https://images.unsplash.com/photo-1526762100-0999d11d611c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2091&q=80" : "https://images.unsplash.com/photo-1478915765319-04e68e890018?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1636&q=80",
    transcript: `test script ${k}`
  }));

  var contents = TestFrameScriptDuple.reduce(function (contents, key, index) {
    return (index % n == 0 ? contents.push([key])
      : contents[contents.length - 1].push(key)) && contents;
  }, []);
  
  console.log(TestFrameScriptDuple);
  console.log(contents);

  dispatch(setContents(contents));
  dispatch(setPdfTotalPages(TestFrameScriptDuple.length/n));
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
