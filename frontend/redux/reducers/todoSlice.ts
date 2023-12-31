import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// import {todos} from '../../'

interface KnownError {
  errMessage: string;
}

export interface Todo {
  id: string;
  completed: boolean;
  todo: string;
  tags: string[];
}

const API_LINK = "backend-link";

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo, { rejectWithValue }) => {
    try {
      await axios.post(API_LINK, todo);
      let todosData = await axios.get(API_LINK);
      const todos = await todosData.data;
      return todos;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(API_LINK);
      const todos = await data;
      return todos;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, dataInfo }: any, { rejectWithValue }) => {
    try {
      let { data } = await axios.put(`${API_LINK}/${id}`, dataInfo);
      const todo = await data;
      return [todo];
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      let { data } = await axios.delete(`${API_LINK}/${id}`);
      const todo = await data;
      return [todo];
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  darkMode: false,
  todos: [] as Todo[],
  filterTodos: [] as Todo[],
  todo: [],
  error: false,
  errMessage: "",
  total: 0,
  loading: false,
  update: false,
  item: {},
  isModalVisible: false,
  filter: "all",
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    totalTodo: (state, action) => {
      state.total = action.payload;
    },
    setUpdate: (state, action) => {
      state.update = action.payload;
    },
    curItem: (state, action) => {
      state.item = action.payload;
    },
    setModalVisible: (state, action) => {
      state.isModalVisible = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setFilterTodos: (state, action) => {
      state.filterTodos = action.payload;
    },
    filterStatus: (state, { payload }) => {
      state.filter = payload;

      switch (state.filter) {
        case "all":
          state.filterTodos = state.todos;
          break;
        case "completed":
          state.filterTodos = state.todos.filter((todo) => todo.completed);
          break;
        case "active":
          state.filterTodos = state.todos.filter((todo) => !todo.completed);
          break;
        default:
          state.filterTodos = state.todos;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodo.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todo = action.payload;
      state.errMessage = "";
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMessage = action.error.message as string;
    });

    builder.addCase(getTodos.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todo = action.payload;
      state.errMessage = "";
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMessage = action.error.message as string;
    });
    builder.addCase(updateTodo.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todo = action.payload as any;
      state.errMessage = "";
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMessage = action.error.message as string;
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todo = [];
      state.errMessage = "";
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMessage = action.error.message as string;
    });
  },
});

export const {
  setDarkMode,
  setUpdate,
  curItem,
  setModalVisible,
  totalTodo,
  setTodos,
  filterStatus,
  setFilterTodos,
} = TodoSlice.actions;

export default TodoSlice.reducer;
