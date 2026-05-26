"use client";

import React from "react";
import { reportGameError } from "@/logic/debug/errorReporter";
import { GameCrashScreen } from "./GameCrashScreen";

type ErrorBoundaryState = {
  errorCode?: string;
};

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error) {
    return { errorCode: `react-${error.name}-${Date.now()}` };
  }

  componentDidCatch(error: Error) {
    const report = reportGameError({
      type: "unknown_error",
      message: error.message,
      screen: typeof window !== "undefined" ? window.location.pathname : "unknown",
      safeState: { component: "ErrorBoundary" },
    });
    this.setState({ errorCode: report.id });
  }

  render() {
    if (this.state.errorCode) return <GameCrashScreen errorCode={this.state.errorCode} />;
    return this.props.children;
  }
}
