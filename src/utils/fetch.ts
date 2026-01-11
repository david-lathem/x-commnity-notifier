import { CommunityResultsResponse } from "./typings/types.js";

export const searchForMemberXApi = async (
  communityId: string,
  username: string
) => {
  const variableParam = encodeURIComponent(
    JSON.stringify({
      communityId,
      prefix: username,
    })
  );

  const featuresParam = encodeURIComponent(
    JSON.stringify({
      responsive_web_graphql_timeline_navigation_enabled: "true",
    })
  );

  console.log({ variableParam, featuresParam });

  const res = await fetch(
    `https://x.com/i/api/graphql/wLq8nJhuzS5Tzq2p-dgIlw/CommunityMemberRelationshipTypeahead?variables=${variableParam}&features=${featuresParam}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA", // static
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",

        "x-csrf-token": process.env.CSRF_TOKEN,
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "en",

        cookie: process.env.COOKIE,
        Referer: `https://x.com/i/communities/${communityId}/members`,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
      },
    }
  );

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok || contentType.includes("text")) {
    const data = await res.text();
    console.log(res);
    console.log(data);
    throw new Error(`Error on fetch ${res.status} (${res.statusText})`);
  }

  const data: CommunityResultsResponse = await res.json();

  if(!data?.data?.communityResults || !data.data.communityResults.result || !data.data.communityResults.result.member_relationship_typeahead){
    
  console.log(data)
    console.log(data?.data?.communityResults.result)
  }
  return data.data.communityResults.result.member_relationship_typeahead;
};
