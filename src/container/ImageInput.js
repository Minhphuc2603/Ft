import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';

// Import face profile
const JSON_PROFILE = require('../descriptors/bnk48.json');

// Initial State
const INIT_STATE = {
  imageURL: null,
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null
};

function ImageInput() {
  const [state, setState] = useState({ ...INIT_STATE, faceMatcher: null });

  useEffect(() => {
    const initialize = async () => {
      await loadModels();
      let faceMatcher = await createMatcher(JSON_PROFILE);
      setState(prevState => ({
        ...prevState,
        faceMatcher: faceMatcher
      }));
      await handleImage(state.imageURL);
    };

    initialize();
  }, [state.imageURL]);

  const handleImage = async (image = state.imageURL) => {
    await getFullFaceDescription(image).then(fullDesc => {
      if (!!fullDesc) {
        setState(prevState => ({
          ...prevState,
          fullDesc,
          detections: fullDesc.map(fd => fd.detection),
          descriptors: fullDesc.map(fd => fd.descriptor)
        }));
      }
    });

    if (!!state.descriptors && !!state.faceMatcher) {
      let match = await state.descriptors.map(descriptor =>
        state.faceMatcher.findBestMatch(descriptor)
      );
      setState(prevState => ({ ...prevState, match }));
    }
  };

  const handleFileChange = async event => {
    resetState();
    await setState(prevState => ({
      ...prevState,
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true
    }));
    handleImage();
  };

  const resetState = () => {
    setState({ ...INIT_STATE });
  };

  const { imageURL, detections, match } = state;


  return (
    <div>
      <input
        id="myFileUpload"
        type="file"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png"
      />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <img src={imageURL} alt="imageURL" />
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
