import type { MetadataRoute } from "next";

// Lets women add आधी ती to their phone's home screen like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "आधी ती · AADHI TI",
    short_name: "आधी ती",
    description: "तिच्या प्रत्येक प्रश्नासाठी. सुरक्षितता, आरोग्य, हक्क, पोषण, योजना आणि कमाई — मराठी, हिंदी आणि English मध्ये.",
    lang: "mr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fdf2f4",
    theme_color: "#7e1738",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
