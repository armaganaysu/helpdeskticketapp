import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTicketForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title || !description) {
      setError('Başlık ve açıklama alanları zorunludur.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/tickets', {
        title,
        description,
      });
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Talep oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
      console.error(err);
    }
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
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
    transition: 'background-color 0.2s',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '1rem',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={formGroupStyle}>
        <label htmlFor="title" style={labelStyle}>
          Başlık
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="description" style={labelStyle}>
          Açıklama
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: '150px' }}
          required
        ></textarea>
      </div>
      {error && <p style={errorStyle}>{error}</p>}
      <button type="submit" style={buttonStyle} disabled={loading}>
        {loading ? 'Gönderiliyor...' : 'Talep Oluştur'}
      </button>
    </form>
  );
};

export default CreateTicketForm;
