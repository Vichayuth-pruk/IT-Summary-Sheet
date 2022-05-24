import React from "react"
import "../styles/spinner.css"

function Spinner() {
  return (
    <div className="overlay d-flex justify-content-center align-items-center">
      <div>
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem", zIndex: 20 }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Spinner
