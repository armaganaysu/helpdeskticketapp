import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('Ticket ID from URL:', id);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/tickets/${id}`);
        console.log('Fetched ticket data from API:', response.data);
        setTicket(response.data);
        setFormData({
            title: response.data.title,
            description: response.data.description,
            status: response.data.status,
            priority: response.data.priority,
        });
        setError(null);
      } catch (err) {
        setError('Talep detayları yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting updated ticket data:', formData);
    try {
      setLoading(true);
      await axios.put(`/api/tickets/${id}`, formData);
      navigate('/');
    } catch (err) {
      setError('Talep güncellenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const formStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>Yükleniyor...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', fontSize: '1.5rem', color: 'red' }}>{error}</div>;
  }

  if (!ticket) {
    return <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>Talep bulunamadı.</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Talebi Düzenle</h2>
      <div style={formGroupStyle}>
        <label htmlFor="title" style={labelStyle}>Başlık</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} style={inputStyle} />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="description" style={labelStyle}>Açıklama</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} style={{...inputStyle, height: '150px'}} />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="status" style={labelStyle}>Durum</label>
        <select name="status" id="status" value={formData.status} onChange={handleChange} style={inputStyle}>
          <option value="Açık">Açık</option>
          <option value="İşlemde">İşlemde</option>
          <option value="Kapandı">Kapandı</option>
        </select>
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="priority" style={labelStyle}>Öncelik</label>
        <select name="priority" id="priority" value={formData.priority} onChange={handleChange} style={inputStyle}>
          <option value="Düşük">Düşük</option>
          <option value="Normal">Normal</option>
          <option value="Yüksek">Yüksek</option>
        </select>
      </div>

      <button type="submit" style={buttonStyle} disabled={loading}>
        {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
      </button>
    </form>
  );
};

export default TicketDetail;
