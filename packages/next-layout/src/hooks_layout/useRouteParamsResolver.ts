import { NextRouter, useRouter } from "next/router";
import { useMemo } from "react";

type ResolveRouteProps<T extends Record<string, unknown>> = {
  [K in keyof T]: (router: NextRouter) => T[K] | undefined;
};

export type UseRouteParamsResolverParams<
  PageProps extends Record<string, unknown> = {},
  ResolvedPageProps extends Record<string, unknown> = {}
> = [PageProps, ResolveRouteProps<ResolvedPageProps>];

export type UseRouteParamsResolverReturn<
  PageProps extends Record<string, unknown> = {},
  ResolvedPageProps extends Record<string, unknown> = {}
> =
  | { status: "loading" }
  | { status: "success"; props: PageProps & ResolvedPageProps }
  | { status: "error" };

export default function useRouteParamsResolver<
  PageProps extends Record<string, unknown> = {},
  ResolvedPageProps extends Record<string, unknown> = {}
>(
  ...[pageProps, resolvers]: UseRouteParamsResolverParams<
    PageProps,
    ResolvedPageProps
  >
): UseRouteParamsResolverReturn<PageProps, ResolvedPageProps> {
  const router = useRouter();

  return useMemo(() => {
    const resolvedProps: ResolvedPageProps = {} as ResolvedPageProps;

    if (resolvers && Object.keys(resolvers).length) {
      if (!router.isReady) {
        return { status: "loading" };
      }

      for (const resolvingProp of Object.keys(resolvers)) {
        const resolvedProp = resolvers[resolvingProp]?.(router);
        if (resolvedProp === undefined) {
          return { status: "error" };
        }
        resolvedProps[resolvingProp as keyof ResolvedPageProps] = resolvedProp;
      }
    }

    return {
      status: "success",
      props: {
        ...(pageProps ?? null),
        ...(resolvedProps ?? null),
      },
    };
  }, [resolvers, pageProps, router]);
}
