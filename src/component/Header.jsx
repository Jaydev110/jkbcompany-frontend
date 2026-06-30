import React from 'react'

const Header = () => {
  return (
    <div
      style={{
        background: "#003366",
        color: "white",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <img
        src="https://thumbs.dreamstime.com/b/jkb-letter-initial-logo-design-vector-illustration-236630354.jpg"
        alt="Logo"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          marginRight: "15px"
        }}
      />

      <h1 style={{ color: "white", margin: 0 }}>
        JKB Company
      </h1>
    </div>
  )
}

export default Header