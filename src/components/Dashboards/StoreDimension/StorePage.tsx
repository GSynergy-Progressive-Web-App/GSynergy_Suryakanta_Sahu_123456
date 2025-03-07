import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import {
  fetchStores,
  addStore,
  updateStore,
  deleteStore,
  reorderStore,
} from '../../../redux/Slice/storeSlice';
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
} from '@mui/material';

interface Store {
  id: string;
  seqNo: number;
  label: string;
  city: string;
  state: string;
}

const StorePage = () => {
  const dispatch = useDispatch();
  const { stores, status } = useSelector((state: RootState) => state.stores);
  const [editStoreId, setEditStoreId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Store>>({});

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStores());
  }, [status, dispatch]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(stores);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderStore(items));
  };

  const handleEdit = (store: Store) => {
    setEditStoreId(store.id);
    setEditValues(store);
  };

  const handleSave = () => {
    if (editStoreId && editValues) {
      dispatch(updateStore(editValues as Store));
      setEditStoreId(null);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Store Management
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          mb: 2,
        }}
      >
        <Button
          onClick={() =>
            dispatch(
              addStore({
                id: `ST${Math.floor(Math.random() * 999)}`,
                seqNo: stores.length + 1,
                label: 'New Store',
                city: 'City',
                state: 'ST',
              })
            )
          }
          variant="contained"
          color="success"
        >
          Add Store
        </Button>
      </Box>

      {/* Responsive Table Wrapper */}
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="stores">
              {(provided) => (
                <Table
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{ minWidth: 600 }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Move</TableCell>
                      <TableCell>
                        <b>Seq No.</b>
                      </TableCell>
                      <TableCell>
                        <b>ID</b>
                      </TableCell>
                      <TableCell>
                        <b>Label</b>
                      </TableCell>
                      <TableCell>
                        <b>City</b>
                      </TableCell>
                      <TableCell>
                        <b>State</b>
                      </TableCell>
                      <TableCell>
                        <b>Actions</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stores.map((store, index) => (
                      <Draggable
                        key={store.id}
                        draggableId={store.id}
                        index={index}
                      >
                        {(provided) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TableCell>
                              <DragIndicatorOutlinedIcon />
                            </TableCell>
                            <TableCell>{store.seqNo}</TableCell>
                            <TableCell>{store.id}</TableCell>
                            <TableCell>
                              {editStoreId === store.id ? (
                                <TextField
                                  value={editValues.label || ''}
                                  onChange={(e) =>
                                    setEditValues({
                                      ...editValues,
                                      label: e.target.value,
                                    })
                                  }
                                  size="small"
                                  fullWidth
                                />
                              ) : (
                                store.label
                              )}
                            </TableCell>
                            <TableCell>
                              {editStoreId === store.id ? (
                                <TextField
                                  value={editValues.city || ''}
                                  onChange={(e) =>
                                    setEditValues({
                                      ...editValues,
                                      city: e.target.value,
                                    })
                                  }
                                  size="small"
                                  fullWidth
                                />
                              ) : (
                                store.city
                              )}
                            </TableCell>
                            <TableCell>
                              {editStoreId === store.id ? (
                                <TextField
                                  value={editValues.state || ''}
                                  onChange={(e) =>
                                    setEditValues({
                                      ...editValues,
                                      state: e.target.value,
                                    })
                                  }
                                  size="small"
                                  fullWidth
                                />
                              ) : (
                                store.state
                              )}
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 1,
                                }}
                              >
                                {editStoreId === store.id ? (
                                  <Button
                                    onClick={handleSave}
                                    variant="contained"
                                    color="success"
                                    size="small"
                                  >
                                    Save
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleEdit(store)}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                  >
                                    Edit
                                  </Button>
                                )}
                                <Button
                                  onClick={() =>
                                    dispatch(deleteStore(store.id))
                                  }
                                  variant="contained"
                                  color="error"
                                  size="small"
                                >
                                  Delete
                                </Button>
                              </Box>
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
    </Box>
  );
};

export default StorePage;
