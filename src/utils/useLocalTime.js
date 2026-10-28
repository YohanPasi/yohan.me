import { useEffect, useState } from "react";

// Returns "HH:MM" for the given IANA time zone, refreshed every 15s.
export const useLocalTime = (timeZone = "Asia/Colombo") => {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
};
