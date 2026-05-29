import type { MetadataRoute } from "next";

const SITE_URL = "https://www.refacademy.com.vn";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/tim-kiem"],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
