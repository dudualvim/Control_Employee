import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  id: number;
  name: string;
  cpf: string;
  status: 'Ativo' | 'Inativo';
  role: string;
}

interface EmployeesState {
  data: Employee[];
}

const initialState: EmployeesState = {
  data: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.data = action.payload;
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.data.push(action.payload);
    },
  },
});

export const { setEmployees, addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
