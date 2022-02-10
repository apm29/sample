import remote from "@/remote/remote";

export function getPagedRateToday() {
  return remote.postForm({
    url: "v3/goods/front/huiLv/todayLv",
    silent: true,
  });
}
export function getPagedRate({ currency, endDate, startDate }) {
  return remote.postForm({
    url: "v3/goods/front/huiLv/query",
    data: { currency, endDate, startDate },
    silent: true,
  });
}
