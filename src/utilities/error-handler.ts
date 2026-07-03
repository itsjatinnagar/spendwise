import { showGlobalError } from "@/contexts/toast-context";

// Save the original handler if it exists
const originalHandler = typeof global !== "undefined" && (global as any).ErrorUtils?.getGlobalHandler();

if (typeof global !== "undefined" && (global as any).ErrorUtils) {
  (global as any).ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
    console.error("Caught global JS Error:", error, "isFatal:", isFatal);

    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Show toast for non-fatal or fatal error before proceeding
    showGlobalError(`App Exception: ${errorMessage}`);

    if (originalHandler) {
      originalHandler(error, isFatal);
    }
  });
}

// Unhandled Promise Rejections tracker configuration
try {
  const tracking = require("promise/setimmediate/rejection-tracking");
  tracking.enable({
    allRejections: true,
    onUnhandled: (id: any, error: any) => {
      console.error("Caught unhandled Promise Rejection:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : typeof error === "object" && error !== null 
          ? JSON.stringify(error) 
          : String(error);

      showGlobalError(`Promise Error: ${errorMessage}`);
    },
    onHandled: () => {},
  });
} catch (e) {
  console.log("Promise rejection-tracking setup skipped or not supported in this environment");
}
