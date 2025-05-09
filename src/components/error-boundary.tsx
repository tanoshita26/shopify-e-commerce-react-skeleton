import React from "react"
import * as Sentry from "@sentry/gatsby"

interface Props {
  error: any
  errorInfo: any
  eventId: string
}

class ErrorBoundary extends React.Component<{ children: any }, Props> {
  constructor(props: { children: any } | Readonly<{ children: any }>) {
    super(props)
    this.state = { error: null, errorInfo: null, eventId: "" }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    // You can also log error messages to an error reporting service here
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId, errorInfo, error })
    })
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}

export default ErrorBoundary
