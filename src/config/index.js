/*
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-02-17 13:57:36
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-31 18:51:00
 * @FilePath: /src/config/index.js
 */
module.exports = {
  // Determine whether the environment is dev or pro
  title: "IM NOTE BY MONkEY",
  process_env: "dev",
  baseURL: "http://localhost:3000", //后端服务器地址,
  agentsUrl: "http://localhost:3000",

  driver: {
    className: "driver-class",
    opacity: 0.5,
    doneBtnText: "好的", // Text on the final button
    closeBtnText: "知道了", // Text on the close button for this step
    stageBackground: "rbga(255,255,255,0.2)",
    nextBtnText: "下一步",
    prevBtnText: "上一步", // Previous button text for this step
  },

  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyLWlkIjoyMDI0OTcsInVzZXItcm9sZXMiOlsiY29uc3VtZXIiXSwiZXhwIjoxNjI2ODU0MTQ1LCJpYXQiOjE2MTEyMTU3NDUsInZlcnNpb24iOjF9._eGwafVt5kohLchahC-EvfkeoFN2fJGsJVQfo3f6x94",
  companyOptions: ["JET", "SiCepat", "TIKI", "JNE"],
  statusOptions: ["processing", "intransit", "delivered", "returned", "refund"],
};
