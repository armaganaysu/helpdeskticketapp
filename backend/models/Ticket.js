const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Açık', 'İşlemde', 'Kapandı'],
      default: 'Açık',
    },
    priority: {
      type: String,
      required: true,
      enum: ['Düşük', 'Normal', 'Yüksek'],
      default: 'Normal',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
