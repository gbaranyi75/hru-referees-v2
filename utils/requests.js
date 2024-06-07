const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all calendars
async function fetchCalendarData() {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/dashboard/calendar`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function createNewCalendar(request) {
  try {
    const res = await fetch(`${apiDomain}/dashboard/calendar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: request.name,
        days: request.days,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed fetch data");
    }

    return res.json();
  } catch (error) {}
}

async function updateCalendarData(id, request) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/dashboard/calendar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: request.name,
        days: request.days,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { fetchCalendarData, createNewCalendar, updateCalendarData };
