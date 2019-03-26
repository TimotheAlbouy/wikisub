import axios from "axios";

//Unique ID
export const id = () => '_' + Math.random().toString(36).substr(2, 9);

export const reduceCueList = cues => {
  let reducedCueList = [];
  const reduce = ({text, startTime, endTime, ref}) => ({text, startTime, endTime, ref});
  cues.forEach(cue => newCuesList.push(reduce(cue)));
  return reducedCueList;
};

export const checkUrl = async url => {
  try {
    await axios.head(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const toCreateToUpdate = cues => {
  let toCreate = [];
  let toUpdate = [];
  const reduce = ({text, startTime, endTime, ref}) => ({text, startTime, endTime, ref});
  for (let cue of cues) {
    if (cue.toCreate)
      toCreate.push(reduce(cue));
    else if (cue.toUpdate)
      toUpdate.push(reduce(cue));
  }
  return [toCreate, toUpdate];
}
