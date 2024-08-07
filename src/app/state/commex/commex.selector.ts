import { createSelector } from "@ngrx/store";
import { CommexState } from "../../services/Interfaces/commexState";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { mainPort } from "../../app.component";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";


interface AppState {
  commexs: CommexState
}

interface CollegeCommexState {
  collegeCommexs: CommexState
}
export const selectFeature = (state: AppState) => state.commexs

export const selectCollegeCommexFeature = (state: CollegeCommexState) => state.collegeCommexs

export const isLoadingSelector = createSelector(selectFeature,
  (state) => state.isLoading
)
export const postLoadingSelector = createSelector(selectFeature,
  (state) => state.postLoading
)

export const deleteLoadingSelector = createSelector(selectFeature,
  (state) => state.deleteLoading
)
export const commexSelector = createSelector(selectFeature,
  (state) => state.commexs
)

export const commexSelectorOne = (commex_ID: number) => createSelector(selectFeature,
  (state) => getCommexDetail(commex_ID, state.commexs)
)
export const filterCommexSelector = (startDate: string, endDate: string) => createSelector(selectFeature,
  (state) => parsedCommex(filterDateRange(startDate, endDate, state.commexs), mainPort)
)

export const errorSelector = createSelector(selectFeature,
  (state) => state.error
)

export const parsedCommexSelector = createSelector(selectFeature,
  (state) => parsedCommex(state.commexs, mainPort)
)

export const latestCommexSelector = createSelector(selectFeature,
  (state) => latestCommex(state.commexs, mainPort)
)
export const isLoadingCollegeCommexSelector = createSelector(selectCollegeCommexFeature,
  (state) => state.isLoading
)

export const parsedCollegeCommexSelector = createSelector(selectCollegeCommexFeature,
  (state) => parsedCommex(state.commexs, mainPort)
)
export const filterCollegeCommexSelector = (startDate: string, endDate: string) => createSelector(selectCollegeCommexFeature,
  (state) => parsedCommex(filterDateRange(startDate, endDate, state.commexs), mainPort)
)

// For filter educ
export const filterEducSelector = (startDate: string, endDate: string) => createSelector(selectCollegeCommexFeature,
  (state) => parsedCommex(filterDateRange(startDate, endDate, state.commexs), mainPort)
)

export const latestCollegeCommexSelector = createSelector(selectCollegeCommexFeature,
  (state) => latestCommex(state.commexs, mainPort)
)


export const deleteCollegeLoadingSelector = createSelector(selectCollegeCommexFeature,
  (state) => state.deleteLoading
)

function parsedCommex(commexs: CommunityExtension[], mainPort: string) {
  const commexsCopy = dateSorter(commexs)

  const modifiedCommex = commexsCopy.map(commex => ({
    ...commex,
    commex_header_img: mainPort + commex.commex_header_img
  }))

  return modifiedCommex
}

function dateSorter(commexs: CommunityExtension[]) {
  const commexsCopy = [...commexs];

  commexsCopy.sort(function (a, b) {
    return new Date(b.commex_date).valueOf() - new Date(a.commex_date).valueOf();
  })

  return commexsCopy
}

function latestCommex(commexs: CommunityExtension[], mainPort: string) {

  if(commexs.length <= 0) return null
  const commexsCopy = dateSorter(commexs)
  const latestCommex = {
    ...commexsCopy[0],
    commex_header_img: mainPort + commexsCopy[0].commex_header_img
  }

  return latestCommex
}

const filterCommexByDate = (commexs: CommunityExtension[], startDate: Date, endDate: Date) => {
  return commexs.filter(commex => {
    const date = new Date(commex.commex_date);
    return !isNaN(date.getTime()) && date >= startDate && date <= endDate;
  });
};

function filterDateRange(startDateStr: string, endDateStr: string, commexs: CommunityExtension[]) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  console.log(startDate)
  console.log(endDate)
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    // throw new Error('Invalid start or end date');
    return commexs;
  }


  const filteredCommexs = filterCommexByDate(commexs, startDate, endDate);
  return filteredCommexs;
}

function filterEducDateRange(startDateStr: string, endDateStr: string, educ: EducationalAttainment[]) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    // throw new Error('Invalid start or end date');
    return educ;
  }

  const filteredEduc = filterEducByDate(educ, startDate, endDate);
  return filteredEduc;
}

const filterEducByDate = (educ: EducationalAttainment[], startDate: Date, endDate: Date) => {
  return educ.filter(x => {
    const date = new Date(x.year_start);
    return !isNaN(date.getTime()) && date >= startDate && date <= endDate;
  });
};


function getCommexDetail (commex_ID: number, commex: CommunityExtension[]) {
  console.log("Hello there")
  const commexCopy = [...commex]
  console.log(commexCopy.filter(item => item.commex_ID == commex_ID))
  return commexCopy.filter(item => item.commex_ID == commex_ID)[0]
}
