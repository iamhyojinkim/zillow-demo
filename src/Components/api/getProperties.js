export default async function getProperties(slug) {
  const url =
    "https://eu-west-2.cdn.hygraph.com/content/cm2pfw22r0o2107mj0lu92cd7/master";
  if (!url) {
    throw new Error("failure");
  } else {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query MyQuery {
  properties {
    images {
      fileName
      url
    }
    id
    description
    beds
    parking
    pool
    petFriendly
    slug
    managingBroker {
      name
      phoneNumber
    }
    location {
      latitude
      longtitude
    }
    name
    rentalPrice
  }
}`,
      }),
    });
    const res = await response.json();
    const properties = res.data.properties;
    return properties;
  }
}
