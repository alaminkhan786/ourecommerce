import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip
} from '@mui/material';

function PaymentManagement() {
  const [payments, setPayments] = useState([
    { 
      id: 1, 
      transactionId: 'TXN001', 
      amount: 99.99, 
      customerName: 'John Doe', 
      date: '2024-01-15', 
      status: 'completed' 
    },
    { 
      id: 2, 
      transactionId: 'TXN002', 
      amount: 149.50, 
      customerName: 'Jane Smith', 
      date: '2024-01-16', 
      status: 'pending' 
    },
    { 
      id: 3, 
      transactionId: 'TXN003', 
      amount: 79.99, 
      customerName: 'Bob Johnson', 
      date: '2024-01-17', 
      status: 'failed' 
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.customerName}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={payment.status} 
                    color={getStatusColor(payment.status)} 
                    size="small" 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PaymentManagement;
