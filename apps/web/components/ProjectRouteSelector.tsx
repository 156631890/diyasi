"use client";

import { trackConversionEvent } from "@/lib/conversion-events";
import { moqRoutes } from "@/lib/moq-routes";

export type ProjectRouteId = (typeof moqRoutes)[number]["id"];

type ProjectRouteSelectorProps = {
  value?: ProjectRouteId;
  onChange?: (route: ProjectRouteId) => void;
  scrollTargetId?: string;
};

export default function ProjectRouteSelector({ value, onChange, scrollTargetId }: ProjectRouteSelectorProps) {
  function selectRoute(route: ProjectRouteId) {
    const locale = window.location.pathname === "/es" || window.location.pathname.startsWith("/es/") ? "es" : "en";
    trackConversionEvent("low_moq_route_selected", {
      path: window.location.pathname,
      locale,
      projectRoute: route
    });
    onChange?.(route);

    if (scrollTargetId && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("projectRoute", route);
      window.history.replaceState(null, "", url);
      window.dispatchEvent(new CustomEvent<ProjectRouteId>("diyasi-project-route", { detail: route }));
      document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {moqRoutes.map((route) => (
        <button
          key={route.id}
          type="button"
          className={`rounded-lg border p-5 text-left transition ${
            value === route.id
              ? "border-[#0f5f55] bg-[#eef6f3] shadow-sm"
              : "border-[#d9e2dc] bg-white hover:border-[#88afa3] hover:bg-[#fffdf8]"
          }`}
          aria-pressed={value === route.id}
          onClick={() => selectRoute(route.id)}
        >
          <p className="text-sm font-bold text-[#1d2521]">{route.title}</p>
          <p className="mt-2 text-sm font-semibold text-[#0f5f55]">{route.value}</p>
          <p className="mt-2 text-sm leading-6 text-[#5f6b66]">{route.summary}</p>
        </button>
      ))}
    </div>
  );
}
