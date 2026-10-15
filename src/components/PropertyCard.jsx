// 物件カード（一覧表示・編集・削除ボタンを含む）
export default function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p className="property-rent">家賃: {property.rent.toLocaleString()}円</p>
      <p className="property-area">エリア: {property.area}</p>
      <p className="property-layout">間取り: {property.layout}</p>

      <div className="property-card-actions">
        <button type="button" onClick={() => onEdit(property)}>
          編集
        </button>
        <button type="button" onClick={() => onDelete(property.id)}>
          削除
        </button>
      </div>
    </div>
  )
}
