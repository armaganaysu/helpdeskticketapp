import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState('Tümü');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    console.log(`Fetching tickets with filter: '${statusFilter}' and sort: '${sortBy}'`);
    const fetchTickets = async () => {
      try {
        setLoading(true);

        const params = {};
        if (statusFilter !== 'Tümü') {
          params.status = statusFilter;
        }
        if (sortBy) {
          params.sortBy = sortBy;
        }

        const response = await axios.get('/api/tickets', { params });
        console.log('Successfully fetched tickets:', response.data);
        setTickets(response.data);
        setError(null);
      } catch (err) {
        setError('Talepler yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [statusFilter, sortBy]);

  const pageContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  const filterContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  const editLinkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  };

  const ticketItemStyle = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  const ticketTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '500',
  };

  const ticketPriorityStyle = (priority) => ({
    padding: '0.3rem 0.8rem',
    borderRadius: '12px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    backgroundColor:
      priority === 'Yüksek'
        ? '#ff9800'
        : priority === 'Normal'
        ? '#2196f3'
        : '#607d8b',
  });

  const ticketStatusStyle = (status) => ({
    padding: '0.3rem 0.8rem',
    borderRadius: '12px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    backgroundColor:
      status === 'Açık'
        ? '#28a745'
        : status === 'İşlemde'
        ? '#ffc107'
        : '#dc3545',
  });
  
  return (
    <div style={pageContainerStyle}>
      <div style={filterContainerStyle}>
        <div>
          <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
            <option value="Tümü">Tümü</option>
            <option value="Açık">Açık</option>
            <option value="İşlemde">İşlemde</option>
            <option value="Kapandı">Kapandı</option>
          </select>
        </div>
        <div>
          <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectStyle}>
            <option value="">Varsayılan Sıralama</option>
            <option value="priority">Önceliğe Göre</option>
          </select>
        </div>
      </div>

      {loading && <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>Yükleniyor...</div>}
      {error && <div style={{ textAlign: 'center', fontSize: '1.5rem', color: 'red' }}>{error}</div>}
      {!loading && !error && (
        tickets.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Bu kriterlere uygun talep bulunmamaktadır.</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket._id} style={ticketItemStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={ticketTitleStyle}>{ticket.title}</span>
                <Link to={`/ticket/${ticket._id}`} style={editLinkStyle}>
                  Talebi Düzenle
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={ticketPriorityStyle(ticket.priority)}>{ticket.priority}</span>
                <span style={ticketStatusStyle(ticket.status)}>{ticket.status}</span>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default TicketList;
