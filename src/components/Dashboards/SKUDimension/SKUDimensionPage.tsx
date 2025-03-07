import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import {
  fetchskuSlices,
  addskuSlice,
  updateskuSlice,
  deleteskuSlice,
  reorderskuSlice,
} from '../../../redux/Slice/skuSlice';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

interface Sku {
  id: string;
  seqNo: number;
  label: string;
  class: string;
  price: string;
  cost: string;
}

const SKUDimension: React.FC = () => {
  const dispatch = useDispatch();
  const { sku, status } = useSelector(
    (state: RootState) => state.sku || { sku: [], status: 'idle' }
  );

  const [editSKUId, setEditSKUId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Sku>>({});

  useEffect(() => {
    if (status === 'idle') dispatch(fetchskuSlices());
  }, [status, dispatch]);

  // Handle drag & drop
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const items: Sku[] = [...sku];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      dispatch(reorderskuSlice(items));
    },
    [sku, dispatch]
  );

  // Handle inline edit
  const handleEdit = useCallback((sku: Sku) => {
    setEditSKUId(sku.id);
    setEditValues(sku);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSave = useCallback(() => {
    if (editSKUId && editValues) {
      dispatch(updateskuSlice(editValues as Sku));
      setEditSKUId(null);
    }
  }, [editSKUId, editValues, dispatch]);

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm('Are you sure you want to delete this SKU?')) {
        dispatch(deleteskuSlice(id));
      }
    },
    [dispatch]
  );

  // Add new SKU
  const handleAdd = () => {
    dispatch(
      addskuSlice({
        id: `SK${Math.floor(Math.random() * 9999)}`,
        seqNo: sku.length + 1,
        label: 'New SKU',
        class: 'Category',
        price: '$0.00',
        cost: '$0.00',
      })
    );
  };

  const skuData: Sku[] = useMemo(() => sku || [], [sku]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        SKU Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
        >
          Add SKU
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sku">
            {(provided) => (
              <Table
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ minWidth: 700 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Move</TableCell>
                    <TableCell>Seq No.</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skuData.map((sku: Sku, index: number) => (
                    <Draggable key={sku.id} draggableId={sku.id} index={index}>
                      {(provided) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <TableCell {...provided.dragHandleProps}>
                            <DragIndicatorOutlinedIcon />
                          </TableCell>
                          <TableCell>{sku.seqNo}</TableCell>
                          <TableCell>{sku.id}</TableCell>
                          <TableCell>
                            {editSKUId === sku.id ? (
                              <TextField
                                name="label"
                                value={editValues.label}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                              />
                            ) : (
                              sku.label
                            )}
                          </TableCell>
                          <TableCell>
                            {editSKUId === sku.id ? (
                              <TextField
                                name="class"
                                value={editValues.class}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                              />
                            ) : (
                              sku.class
                            )}
                          </TableCell>
                          <TableCell>
                            {editSKUId === sku.id ? (
                              <TextField
                                name="price"
                                value={editValues.price}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                              />
                            ) : (
                              sku.price
                            )}
                          </TableCell>
                          <TableCell>
                            {editSKUId === sku.id ? (
                              <TextField
                                name="cost"
                                value={editValues.cost}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                              />
                            ) : (
                              sku.cost
                            )}
                          </TableCell>
                          <TableCell>
                            {editSKUId === sku.id ? (
                              <IconButton onClick={handleSave} color="primary">
                                <SaveIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => handleEdit(sku)}
                                color="info"
                              >
                                <EditIcon />
                              </IconButton>
                            )}
                            <IconButton
                              onClick={() => handleDelete(sku.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </TableContainer>
    </Box>
  );
};

export default SKUDimension;
