'use client'

import React from 'react'
import { Button } from 'react-bootstrap'

export default function HairStyleControls(props: { addHair: () => void }) {
  return (
    // 右寄り
    <div className="d-flex justify-content-end">
      {/* 検索バー */}
      <input
        type="text"
        placeholder="Search.."
        name="search"
        className="mr-3"
      />

      {/* ソート */}
      <select name="cars" id="cars" className="mr-3">
        <option value="volvo">New</option>
        <option value="saab">Old</option>
      </select>

      {/* New Card modal */}

      <Button variant="primary" onClick={props.addHair}>
        追加
      </Button>
    </div>
  )
}
