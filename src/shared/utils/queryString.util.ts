export const formatQueryString = <T extends Record<string, any>>(params: T) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
  const queryString = new URLSearchParams(filteredParams as any).toString();

  if (queryString) {
    return `?${queryString}`;
  } else {
    return "";
  }
};
