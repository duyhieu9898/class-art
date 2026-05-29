import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(
                    cookiesToSet: {
                        name: string;
                        value: string;
                        options?: Record<string, unknown>;
                    }[]
                ) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const { user, error } = await getUser(supabase);

    const isLoginPage = request.nextUrl.pathname === "/admin/login";

    if (isMissingRefreshTokenError(error)) {
        clearSupabaseAuthCookies(request, supabaseResponse);

        if (!isLoginPage) {
            const url = request.nextUrl.clone();
            url.pathname = "/admin/login";
            const redirectResponse = NextResponse.redirect(url);
            clearSupabaseAuthCookies(request, redirectResponse);
            return redirectResponse;
        }
    }

    // Redirect authenticated users away from login page
    if (isLoginPage && user) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    // Redirect unauthenticated users to login page
    if (!isLoginPage && !user) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}

async function getUser(supabase: ReturnType<typeof createServerClient>) {
    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        return { user, error };
    } catch (error) {
        return { user: null, error };
    }
}

function isMissingRefreshTokenError(error: unknown) {
    if (!error || typeof error !== "object") return false;

    return "code" in error && error.code === "refresh_token_not_found";
}

function clearSupabaseAuthCookies(request: NextRequest, response: NextResponse) {
    request.cookies
        .getAll()
        .filter(({ name }) => name.startsWith("sb-") && name.includes("-auth-token"))
        .forEach(({ name }) => {
            request.cookies.delete(name);
            response.cookies.set(name, "", { maxAge: 0, path: "/" });
        });
}

export const config = {
    matcher: ["/admin/:path*"],
};
