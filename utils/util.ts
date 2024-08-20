/* eslint-disable no-else-return */
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';

// const fetch = fetchRetry(originalFetch, {
//   retries: 3,
//   retryDelay: 100,
// });

const persistentRandomNumber = Math.random();

export const HOST =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_HOST_DEV
    : process.env.REACT_APP_HOST;
export const EMBED_HOST = 'https://embed.tour.video/';

export const USER_ID_COOKIE_KEY = '_lm_user_id';
export const USER_INFO_COOKIE_KEY = '_lm_user_info';
export const VISIT_ID_COOKIE_KEY = '_lm_visit_id';
export const VISIT_ID_EXPIRATION_MS = 3600000; // 1 hour = 1 * 60 * 60 * 1000

export const USER_IP_KEY = '_lm_user_ip';
export const USER_LOCATION_KEY = '_lm_user_location';

const cookies = new Cookies();
const metadata = {};

const request = async (route, data, method = 'GET') => {
  const headers = new Headers();
  let json;

  if (method === 'POST') {
    headers.append('Content-Type', 'application/json');
  }

  try {
    let queryString = '';
    if (method === 'GET') {
      // Build query string for GET
      queryString += `?${Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join('&')}`;
    }

    let url = '';
    if (route.includes('http')) {
      url = route + queryString;
    } else {
      url = HOST + route + queryString;
    }

    const res = await fetch(url, {
      method,
      headers,
      // Only pass body for POST
      ...(method === 'POST' && { body: JSON.stringify(data) }),
      credentials: 'include',
    });

    try {
      const text = await res.text();
      json = JSON.parse(text);
    } catch (err) {
      json = { status: 'fail', error: `Request returned invalid JSON: ${err}` };
    }
  } catch (err) {
    json = { status: 'fail', error: `Failed to make request: ${err}` };
  }

  if (json.status === 'fail' || json.error) {
    console.error(json.error);
  }
  return json;
};

export const get = request;
export const post = (route, data) => request(route, data, 'POST');

// TODO: This should probably be part of React state
// Maybe make a useAnalytics hook that provides analytics event methods
export const setMagnetId = (magnetId) => {
  metadata.magnetId = magnetId;
  return magnetId;
};

export const getMagnetId = () => metadata.magnetId;

export const setUserId = (userId) => {
  const userIdAlreadyfound =
    localStorage.getItem(USER_ID_COOKIE_KEY) || cookies.get(USER_ID_COOKIE_KEY);
  if (!userIdAlreadyfound) {
    cookies.set(USER_ID_COOKIE_KEY, userId);
    localStorage.setItem(USER_ID_COOKIE_KEY, userId);
  }
};

export const setUserIp = (ip) => {
  const userIpAlreadyfound = localStorage.getItem(USER_IP_KEY);
  if (!userIpAlreadyfound) {
    localStorage.setItem(USER_IP_KEY, ip);
  }
};

export const getUserIp = (ip) => {
  let ip_temp = localStorage.getItem(USER_IP_KEY);
  if (ip_temp === null) {
    ip_temp = '';
  }
  return ip_temp;
};

export const setUserLocation = (locationObj) => {
  const userLocationAlreadyfound = localStorage.getItem(USER_LOCATION_KEY);
  if (!userLocationAlreadyfound) {
    localStorage.setItem(USER_LOCATION_KEY, JSON.stringify(locationObj));
  }
};

export const refreshUserLocationAndIp = async (locationObj) => {
  post('/ip_to_location', {}).then((res) => {
    console.log('/ip_to_location', res);
    setUserLocation(res?.location || {});
    setUserIp(res?.ip || '');
  });
};

export const getUserLocation = () => {
  // console.log('locationRes getUserLocation', JSON.parse(localStorage.getItem(USER_LOCATION_KEY) || ""))
  let location_temp = localStorage.getItem(USER_LOCATION_KEY);
  if (location_temp === null) {
    location_temp = '{}';
  }
  console.log('locationRes getUserLocation', JSON.parse(location_temp));
  return JSON.parse(location_temp);
};

// Note that this is async and you need to use `await`!
export const getUserId = async () => {
  let userId =
    localStorage.getItem(USER_ID_COOKIE_KEY) || cookies.get(USER_ID_COOKIE_KEY);
  if (!userId) {
    userId = uuidv4();
    setUserId(userId);
    // generate visitor UUID and send to backend
    post('/visitor', { visitor_uuid: userId }).then((res) => {
      if (res.visitor_uuid && !res.error) {
        console.log('/visitor', res, res.ip);
        userId = res.visitor_uuid; // New UUID generated on the backend
        // setUserId(userId);

        const { ip } = res;
        const { location } = res;
        setUserIp(ip);
        setUserLocation(location);
      }
    });
    // Note that we shouldn't reset the visit ID here if we didn't have a visitor ID,
    // since if we have a valid visit ID we can get the visitor ID from that
  }
  // console.log('locationRes getUserId: ',!getUserLocation() , !getUserIp()  )
  if (!getUserLocation() || !getUserIp()) {
    refreshUserLocationAndIp();
  }
  console.log('userId', userId);
  return userId;
};

export const getUserIdLocally = () => {
  return (
    localStorage.getItem(USER_ID_COOKIE_KEY) || cookies.get(USER_ID_COOKIE_KEY)
  );
};

export const scaleConvoFeedback = (name = '', email = '', number = '') => {
  console.log('scaleConvoFeedbackTYG: ', name, email, number);

  // const tourpixel = JSON.parse(localStorage.getItem('tourpixel'));
  // const pixelHistory = tourpixel?.[getMagnetId()];
  const location = getUserLocation();

  const raw = JSON.stringify({
    magnet_uuid: getMagnetId(),
    visitor_uuid: "d9f6e24a-e226-4480-807b-bcef3d70586a",
    name,
    email,
    number,
    location: `${location?.city || ''}, ${location?.state || ''}, ${
      location?.country || ''
    }`,
    wait_time: '95',
  });

  const requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'https://chat.scaleconvo.com/create_convo/tour_feedback',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export const replaceUserInfo = (string) => {
  if (!string) return string;
  // Some text elements in template may contain elements to fill with user
  // data, e.g. Welcome{{, {name}|}}! Glad you could join us, {{{name}|friend}}
  // Left side of | is key to use, right is alternative if key isn't available
  // Just allowing one replacement per {{}} block right now
  let startReplacement;
  let str = string;
  // eslint-disable-next-line no-cond-assign
  while ((startReplacement = str.indexOf('{{')) !== -1) {
    const separator = str.indexOf('|', startReplacement + 2);
    const stringWithKey = str.slice(startReplacement + 2, separator);

    const endReplacement = str.indexOf('}}', separator + 1);
    const alternative = str.slice(separator + 1, endReplacement);

    // Find key to replace
    const keyToReplaceStart = str.indexOf('{', startReplacement + 2);
    const keyToReplaceEnd = str.indexOf('}', keyToReplaceStart + 1);
    const keyToReplace = str.slice(keyToReplaceStart + 1, keyToReplaceEnd);

    const replacement =
      metadata?.userInfo[keyToReplace] && keyToReplaceEnd < separator
        ? stringWithKey.replace(
            `{${keyToReplace}}`,
            metadata.userInfo[keyToReplace]
          )
        : alternative;

    str =
      str.slice(0, startReplacement) +
      replacement +
      str.slice(endReplacement + 2);
  }
  return str;
};

export const getIsMobile = () => {
  return (
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0) &&
    window.innerHeight > window.innerWidth
  );
};

export const replaceStringwithdynamicvariable = (string, dynamicvariable) => {
  if (!string) return string;
  // original string Take a tour {{and {special_offer} | }}
  // Converted_String Take a tour and $250 off floor plans
  // Some text elements in template may contain elements to fill with user
  // data, e.g. Welcome{{, {name}|}}! Glad you could join us, {{{name}|friend}}
  // Left side of | is key to use, right is alternative if key isn't available
  // Just allowing one replacement per {{}} block right now
  let startReplacement;
  let str = string;
  // eslint-disable-next-line no-cond-assign
  while ((startReplacement = str.indexOf('{{')) !== -1) {
    const separator = str.indexOf('|', startReplacement + 2);
    const stringWithKey = str.slice(startReplacement + 2, separator);

    const endReplacement = str.indexOf('}}', separator + 1);
    const alternative = str.slice(separator + 1, endReplacement);

    // Find key to replace
    const keyToReplaceStart = str.indexOf('{', startReplacement + 2);
    const keyToReplaceEnd = str.indexOf('}', keyToReplaceStart + 1);
    const keyToReplace = str.slice(keyToReplaceStart + 1, keyToReplaceEnd);

    const replacement =
      dynamicvariable[keyToReplace] && keyToReplaceEnd < separator
        ? stringWithKey.replace(
            `{${keyToReplace}}`,
            dynamicvariable[keyToReplace]
          )
        : alternative;

    str =
      str.slice(0, startReplacement) +
      replacement +
      str.slice(endReplacement + 2);
  }
  return str;
};

export const updateDynamicVariables = (magnetTemplate, magnetConfig) => {
  if (magnetTemplate.dynamic) {
    const buttonLabel = replaceStringwithdynamicvariable(
      magnetConfig?.buttonLabel,
      magnetTemplate?.dynamic
    );

    return {
      ...magnetConfig,
      ...magnetTemplate.dynamic,
      buttonLabel,
    };
  }

  return magnetConfig;
};

export const addScreenLocally = (
  template,
  __custom__,
  __intro__,
  screenobj,
  setAsStartScreen = false
) => {
  const obj = {
    ...template,
    category_keys: [...template.category_keys, __custom__],
    categories: {
      ...template.categories,
      [__custom__]: {
        screens: {
          [__intro__]: screenobj,
        },
        screen_keys: [__intro__],
      },
    },
    start_route: setAsStartScreen,
  };

  return obj;
  // console.log('screeenn',obj)
  // window.startscreenobj = obj
};

// Remove special characters (except -)
const replace = (str) =>
  str?.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');

export const setUserInfo = (userInfo) => {
  metadata.userInfo = {
    ...userInfo,
    name: replace(userInfo.name),
    phone: replace(userInfo.phone),
  };
  if (userInfo.name) {
    [metadata.userInfo.firstName, metadata.userInfo.lastName] =
      metadata.userInfo.name.split(/ (.+)/);
  }
  cookies.set(USER_INFO_COOKIE_KEY, metadata.userInfo);
};

export const getUserInfo = () => metadata.userInfo;

// Initialize metadata.userInfo
const userInfo = cookies.get(USER_INFO_COOKIE_KEY);
setUserInfo(userInfo && userInfo !== 'undefined' ? userInfo : {});

const getVisitIdExpirationDate = () => {
  const expiry = new Date();
  // Add time until expiration (in milliseconds)
  expiry.setTime(expiry.getTime() + VISIT_ID_EXPIRATION_MS);
  return expiry;
};

export const setVisitId = (visitId) => {
  cookies.set(VISIT_ID_COOKIE_KEY, visitId, {
    expires: getVisitIdExpirationDate(),
  });
};

// Note that this is async and you need to use `await`!
export const getVisitId = async () => {
  let visitId = cookies.get(VISIT_ID_COOKIE_KEY);
  if (!visitId) {
    // Send new visit info to backend and receive new visit UUID
    const res = await post('/visit', {
      magnet_uuid: getMagnetId(),
      visitor_uuid: await getUserId(),
    });
    if (res.visit_uuid && !res.error) {
      visitId = res.visit_uuid; // New UUID generated on the backend
    }
  }
  // Only update expiration time if we found UUID in cookies or successfully
  // fetched one from the backend
  if (visitId) {
    setVisitId(visitId); // Update visit ID cookie expiration time
  }
  return visitId;
};

export const getVisitIdLocally = () => {
  return cookies.get(VISIT_ID_COOKIE_KEY);
};

export const formatTimestamp = (time) => {
  // time in seconds => "hours:minutes:seconds"
  // Output like "1:01" or "4:03:59" or "123:03:59"
  const hrs = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const secs = Math.floor(time) % 60;

  let ret = '';
  if (hrs > 0) {
    ret += `${hrs}:${minutes < 10 ? '0' : ''}`;
  }
  ret += `${minutes}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;
  return ret;
};

export function checkCondition(condition) {
  if (!condition) {
    return true;
  }

  if (condition.type === 'compound') {
    if (condition.operator === 'or') {
      return condition.subConditions.reduce(
        (acc, subCondition) => acc || checkCondition(subCondition),
        true
      );
    } else {
      return condition.subConditions.reduce(
        (acc, subCondition) => acc && checkCondition(subCondition),
        true
      );
    }
  } else if (condition.type === 'date') {
    const today = new Date().getTime();

    if (condition.operator === '<') {
      return today < new Date(condition.value).getTime();
    } else if (condition.operator === '>') {
      return today > new Date(condition.value).getTime();
    } else if (condition.operator === '>=') {
      return today >= new Date(condition.value).getTime();
    } else if (condition.operator === '<=') {
      return today <= new Date(condition.value).getTime();
    } else if (condition.operator === '=') {
      return today === new Date(condition.value).getTime();
    }
  } else if (condition.type === 'url') {
    const currentUrl = window.location.href;

    if (condition.operator === 'includes') {
      return condition.value.reduce(
        (acc, url) => acc || currentUrl.includes(url),
        false
      );
    } else if (condition.operator === 'excludes') {
      return condition.value.reduce(
        (acc, url) => acc && !currentUrl.includes(url),
        false
      );
    } else if (condition.operator === 'exactly') {
      return condition.value.reduce(
        (acc, url) => acc || url === currentUrl,
        false
      );
    }
  } else if (condition.type === 'layout') {
    if (condition.operator === 'isDesktop') {
      return !getIsMobile();
    } else if (condition.operator === 'isMobile') {
      return getIsMobile();
    }
  } else if (condition.type === 'tourPixelHistory') {
    const tourpixel = JSON.parse(localStorage.getItem('tourpixel'));
    const relatedPixel = tourpixel?.[getMagnetId()]?.[condition.route] ?? 0;

    if (condition.operator === '<') {
      return relatedPixel < condition.value;
    } else if (condition.operator === '>') {
      return relatedPixel > condition.value;
    } else if (condition.operator === '>=') {
      return relatedPixel >= condition.value;
    } else if (condition.operator === '<=') {
      return relatedPixel <= condition.value;
    } else if (condition.operator === '=') {
      return relatedPixel === condition.value;
    }
  } else if (condition.type === 'probability') {
    return persistentRandomNumber < condition.value;
  } else if (
    condition.type === 'pathViewCount' ||
    condition.type === 'sessionPathViewCount'
  ) {
    const uservisitHistory = JSON.parse(
      localStorage.getItem('uservisitHistory') ?? '{}'
    );
    const pathViewCount =
      condition.type === 'pathViewCount'
        ? uservisitHistory.total?.pagesVisited?.reduce(
            (acc, { path }) => acc + (path === condition.route),
            0
          )
        : uservisitHistory[getVisitIdLocally()]?.pagesVisited?.reduce(
            (acc, { path }) => acc + (path === condition.route),
            0
          );

    if (condition.operator === '<=') {
      return pathViewCount <= condition.value;
    } else if (condition.operator === '<') {
      return pathViewCount < condition.value;
    } else if (condition.operator === '>') {
      return pathViewCount > condition.value;
    } else if (condition.operator === '>=') {
      return pathViewCount >= condition.value;
    } else if (condition.operator === '=') {
      return pathViewCount === condition.value;
    }
  } else if (condition.type === 'sessionCount') {
    const uservisitHistory = JSON.parse(
      localStorage.getItem('uservisitHistory') ?? '{}'
    );
    const sessionCount = Object.keys(uservisitHistory).length - 1;
    if (condition.operator === '<=') {
      return sessionCount <= condition.value;
    } else if (condition.operator === '<') {
      return sessionCount < condition.value;
    } else if (condition.operator === '>') {
      return sessionCount > condition.value;
    } else if (condition.operator === '>=') {
      return sessionCount >= condition.value;
    } else if (condition.operator === '=') {
      return sessionCount === condition.value;
    }
  } else {
    const tourBubbleHistory = JSON.parse(
      localStorage.getItem('tourBubbleHistory') || '{}'
    );
    if (condition.type === 'viewCount') {
      const currentViewCount =
        tourBubbleHistory?.[condition.route]?.viewCount ?? 0;
      if (condition.operator === '<=') {
        return currentViewCount <= condition.value;
      } else if (condition.operator === '<') {
        return currentViewCount < condition.value;
      } else if (condition.operator === '>') {
        return currentViewCount > condition.value;
      } else if (condition.operator === '>=') {
        return currentViewCount >= condition.value;
      } else if (condition.operator === '=') {
        return currentViewCount === condition.value;
      }
    } else if (condition.type === 'closeCount') {
      const currentCloseCount =
        tourBubbleHistory?.[condition.route]?.closeCount ?? 0;
      if (condition.operator === '<=') {
        return currentCloseCount <= condition.value;
      } else if (condition.operator === '<') {
        return currentCloseCount < condition.value;
      } else if (condition.operator === '>') {
        return currentCloseCount > condition.value;
      } else if (condition.operator === '>=') {
        return currentCloseCount >= condition.value;
      } else if (condition.operator === '=') {
        return currentCloseCount === condition.value;
      }
    }
  }

  return true;
}

function parseVtt(vttContent) {
  // Split the VTT content into individual caption blocks
  console.log("vttContent",vttContent)
  let captionBlocks = vttContent.trim().split('\n\n');
  // removing 'webvtt' on first index
  captionBlocks?.shift()
  const captions = captionBlocks.map((captionBlock) => {
    const [time, text] = captionBlock?.split('\n'); // Split into timestamp and text
    const [start, end] = time?.split(' --> ')?.map(parseTimestamp);

    return { start, end, text };
  });

  return captions;
}

// timestamps into seconds
function parseTimestamp(timestamp) {
  const parts = timestamp?.split(':');
  const seconds = parseFloat(parts?.pop());

  return parts?.reverse()?.reduce((acc, val, index) => acc + val * Math.pow(60, index), seconds);
}

export async function fetchAndParseVtt(vttUrl,setCaptions) {
  try {
    const response = await fetch(vttUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch VTT file: ${response.status} ${response.statusText}`);
    }
    const vttContent = await response.text();
    const captionsArray = parseVtt(vttContent);
    return captionsArray
  } catch (error) {
    console.error('Error fetching and parsing VTT file:', error);
    return []
  }
}

export function isMobileScreen() {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  // Define a maximum width and height for mobile screens
  const maxMobileWidth = 768; // Example value, adjust as needed
  const maxMobileHeight = 1024; // Example value, adjust as needed

  return screenWidth <= maxMobileWidth || screenHeight <= maxMobileHeight;
}

export const getProperty = async (entrata) => {
  try {
    // const data = await getEntrataData(integrationId);
    // console.log("data",data)
    const entratauser = entrata.username;
    const entratapass = entrata.password;
    const entratapropertyId = entrata.property_id;
    let entratadomain = entratauser.split("@")[1];
    let creds = {
      username: entratauser,
      password: entratapass,
    };
    if (entratadomain) {
      creds['entratadomain'] = entratadomain;
    }
    const res = await post(
      `/integrations/entrata/getPropertyinfo`,
      {
        creds: creds,
        propertyId: entratapropertyId,
      }
    );
    console.log("getPropertyinfo",res);
    return res?.data?.resp?.result?.PhysicalProperty?.Property[0];
  } catch (err) {
    console.log(err);
    console.log('getPropertyinfo.error', err);
  }
};


export const bookAppointment = async (
  uuid,
  obj,
  userInfo,
  entrata
) => {
  try {
    console.log('obj**', obj);
    console.log('entrata', entrata);
    const entratauser = entrata.username;
    const entratapass = entrata.password;
    const entratapropertyId = entrata.property_id;
    let data = {};
    if (entratauser && entratapass && entratapropertyId && uuid) {
      data = {
        username: entratauser,
        password: entratapass,
        property_id: entratapropertyId,
      };
    } else {
      //data = await getEntrataData(integrationId);
    }
    let form_data = {
      source: 'cta_tour_mini_app',
      lead_name: `${userInfo.firstname} ${userInfo.lastname}`,
      lead_phone: `+1${userInfo.phone}`,
      lead_email: userInfo.email,
      first_name: userInfo.firstname,
      last_name: userInfo.lastname,
      email: userInfo.email,
      phone: `+1${userInfo.phone}`,
      ...obj,
    };
    console.log('bookAppointment_obj', form_data);
    // saveLeadinDB(uuid, {
    //   form_data,
    //   form_route: null,
    //   video_time: 0,
    // });
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const getAvailablePropertyHours = (selectedDate, propertyInfo) => {
  let allHours = [
    '12:00 AM',
    '01:00 AM',
    '02:00 AM',
    '03:00 AM',
    '04:00 AM',
    '05:00 AM',
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
    '11:00 PM',
  ];

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let theDay = '';
  if (selectedDate) {
    theDay = weekDays[new Date(selectedDate).getDay()];
    console.log('theDay', theDay);
    console.log('OfficeHour', propertyInfo?.PropertyHours?.OfficeHours?.OfficeHour);
    let selectedDayObj = {};
    propertyInfo?.PropertyHours?.OfficeHours?.OfficeHour?.map((item) => {
      // get office hours from entrata
      if (item.Day == theDay) {
        selectedDayObj = item;
      }
    });
    console.log('selectedDayObj_available_hours_entrata', selectedDayObj);
    let availHours = [];

    const startindex = allHours.findIndex((item) => {
      return (
        `${Number(selectedDayObj?.OpenTime?.split(':')[0])}:${
          selectedDayObj?.OpenTime?.split(':')[1]
        }` === `${Number(item?.split(':')[0])}:${item?.split(':')[1]}`
      );
    });

    const endindex = allHours.findIndex((item) => {
      return (
        `${Number(item?.split(':')[0])}:${item?.split(':')[1]}` ===
        `${Number(selectedDayObj?.CloseTime?.split(':')[0])}:${
          selectedDayObj?.CloseTime?.split(':')[1]
        }`
      );
    });

    allHours.map((item, index) => {
      if (index >= startindex && index <= endindex) {
        availHours.push(item);
      }
    });
    return availHours;
  }
};

export const saveLeadinDB = async (magnet_uuid, details) => {
  post('/event', {
    //...getUrlParamsForEventData(),
    magnet_uuid,
    url: window.location.href,
    event_type: 'form_submission',
    details,
  })
};