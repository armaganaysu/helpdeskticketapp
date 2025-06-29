const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
  console.log('--- Running createTicket ---');
  console.log('Body:', req.body);
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Please add a title and description');
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTickets = async (req, res) => {
  console.log('--- Running getTickets ---');
  console.log('Query:', req.query);
  try {
    const { status, sortBy } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    let sortOptions = {};
    if (sortBy === 'priority') {
      const tickets = await Ticket.find(query);
      const priorityOrder = { 'Yüksek': 1, 'Normal': 2, 'Düşük': 3 };
      tickets.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      return res.status(200).json(tickets);
    } else if (sortBy) {
        sortOptions[sortBy] = 1;
    }


    const tickets = await Ticket.find(query).sort(sortOptions);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketById = async (req, res) => {
  console.log('--- Running getTicketById ---');
  console.log('Params:', req.params);
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error('Ticket not found');
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  console.log('--- Running updateTicket ---');
  console.log('Params:', req.params);
  console.log('Body:', req.body);
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error('Ticket not found');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
};
