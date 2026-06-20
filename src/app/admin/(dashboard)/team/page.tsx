'use client'
import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/admin-api'

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  phone: string | null
  email: string
}

export default function TeamManagementPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'Sales',
    phone: '',
    email: ''
  })

  const fetchMembers = async () => {
    try {
      const data = await adminApi.getTeamMembers()
      setMembers(data)
    } catch (err) {
      console.error('Failed to fetch team members:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      department: member.department,
      phone: member.phone || '',
      email: member.email
    })
    setIsCreating(false)
  }

  const handleCreate = () => {
    setIsCreating(true)
    setEditingMember(null)
    setFormData({
      name: '',
      role: '',
      department: 'Sales',
      phone: '',
      email: ''
    })
  }

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        phone: formData.phone || null
      }

      if (editingMember) {
        await adminApi.updateTeamMember(editingMember.id, payload)
      } else {
        await adminApi.createTeamMember(payload)
      }
      
      await fetchMembers()
      setEditingMember(null)
      setIsCreating(false)
      setFormData({
        name: '',
        role: '',
        department: 'Sales',
        phone: '',
        email: ''
      })
    } catch (err) {
      alert('Failed to save team member')
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    
    try {
      await adminApi.deleteTeamMember(id)
      await fetchMembers()
    } catch (err) {
      alert('Failed to delete team member')
      console.error(err)
    }
  }

  const handleCancel = () => {
    setEditingMember(null)
    setIsCreating(false)
    setFormData({
      name: '',
      role: '',
      department: 'Sales',
      phone: '',
      email: ''
    })
  }

  if (loading) {
    return (
      <div className="admin-content">
        <h1 className="admin-heading">Team Management</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div className="admin-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="admin-heading">Team Management</h1>
        {!isCreating && !editingMember && (
          <button onClick={handleCreate} className="btn-primary">
            + Add Team Member
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingMember) && (
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
            {editingMember ? 'Edit Team Member' : 'Create Team Member'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <div>
              <label className="form-label">Role *</label>
              <input
                type="text"
                className="form-input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Department *</label>
              <select
                className="form-input"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="Sales">Sales</option>
                <option value="Recruiting">Recruiting</option>
                <option value="Customer Support">Customer Support</option>
              </select>
            </div>
            <div>
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button onClick={handleSave} className="btn-primary">
              Save
            </button>
            <button onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Team Members Table */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'var(--color-bg-tertiary)', borderBottom: '1px solid var(--color-border)' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>Role</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>Department</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>Phone</th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '14px', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 16px' }}>{member.name}</td>
                <td style={{ padding: '12px 16px' }}>{member.role}</td>
                <td style={{ padding: '12px 16px' }}>{member.department}</td>
                <td style={{ padding: '12px 16px' }}>{member.email}</td>
                <td style={{ padding: '12px 16px' }}>{member.phone || '—'}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleEdit(member)}
                    style={{ marginRight: '8px', padding: '4px 12px', fontSize: '14px' }}
                    className="btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    style={{ padding: '4px 12px', fontSize: '14px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {members.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            No team members found. Click "Add Team Member" to create one.
          </div>
        )}
      </div>
    </div>
  )
}
