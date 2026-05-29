"use client";

import { usePathname } from "next/navigation";
import Snowfall from "react-snowfall";

const SNOWFLAKE_COUNT = 50;

export function SnowfallEffect() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <Snowfall
            color="rgba(255, 255, 255, 0.82)"
            snowflakeCount={SNOWFLAKE_COUNT}
            radius={[0.5, 2]}
            speed={[0.35, 1.2]}
            wind={[-0.35, 0.45]}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 60,
                pointerEvents: "none",
            }}
        />
    );
}
