const env = {
  BASE_NAME: import.meta.env.VITE_BASE_NAME || "",
  ASSET_URL: import.meta.env.VITE_ASSET_URL || "",
  VERSION: import.meta.env.VITE_VERSION || "",
  PROVINCES_VN_API: import.meta.env.VITE_PROVINCES_VN_API || "",
  HAPPY_BOX:{
    TITLE_PAGE: "Tet Challenge - Thử thách đón Tết",
    DATE: import.meta.env.VITE_HAPPY_BOX_DATE || "",
  },
  NUTRITION_JOURNEY:{
    TITLE_PAGE: "Hành Trình Dinh Dưỡng - Những Thay Đổi Nhỏ – Cùng Con Khôn Lớn",

  }
}
export default env