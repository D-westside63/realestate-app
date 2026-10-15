import { useState } from 'react'

// 物件の新規登録・編集で共通利用するフォーム
export default function PropertyForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [name, setName] = useState(initialValue?.name ?? '')
  const [rent, setRent] = useState(initialValue?.rent ?? '')
  const [area, setArea] = useState(initialValue?.area ?? '')
  const [layout, setLayout] = useState(initialValue?.layout ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      name,
      rent: Number(rent),
      area,
      layout,
    })
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label htmlFor="name">物件名</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="rent">家賃（円）</label>
      <input
        id="rent"
        type="number"
        min="0"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
        required
      />

      <label htmlFor="area">エリア</label>
      <input
        id="area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        required
      />

      <label htmlFor="layout">間取り</label>
      <input
        id="layout"
        placeholder="例: 1LDK"
        value={layout}
        onChange={(e) => setLayout(e.target.value)}
        required
      />

      <div className="property-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : '保存'}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
