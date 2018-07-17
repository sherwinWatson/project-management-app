import {LOGIN} from '../user/actions'

export const GET_STORYBOARD = 'STORYBOARD::GET'
export const GET_STORYBOARD_SUCCESS = 'STORYBOARD::GET_SUCCESS'
export const GET_STORYBOARD_ERROR = 'STORYBOARD::GET_ERROR'

export const ADD_STORYBOARD = 'STORYBOARD::ADD'
export const ADD_STORYBOARD_SUCCESS = 'STORYBOARD::ADD_SUCCESS'
export const ADD_STORYBOARD_ERROR = 'STORYBOARD::ADD_ERROR'

export const GET_STORYBOARD_DETAIL = 'STORYBOARD::GET_DETAIL'
export const GET_STORYBOARD_DETAIL_SUCCESS = 'STORYBOARD::GET_SUCCESS_DETAIL'
export const GET_STORYBOARD_DETAIL_ERROR = 'STORYBOARD::GET_ERROR_DETAIL'

export const GET_ONE_SECTION = 'SECTION::GET'
export const GET_ONE_SECTION_SUCCESS = 'SECTION::GET_SUCCES'
export const GET_ONE_SECTION_ERROR = 'SECTION::GET_ERROR'

export const ADD_STORYBOARD_DETAIL = 'STORYBOARD::ADD_DETAIL'
export const ADD_STORYBOARD_DETAIL_SUCCESS = 'STORYBOARD::ADD_SUCCESS_DETAIL'
export const ADD_STORYBOARD_DETAIL_ERROR = 'STORYBOARD::ADD_ERROR_DETAIL'

export const MODIFY_STORYBOARD_DETAIL = 'STORYBOARD::MODIFY_DETAIL'
export const MODIFY_STORYBOARD_DETAIL_SUCCESS = 'STORYBOARD::MODIFY_SUCCESS_DETAIL'
export const MODIFY_STORYBOARD_DETAIL_ERROR = 'STORYBOARD::MODIFY_ERROR_DETAIL'

export const REMOVE_STORYBOARD_DETAIL = 'STORYBOARD::REMOVE_DETAIL'
export const REMOVE_STORYBOARD_DETAIL_SUCCESS = 'STORYBOARD::REMOVE_SUCCESS_DETAIL'
export const REMOVE_STORYBOARD_DETAIL_ERROR = 'STORYBOARD::REMOVE_ERROR_DETAIL'

export const GET_TEMPLATE_LIST = 'STORYBOARD::GET_TEMPLATE'
export const GET_TEMPLATE_LIST_SUCCESS = 'STORYBOARD::GET_TEMPLATE_SUCCESS'
export const GET_TEMPLATE_LIST_ERROR = 'STORYBOARD::GET_TEMPLATE_ERROR'

export const GET_USER_STORYBOARD = 'USER_STORYBOARD::GET'
export const GET_USER_STORYBOARD_SUCCESS = 'USER_STORYBOARD::GET_SUCCESS'
export const GET_USER_STORYBOARD_ERROR = 'USER_STORYBOARD::GET_ERROR'

export const ADD_USER_STORYBOARD = 'USER_STORYBOARD::ADD'
export const ADD_USER_STORYBOARD_SUCCESS = 'USER_STORYBOARD::ADD_SUCCESS'
export const ADD_USER_STORYBOARD_ERROR = 'USER_STORYBOARD::ADD_ERROR'

export const getStoryboard = () => {
  return {
    type: GET_STORYBOARD,
  }
}

export const addStoryboard = (name, description, startDate, finishDate) => {
  return {
    type: ADD_STORYBOARD,
    payload: {
      name: name,
      description,
      startDate,
      finishDate,
    },
  }
}

export const getStoryboardDetail = (storyboardId) => {
  return {
    type: GET_STORYBOARD_DETAIL,
    payload: {
      storyboardId,
    },
  }
}

export const getOneSection = (sectionId) => {
  return {
    type: GET_ONE_SECTION,
    payload: {
      sectionId,
    }
  }
}

export const addStoryboardDetail = (storyboardId, subject, details, targetDate) => {
  return {
    type: ADD_STORYBOARD_DETAIL,
    payload: {
      storyboardId,
      subject,
      details,
      targetDate,
    },
  }
}

export const modifyStoryboardDetail = (storyboardId, subject, details, targetDate) => {
  return {
    type: MODIFY_STORYBOARD_DETAIL,
    payload: {
      storyboardId,
      subject,
      details,
      targetDate,
    },
  }
}

export const removeStoryboardDetail = (storyboardId) => {
  return {
    type: REMOVE_STORYBOARD_DETAIL,
    payload: {
      storyboardId,
    },
  }
}

export const getTemplateList = () => {
  return {
    type: GET_TEMPLATE_LIST,
  }
}

export const getUserStoryboard = (storyboardId) => {
  console.log('actions getuserstoryboard')
  return {
    type: GET_USER_STORYBOARD,
    payload: {
      storyboardId,
    },
  }
}

export const addUserStoryboard = (storyboardId, userId) => {
  return {
    type: ADD_USER_STORYBOARD,
    payload: {
      storyboardId,
      userId,
    },
  }
}