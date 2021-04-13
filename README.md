Keyframe Extractor 2021 @ CUHK CSCI4140 

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `Core Module 0: Uploader`
Functions: 
1. Paste Youtube link 

### `Core Module 1: Editor`
Functions: 
1. Direct edit by interacting with Youtube iFrame 
2. Server-rendered keyframes based on screen similarity 
3. Support adding/removing keyframes
4. Support keyframe preview
5. Helper text enabled to notify editing actions 

### `Core Module 2: Preview`
Functions: 
1. Modify PDF and page name
2. Toggle Keyframe Analysis
3. Support transcription and editable text areas

### `Core Module 3: Export`
Functions: 
1. Export PDF which texts are selectable. (Specifically for revision)

### `Externally libraries`
1. axios - for https request
2. react - frontend framework
3. react-redux - state management 
4. react-youtube - for youtube player iframe support
5. react-infinite-scroll - to optimizie render for long elements 