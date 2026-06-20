'use client'
import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/admin-api'

interface Job {
  id: string
  title: string
  location: string
  apply_url: string | null
  is_active: boolean
}

export default function JobsManagementPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    apply_url: '',
    is_active: true
  })

  const fetchJobs = async () => {
    try {
      const data = await adminApi.getJobs()
      setJobs(data)
    } catch (err) {
      console.error('Failed to fetch jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // fetchJobs()
  }, [])

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      location: job.location,
      apply_url: job.apply_url || '',
      is_active: job.is_active
    })
    setIsCreating(false)
  }

  const handleCreate = () => {
    setIsCreating(true)
    setEditingJob(null)
    setFormData({
      title: '',
      location: '',
      apply_url: '',
      is_active: true
    })
  }

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        apply_url: formData.apply_url || null
      }

      if (editingJob) {
        await adminApi.updateJob(editingJob.id, payload)
      } else {
        await adminApi.createJob(payload)
      }
      
      await fetchJobs()
      setEditingJob(null)
      setIsCreating(false)
      setFormData({
        title: '',
        location: '',
        apply_url: '',
        is_active: true
      })
    } catch (err) {
      alert('Failed to save job')
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return
    
    try {
      await adminApi.deleteJob(id)
      await fetchJobs()
    } catch (err) {
      alert('Failed to delete job')
      console.error(err)
    }
  }

  const handleToggleActive = async (job: Job) => {
    try {
      await adminApi.updateJob(job.id, { ...job, is_active: !job.is_active })
      await fetchJobs()
    } catch (err) {
      alert('Failed to update job status')
      console.error(err)
    }
  }

  const handleCancel = () => {
    setEditingJob(null)
    setIsCreating(false)
    setFormData({
      title: '',
      location: '',
      apply_url: '',
      is_active: true
    })
  }

  if (loading) {
    return (
      <div className="admin-content">
        <h1 className="admin-heading">Job Listings</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div className="admin-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="admin-heading">Job Listings</h1>
        {!isCreating && !editingJob && (
          <button onClick={handleCreate} className="btn-primary">
            + Add Job Listing
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingJob) && (
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
            {editingJob ? 'Edit Job Listing' : 'Create Job Listing'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Job Title *</label>
              <input
                type="text"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Location *</label>
              <input
                type="text"
                className="form-input"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Application URL (optional)</label>
              <input
                type="text"
                className="form-input"
                value={formData.apply_url}
                onChange={(e) => setFormData({ ...formData, apply_url: e.target.value })}
                placeholder="Leave empty to use default apply modal"
              />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span className="form-label" style={{ margin: 0 }}>Active (visible on website)</span>
              </label>
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

      {/* Jobs Table */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'var(--color-bg-tertiary)', borderBottom: '1px solid var(--color-border)' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>Job Title</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>Location</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '14px', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 16px' }}>{job.title}</td>
                <td style={{ padding: '12px 16px' }}>{job.location}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button
                    onClick={() => handleToggleActive(job)}
                    style={{
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      background: job.is_active ? '#d4edda' : '#f8d7da',
                      color: job.is_active ? '#155724' : '#721c24'
                    }}
                  >
                    {job.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleEdit(job)}
                    style={{ marginRight: '8px', padding: '4px 12px', fontSize: '14px' }}
                    className="btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    style={{ padding: '4px 12px', fontSize: '14px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            No job listings found. Click "Add Job Listing" to create one.
          </div>
        )}
      </div>
    </div>
  )
}
