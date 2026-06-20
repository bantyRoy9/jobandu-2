'use client'
import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/admin-api'

interface ContactData {
  id: string
  company_name: string
  street: string
  zip_code: string
  city: string
  country: string
  phone: string
  email: string
}

export default function ContactManagementPage() {
  const [contact, setContact] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    company_name: '',
    street: '',
    zip_code: '',
    city: '',
    country: '',
    phone: '',
    email: ''
  })

  const fetchContact = async () => {
    try {
      const data = await adminApi.getContactInfo()
      setContact(data)
      setFormData({
        company_name: data.company_name,
        street: data.street,
        zip_code: data.zip_code,
        city: data.city,
        country: data.country,
        phone: data.phone,
        email: data.email
      })
    } catch (err) {
      console.error('Failed to fetch contact info:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContact()
  }, [])

  const handleSave = async () => {
    if (!contact) return

    try {
      await adminApi.updateContactInfo(contact.id, formData)
      await fetchContact()
      setIsEditing(false)
    } catch (err) {
      alert('Failed to update contact information')
      console.error(err)
    }
  }

  const handleCancel = () => {
    if (contact) {
      setFormData({
        company_name: contact.company_name,
        street: contact.street,
        zip_code: contact.zip_code,
        city: contact.city,
        country: contact.country,
        phone: contact.phone,
        email: contact.email
      })
    }
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="admin-content">
        <h1 className="admin-heading">Contact Information</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div className="admin-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="admin-heading">Contact Information</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn-primary">
            Edit Contact Info
          </button>
        )}
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid var(--color-border)', maxWidth: '800px' }}>
        {isEditing ? (
          <>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
              Edit Contact Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              <div>
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Street Address *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div>
                  <label className="form-label">Zip Code *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Country *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Phone *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
              Current Contact Information
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Company Name</p>
                <p style={{ fontSize: '16px', fontWeight: 500 }}>{contact?.company_name}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Address</p>
                <p style={{ fontSize: '16px', fontWeight: 500 }}>
                  {contact?.street}<br />
                  {contact?.zip_code} {contact?.city}<br />
                  {contact?.country}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Phone</p>
                <p style={{ fontSize: '16px', fontWeight: 500 }}>{contact?.phone}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Email</p>
                <p style={{ fontSize: '16px', fontWeight: 500 }}>{contact?.email}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
