import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
} from '../lib/properties'
import PropertyForm from '../components/PropertyForm'
import PropertyCard from '../components/PropertyCard'

// 物件一覧画面（ログイン後に表示、自分が登録した物件のみSupabaseから取得する）
export default function PropertyListPage() {
  const { user, signOut } = useAuth()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // フォームの表示状態（null: 非表示, 'create': 新規登録, 'edit': 編集）
  const [formMode, setFormMode] = useState(null)
  const [editingProperty, setEditingProperty] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage('物件一覧の取得に失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClick = () => {
    setEditingProperty(null)
    setFormMode('create')
  }

  const handleEditClick = (property) => {
    setEditingProperty(property)
    setFormMode('edit')
  }

  const handleCancelForm = () => {
    setFormMode(null)
    setEditingProperty(null)
  }

  const handleSubmitForm = async (values) => {
    setSubmitting(true)
    setErrorMessage('')
    try {
      if (formMode === 'edit' && editingProperty) {
        const updated = await updateProperty(editingProperty.id, values)
        setProperties((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        )
      } else {
        const created = await createProperty({ userId: user.id, ...values })
        setProperties((prev) => [created, ...prev])
      }
      setFormMode(null)
      setEditingProperty(null)
    } catch (error) {
      setErrorMessage('物件の保存に失敗しました。')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('この物件を削除しますか？')
    if (!confirmed) return

    setErrorMessage('')
    try {
      await deleteProperty(id)
      setProperties((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      setErrorMessage('物件の削除に失敗しました。')
    }
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <h1>物件一覧</h1>
        <div className="property-header-right">
          <span className="user-email">{user?.email}</span>
          <button type="button" onClick={signOut}>
            ログアウト
          </button>
        </div>
      </header>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {formMode ? (
        <PropertyForm
          initialValue={editingProperty}
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
          submitting={submitting}
        />
      ) : (
        <button
          type="button"
          className="property-add-button"
          onClick={handleCreateClick}
        >
          ＋ 新規物件を登録
        </button>
      )}

      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録されている物件はありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
