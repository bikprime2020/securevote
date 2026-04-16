import { u as useAuth, e as useRole, j as jsxRuntimeExports, k as Skeleton, N as Navigate } from "./index-DqjjyDVW.js";
function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/"
}) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  if (authLoading || isAuthenticated && requiredRole && roleLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container py-16 flex flex-col gap-4 items-center",
        "data-ocid": "protected_route.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-72" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-60" })
        ]
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: redirectTo });
  }
  if (requiredRole && role !== requiredRole) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: redirectTo });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  ProtectedRoute as P
};
