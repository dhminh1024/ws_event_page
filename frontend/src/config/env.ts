const env = {
  BASE_NAME: import.meta.env.VITE_BASE_NAME || "",
  ASSET_URL: import.meta.env.VITE_ASSET_URL || "",
  VERSION: import.meta.env.VITE_VERSION || "",
  PROVINCES_VN_API: import.meta.env.VITE_PROVINCES_VN_API || "",
  HAPPY_BOX:{
    TITLE_PAGE: "Tet Challenge - Thử thách đón Tết",
    DATE: import.meta.env.VITE_HAPPY_BOX_DATE || "",
  },
  HAPPY_RUN:{
    TITLE_PAGE: "Happy Run - Cuộc đua kỳ thú",
  }
}
export default env